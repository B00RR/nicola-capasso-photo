#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const envPath = join(root, ".env");
const envLocal = join(root, ".env.local");

const readEnv = (path) => {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
};

const env = { ...readEnv(envPath), ...readEnv(envLocal), ...process.env };
const siteUrl = (env.VITE_SITE_URL || "https://nicolacapassophoto.com").replace(/\/$/, "");

const contentDir = join(root, "src", "content");
const getLastMod = (file) => {
  try {
    return statSync(join(contentDir, file)).mtime.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
};

const portfolioLastMod = getLastMod("portfolio.json");

let storyRoutes = [];
try {
  const portfolioJson = JSON.parse(
    readFileSync(join(contentDir, "portfolio.json"), "utf8")
  );
  storyRoutes = (portfolioJson.years || []).flatMap((y) =>
    (y.shoots || []).map((s) => ({
      loc: `/portfolio/${s.id}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: portfolioLastMod,
    }))
  );
} catch (err) {
  console.warn("Could not read portfolio.json for sitemap:", err.message);
}

const routes = [
  { loc: "/",          changefreq: "weekly",  priority: "1.0", lastmod: getLastMod("home.json") },
  { loc: "/portfolio", changefreq: "weekly",  priority: "0.8", lastmod: portfolioLastMod },
  ...storyRoutes,
  { loc: "/contact",   changefreq: "monthly", priority: "0.6", lastmod: getLastMod("contact.json") },
  { loc: "/privacy",   changefreq: "yearly",  priority: "0.3", lastmod: getLastMod("legal.json") },
  { loc: "/cookies",   changefreq: "yearly",  priority: "0.3", lastmod: getLastMod("legal.json") },
  { loc: "/terms",     changefreq: "yearly",  priority: "0.3", lastmod: getLastMod("legal.json") },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="it" href="${siteUrl}${r.loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${r.loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${r.loc}" />
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(root, "public", "sitemap.xml"), sitemap);
writeFileSync(join(root, "public", "robots.txt"), robots);

console.log(`✓ Generated sitemap.xml and robots.txt for ${siteUrl}`);
