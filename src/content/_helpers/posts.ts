/**
 * Content Collection 辅助：过滤草稿、按日期排序。
 * 目录外请经 `@/content/_helpers` 导入。
 */
import type { CollectionEntry } from "astro:content";

type DatedEntry = { data: { pubDate: Date; draft?: boolean } };

export function isPublished<T extends DatedEntry>(entry: T): boolean {
  return entry.data.draft !== true;
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function publishedSorted<T extends DatedEntry>(entries: T[]): T[] {
  return sortByDateDesc(entries.filter(isPublished));
}

export type BlogEntry = CollectionEntry<"blog">;
export type BuildLogEntry = CollectionEntry<"build-log">;
