import { describe, expect, it } from "vite-plus/test";
import { getRelatedPosts } from "./posts";

describe("getRelatedPosts", () => {
  const day = (n: number) => new Date(`2026-07-${String(n).padStart(2, "0")}T00:00:00Z`);

  const all = [
    { id: "a", title: "A", tags: ["vite", "工程"], pubDate: day(1) },
    { id: "b", title: "B", tags: ["vite"], pubDate: day(2) },
    { id: "c", title: "C", tags: ["vite", "工程", "astro"], pubDate: day(3) },
    { id: "d", title: "D", tags: ["生活"], pubDate: day(4) },
    { id: "e", title: "E", tags: [], pubDate: day(5) },
  ];

  it("按重叠数排序，同分取较新", () => {
    expect(getRelatedPosts("a", all).map((p) => p.id)).toEqual(["c", "b"]);
  });

  it("遵守 limit", () => {
    expect(getRelatedPosts("a", all, 1).map((p) => p.id)).toEqual(["c"]);
  });

  it("无重叠或当前无标签时返回空", () => {
    expect(getRelatedPosts("d", all)).toEqual([]);
    expect(getRelatedPosts("e", all)).toEqual([]);
  });
});
