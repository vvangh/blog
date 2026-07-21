/**
 * 日期展示格式化（站内列表/详情）。
 * 目录外请经 `@/lib/date` 导入。
 */
export function formatDate(date: Date, locale = "zh-Hans"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
