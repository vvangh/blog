/**
 * 系列导航：按 series + seriesOrder 找上一篇/下一篇。
 * 目录外请经 `@/lib/series` 导入。
 */

export type SeriesEntry = {
  id: string;
  title: string;
  series?: string;
  seriesOrder?: number;
};

export type SeriesNav = {
  series: string;
  prev: SeriesEntry | null;
  next: SeriesEntry | null;
  siblings: SeriesEntry[];
};

/** 同系列条目按 order 升序；无 order 的排最后再按 id */
export function sortSeriesEntries(entries: SeriesEntry[]): SeriesEntry[] {
  return [...entries].sort((a, b) => {
    const ao = a.seriesOrder ?? Number.POSITIVE_INFINITY;
    const bo = b.seriesOrder ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.id.localeCompare(b.id);
  });
}

/**
 * 为当前文计算系列导航；无 series 或系列内仅一篇时返回 null。
 */
export function resolveSeriesNav(currentId: string, all: SeriesEntry[]): SeriesNav | null {
  const current = all.find((e) => e.id === currentId);
  if (!current?.series) return null;

  const siblings = sortSeriesEntries(all.filter((e) => e.series === current.series));
  if (siblings.length < 2) return null;

  const index = siblings.findIndex((e) => e.id === currentId);
  if (index < 0) return null;

  return {
    series: current.series,
    prev: index > 0 ? siblings[index - 1]! : null,
    next: index < siblings.length - 1 ? siblings[index + 1]! : null,
    siblings,
  };
}
