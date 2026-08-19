import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { KIGALI_ROUTES } from "@/data/routes-data";
import { RUNS_CATALOG } from "@/data/runs-data";

const BASE_URL = "https://www.vision-run-club.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPages: SitemapEntry[] = [
          { path: "/", lastmod: "2026-08-19", changefreq: "weekly", priority: "1.0" },
          { path: "/runs", lastmod: "2026-08-19", changefreq: "weekly", priority: "0.9" },
          { path: "/routes", lastmod: "2026-08-19", changefreq: "weekly", priority: "0.9" },
          { path: "/schedule", lastmod: "2026-08-19", changefreq: "daily", priority: "0.9" },
          { path: "/guide", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.8" },
          { path: "/community", lastmod: "2026-08-19", changefreq: "weekly", priority: "0.8" },
          { path: "/gear", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.7" },
          { path: "/about", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.8" },
          { path: "/faq", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.7" },
        ];

        const runPages: SitemapEntry[] = Object.keys(RUNS_CATALOG).map((slug) => ({
          path: `/runs/${slug}`,
          lastmod: "2026-08-19",
          changefreq: "weekly",
          priority: "0.8",
        }));

        const routePages: SitemapEntry[] = Object.keys(KIGALI_ROUTES).map((slug) => ({
          path: `/routes/${slug}`,
          lastmod: "2026-08-19",
          changefreq: "monthly",
          priority: "0.8",
        }));

        const allEntries = [...staticPages, ...runPages, ...routePages];

        const urls = allEntries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml.trim(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      },
    },
  },
});
