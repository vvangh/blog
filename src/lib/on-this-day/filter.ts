/**
 * 今夕何夕：按月-日聚合往年同日条目。
 * 目录外请经 `@/lib/on-this-day` 导入。
 */

export type DatedItem = {
  id: string;
  title: string;
  pubDate: Date;
  href: string;
  section: string;
};

/** 取出月日键 MM-DD（UTC） */
export function monthDayKey(date: Date): string {
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${m}-${d}`;
}

/**
 * 筛出与 target 同月日、且年份更早（或同年但 id 不同）的条目。
 * 默认包含所有同月日条目（含今年），按年份倒序。
 */
export function filterOnThisDay(items: DatedItem[], target: Date): DatedItem[] {
  const key = monthDayKey(target);
  return items
    .filter((item) => monthDayKey(item.pubDate) === key)
    .sort((a, b) => b.pubDate.getUTCFullYear() - a.pubDate.getUTCFullYear());
}
