/**
 * Giscus 配置解析单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { giscusLang, resolveGiscusConfig } from "./config";

describe("resolveGiscusConfig", () => {
  const full = {
    repo: "vvangh/blog",
    repoId: "R_xxx",
    category: "Announcements",
    categoryId: "DIC_xxx",
  };

  it("缺字段返回 null", () => {
    expect(resolveGiscusConfig({ ...full, repo: "" }, "zh-Hans")).toBeNull();
    expect(resolveGiscusConfig({ repo: "a" }, "en")).toBeNull();
  });

  it("齐全时返回配置并映射语言", () => {
    const cfg = resolveGiscusConfig(full, "ja");
    expect(cfg).not.toBeNull();
    expect(cfg!.repo).toBe("vvangh/blog");
    expect(cfg!.lang).toBe("ja");
    expect(cfg!.mapping).toBe("pathname");
  });

  it("可覆盖 mapping", () => {
    const cfg = resolveGiscusConfig({ ...full, mapping: "url" }, "en");
    expect(cfg!.mapping).toBe("url");
  });
});

describe("giscusLang", () => {
  it("简繁映射到 giscus 码", () => {
    expect(giscusLang("zh-Hans")).toBe("zh-CN");
    expect(giscusLang("zh-Hant")).toBe("zh-TW");
  });
});
