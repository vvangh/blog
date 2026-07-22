import { describe, expect, it } from "vite-plus/test";
import { filterDevCatalog } from "./filter";
import type { DevSearchEntry } from "./types";

const sample: DevSearchEntry[] = [
  {
    id: "1",
    url: "/blog/zh-Hans/blog/welcome/",
    title: "欢迎来到 vv",
    excerpt: "第一篇技术笔记",
  },
  {
    id: "2",
    url: "/blog/zh-Hans/about/",
    title: "关于",
    excerpt: "zh-Hans",
  },
];

describe("filterDevCatalog", () => {
  it("按标题匹配", () => {
    expect(filterDevCatalog(sample, "欢迎").map((x) => x.id)).toEqual(["1"]);
  });

  it("空查询返回空", () => {
    expect(filterDevCatalog(sample, "  ")).toEqual([]);
  });
});
