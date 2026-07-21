import { describe, expect, it } from "vite-plus/test";
import { resolveSeriesNav, sortSeriesEntries } from "./nav";

describe("series nav", () => {
  const entries = [
    { id: "a", title: "A", series: "vite", seriesOrder: 1 },
    { id: "c", title: "C", series: "vite", seriesOrder: 3 },
    { id: "b", title: "B", series: "vite", seriesOrder: 2 },
    { id: "x", title: "X" },
  ];

  it("按 seriesOrder 排序", () => {
    expect(sortSeriesEntries(entries.filter((e) => e.series === "vite")).map((e) => e.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("解析上一篇下一篇", () => {
    const nav = resolveSeriesNav("b", entries);
    expect(nav?.prev?.id).toBe("a");
    expect(nav?.next?.id).toBe("c");
  });

  it("无系列返回 null", () => {
    expect(resolveSeriesNav("x", entries)).toBeNull();
  });
});
