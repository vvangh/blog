/**
 * 从 Accept-Language / 浏览器语言列表协商站点语言。
 * 目录外请经 `@/lib/i18n` 导入。
 */
import { DEFAULT_LOCALE, LOCALES, type Locale, isLocale } from "./locales";

/** 规范化：zh-CN → zh-Hans，zh-TW/HK → zh-Hant，其余取主语言或完整标签 */
export function normalizeLanguageTag(tag: string): Locale | null {
  const raw = tag.trim().toLowerCase().replace(/_/g, "-");
  if (!raw) return null;

  if (raw === "zh-hans" || raw === "zh-cn" || raw === "zh-sg") return "zh-Hans";
  if (raw === "zh-hant" || raw === "zh-tw" || raw === "zh-hk" || raw === "zh-mo") return "zh-Hant";
  if (raw === "zh") return "zh-Hans";

  for (const locale of LOCALES) {
    if (locale.toLowerCase() === raw) return locale;
  }

  const primary = raw.split("-")[0] ?? "";
  const primaryMap: Record<string, Locale> = {
    en: "en",
    de: "de",
    ja: "ja",
    ko: "ko",
    fr: "fr",
    es: "es",
    ru: "ru",
  };
  if (primary in primaryMap) return primaryMap[primary]!;
  if (isLocale(raw)) return raw;
  return null;
}

/**
 * 按质量值协商：先看显式偏好，再扫 Accept-Language 列表。
 * @param preferred 用户已存偏好（可空）
 * @param acceptLanguage 浏览器 navigator.languages 或 Accept-Language 解析结果
 */
export function negotiateLocale(
  preferred: string | null | undefined,
  acceptLanguage: readonly string[] = [],
): Locale {
  if (preferred) {
    const fromPref = normalizeLanguageTag(preferred);
    if (fromPref) return fromPref;
  }
  for (const tag of acceptLanguage) {
    const hit = normalizeLanguageTag(tag);
    if (hit) return hit;
  }
  return DEFAULT_LOCALE;
}
