/**
 * 搜索过滤（可进客户端包；勿依赖 astro:content）。
 */
import type { DevSearchEntry } from "./types";

export type { DevSearchEntry };

/** 简单包含匹配（标题 / 摘要 / URL） */
export function filterDevCatalog(catalog: DevSearchEntry[], query: string): DevSearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return catalog
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q),
    )
    .slice(0, 8);
}
