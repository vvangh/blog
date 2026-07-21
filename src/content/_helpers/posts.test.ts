/**
 * 内容辅助单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { publishedSorted } from "@/content/_helpers";

describe("publishedSorted", () => {
  it("filters drafts and sorts by date desc", () => {
    const entries = [
      { data: { pubDate: new Date("2026-01-01"), draft: false } },
      { data: { pubDate: new Date("2026-03-01"), draft: true } },
      { data: { pubDate: new Date("2026-02-01"), draft: false } },
    ];
    const result = publishedSorted(entries);
    expect(result).toHaveLength(2);
    expect(result[0]?.data.pubDate.toISOString()).toContain("2026-02-01");
  });
});
