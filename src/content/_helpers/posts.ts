/**
 * Content Collection 辅助：过滤草稿、按日期排序。
 * 目录外请经 `@/content/_helpers` 导入。
 */
import type { CollectionEntry } from "astro:content";

type DatedEntry = { id: string; data: { pubDate: Date; draft?: boolean } };

export function isPublished<T extends DatedEntry>(entry: T): boolean {
  return entry.data.draft !== true;
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function publishedSorted<T extends DatedEntry>(entries: T[]): T[] {
  // 用箭头包装，避免 filter(isPublished) 把 T 收窄成 DatedEntry（CI tsgolint）
  return sortByDateDesc(entries.filter((entry) => isPublished(entry)));
}

export type BlogEntry = CollectionEntry<"blog">;
export type BuildLogEntry = CollectionEntry<"build-log">;
