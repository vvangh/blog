/**
 * 站点常量冒烟单测：保证品牌文案与 base 不被误改。
 */
import { describe, expect, it } from "vite-plus/test";
import { SITE_BASE, SITE_NAME_EN, SITE_NAME_ZH, SITE_TAGLINE } from "./constants";

describe("site constants", () => {
  it("exposes Henglu brand strings", () => {
    expect(SITE_NAME_ZH).toBe("衡录");
    expect(SITE_NAME_EN).toBe("Henglu");
    expect(SITE_TAGLINE.length).toBeGreaterThan(0);
  });

  it("uses GitHub Pages project base", () => {
    expect(SITE_BASE).toBe("/blog/");
  });
});
