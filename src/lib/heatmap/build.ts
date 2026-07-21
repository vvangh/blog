/**
 * 写作热力图：由发文日期生成贡献墙格子。
 * 目录外请经 `@/lib/heatmap` 导入。
 */

export type HeatDay = {
  /** YYYY-MM-DD */
  date: string;
  count: number;
};

export type HeatCell = HeatDay & {
  /** 0–4 强度档，0 表示无贡献 */
  level: 0 | 1 | 2 | 3 | 4;
};

/** 把 Date 格式化为 UTC 日历日 YYYY-MM-DD（避免时区漂移） */
export function toDateKey(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** 统计每日发文数 */
export function countByDay(dates: Date[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const date of dates) {
    const key = toDateKey(date);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

function levelForCount(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0 || max <= 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

/**
 * 生成从 end 往前 days 天的热力格子（含 end 当日）。
 * @param dates 发文日期列表
 * @param end 热力图结束日（默认今天 UTC）
 * @param days 天数（默认 365）
 */
export function buildHeatmap(dates: Date[], end: Date = new Date(), days = 365): HeatCell[] {
  const counts = countByDay(dates);
  const max = Math.max(0, ...counts.values());
  const endUtc = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  const cells: HeatCell[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const t = new Date(endUtc - i * 86_400_000);
    const key = toDateKey(t);
    const count = counts.get(key) ?? 0;
    cells.push({ date: key, count, level: levelForCount(count, max) });
  }
  return cells;
}
