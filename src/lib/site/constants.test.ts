/**
 * 站点常量冒烟单测：保证品牌文案与 base 不被误改。
 */
import { describe, expect, it } from "vite-plus/test";
import {
  SITE_BASE,
  SITE_NAME_EN,
  SITE_NAME_ZH,
  SITE_STORAGE_PREFIX,
  SITE_TAGLINE,
  siteStorageKey,
} from "./constants";

describe("site constants", () => {
  it("exposes vv brand strings", () => {
    expect(SITE_NAME_ZH).toBe("vv");
    expect(SITE_NAME_EN).toBe("vv");
    expect(SITE_TAGLINE).toBe("记录值得留下的事");
  });

  it("uses GitHub Pages project base", () => {
    expect(SITE_BASE).toBe("/blog/");
  });

  it("builds storage keys from shared brand prefix", () => {
    expect(SITE_STORAGE_PREFIX).toBe("vv");
    expect(siteStorageKey("theme")).toBe("vv-theme");
    expect(siteStorageKey("locale")).toBe("vv-locale");
  });
});
