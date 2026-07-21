/**
 * i18n 协商与路径单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { DEFAULT_LOCALE } from "./locales";
import { negotiateLocale, normalizeLanguageTag } from "./negotiate";
import { localePath, stripLocaleFromPath } from "./paths";

describe("normalizeLanguageTag", () => {
  it("maps regional Chinese tags", () => {
    expect(normalizeLanguageTag("zh-CN")).toBe("zh-Hans");
    expect(normalizeLanguageTag("zh-TW")).toBe("zh-Hant");
    expect(normalizeLanguageTag("ja-JP")).toBe("ja");
    expect(normalizeLanguageTag("ko-KR")).toBe("ko");
    expect(normalizeLanguageTag("fr")).toBe("fr");
  });
});

describe("negotiateLocale", () => {
  it("prefers stored locale over Accept-Language", () => {
    expect(negotiateLocale("de", ["en-US", "en"])).toBe("de");
  });

  it("falls back to default", () => {
    expect(negotiateLocale(null, ["fr-FR"])).toBe("fr");
    expect(negotiateLocale(null, ["xx-YY"])).toBe(DEFAULT_LOCALE);
  });

  it("picks from accept list", () => {
    expect(negotiateLocale(null, ["ja-JP", "en"])).toBe("ja");
  });
});

describe("localePath / stripLocaleFromPath", () => {
  it("builds prefixed paths under /blog/", () => {
    expect(localePath("zh-Hans")).toBe("/blog/zh-Hans/");
    expect(localePath("en", "blog")).toBe("/blog/en/blog/");
  });

  it("strips locale from pathname", () => {
    expect(stripLocaleFromPath("/blog/ja/build/")).toEqual({ locale: "ja", rest: "build" });
  });
});
