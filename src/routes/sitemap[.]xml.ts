import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { RUNS_CATALOG } from "@/data/runs-data";

const BASE_URL = "https://visionrunclub.com";

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
          { path: "/merches", lastmod: "2026-08-19", changefreq: "weekly", priority: "0.8" },
          { path: "/community", lastmod: "2026-08-19", changefreq: "weekly", priority: "0.8" },
          { path: "/about", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.8" },
          { path: "/faq", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", lastmod: "2026-08-19", changefreq: "monthly", priority: "0.7" },
        ];

        const uniqueRunSlugs = Array.from(new Set(Object.values(RUNS_CATALOG).map((r) => r.slug)));

        const runPages: SitemapEntry[] = uniqueRunSlugs.map((slug) => ({
          path: `/runs/${slug}`,
          lastmod: "2026-08-19",
          changefreq: "weekly",
          priority: "0.8",
        }));

        const allEntries = [...staticPages, ...runPages];

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
          urls.join("\n"),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      },
    },
  },
});
