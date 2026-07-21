/**
 * 从 Markdown headings 筛出文内 TOC 条目（h2/h3）。
 * 目录外请经 `@/lib/toc` 导入。
 */

export type TocHeading = {
  depth: number;
  slug: string;
  text: string;
};

/** 仅保留二级、三级标题，供侧栏目录跳转 */
export function filterTocHeadings(headings: readonly TocHeading[]): TocHeading[] {
  return headings.filter((h) => h.depth === 2 || h.depth === 3);
}
