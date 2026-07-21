/**
 * TOC 筛选单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { filterTocHeadings } from "./config";

describe("filterTocHeadings", () => {
  it("只保留 h2/h3", () => {
    const input = [
      { depth: 1, slug: "title", text: "Title" },
      { depth: 2, slug: "a", text: "A" },
      { depth: 3, slug: "b", text: "B" },
      { depth: 4, slug: "c", text: "C" },
    ];
    expect(filterTocHeadings(input).map((h) => h.slug)).toEqual(["a", "b"]);
  });

  it("空列表返回空", () => {
    expect(filterTocHeadings([])).toEqual([]);
  });
});
