/**
 * OG URL 助手。目录外请经 `@/lib/og` 导入。
 */
import { SITE_BASE } from "@/lib/site";
import { resolveCanonicalOrigin } from "@/lib/domains";

export function defaultOgImageUrl(siteOrigin = resolveCanonicalOrigin()): string {
  const base = SITE_BASE.endsWith("/") ? SITE_BASE : `${SITE_BASE}/`;
  return new URL(`${base}og-default.png`, siteOrigin).href;
}

export function absolutePageUrl(pathname: string, siteOrigin = resolveCanonicalOrigin()): string {
  if (pathname.startsWith("http")) return pathname;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(path, siteOrigin).href;
}

/** 动态 OG 图路径（构建期预渲染） */
export function ogImagePath(slug: string): string {
  const base = SITE_BASE.endsWith("/") ? SITE_BASE : `${SITE_BASE}/`;
  const safe = encodeURIComponent(slug);
  return `${base}og/${safe}.png`;
}
