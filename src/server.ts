import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { DEFAULT_SITE_PHOTOS, type SitePhotosData } from "./data/site-photos";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

interface CloudflareEnv {
  VRC_PHOTOS?: {
    get(key: string, type: "text" | "json" | "arrayBuffer"): Promise<any>;
    getWithMetadata(
      key: string,
      type: "text" | "json" | "arrayBuffer",
    ): Promise<{ value: any; metadata: any }>;
    put(key: string, value: any, options?: { metadata?: any }): Promise<void>;
  };
}

async function handleApi(request: Request, env: CloudflareEnv, url: URL): Promise<Response | null> {
  const kv = env?.VRC_PHOTOS;

  // 1. GET or POST /api/photos
  if (url.pathname === "/api/photos") {
    if (request.method === "GET") {
      if (kv) {
        try {
          const stored = await kv.get("site_photos_v1", "text");
          if (stored) {
            return new Response(stored, {
              headers: {
                "content-type": "application/json; charset=utf-8",
                "cache-control": "no-cache, no-store, must-revalidate",
                "access-control-allow-origin": "*",
              },
            });
          }
        } catch (err) {
          console.error("Error reading photos from KV:", err);
        }
      }
      return new Response(JSON.stringify(DEFAULT_SITE_PHOTOS), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-cache, no-store, must-revalidate",
          "access-control-allow-origin": "*",
        },
      });
    }

    if (request.method === "POST") {
      try {
        const body = (await request.json()) as SitePhotosData;
        if (kv) {
          await kv.put("site_photos_v1", JSON.stringify(body));
        }
        return new Response(JSON.stringify({ success: true, message: "Saved to Cloudflare KV" }), {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: String(err) }), {
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" },
        });
      }
    }
  }

  // 2. POST /api/upload
  if (url.pathname === "/api/upload" && request.method === "POST") {
    try {
      let buffer: ArrayBuffer | null = null;
      let contentType = "image/jpeg";
      let extension = "jpg";

      const reqContentType = request.headers.get("content-type") || "";

      if (reqContentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if (file) {
          buffer = await file.arrayBuffer();
          contentType = file.type || "image/jpeg";
          extension = file.name.split(".").pop() || "jpg";
        }
      } else {
        const json = (await request.json()) as { dataUrl?: string; name?: string };
        if (json.dataUrl) {
          const matches = json.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches[2]) {
            contentType = matches[1] || "image/jpeg";
            extension = contentType.split("/")[1] || "jpg";
            if (extension === "jpeg") extension = "jpg";
            const binaryStr = atob(matches[2]);
            const len = binaryStr.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            buffer = bytes.buffer;
          }
        }
      }

      if (!buffer) {
        return new Response(JSON.stringify({ error: "No image content provided" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const fileId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;
      if (kv) {
        await kv.put(`upload:${fileId}`, buffer, {
          metadata: { contentType },
        });
      }

      return new Response(JSON.stringify({ success: true, url: `/api/images/${fileId}` }), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "access-control-allow-origin": "*",
        },
      });
    } catch (err) {
      console.error("Upload error:", err);
      return new Response(JSON.stringify({ error: String(err) }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  // 3. GET /api/images/:id
  if (url.pathname.startsWith("/api/images/")) {
    const filename = url.pathname.replace("/api/images/", "");
    if (kv && filename) {
      try {
        const record = await kv.getWithMetadata(`upload:${filename}`, "arrayBuffer");
        if (record && record.value) {
          const mimeType = (record.metadata as any)?.contentType || "image/jpeg";
          return new Response(record.value, {
            headers: {
              "content-type": mimeType,
              "cache-control": "public, max-age=31536000, immutable",
              "access-control-allow-origin": "*",
            },
          });
        }
      } catch (err) {
        console.error("Error serving uploaded image:", err);
      }
    }
    return new Response("Image Not Found", { status: 404 });
  }

  return null;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const apiResponse = await handleApi(request, env as CloudflareEnv, url);
      if (apiResponse) {
        return apiResponse;
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
