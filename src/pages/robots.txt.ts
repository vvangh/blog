/**
 * robots.txt：允许抓取并指向 sitemap。
 */
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? new URL("sitemap-index.xml", site).href : "/sitemap-index.xml";
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
