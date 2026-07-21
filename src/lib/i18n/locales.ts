/**
 * 支持的语言与默认语言。
 * 目录外请经 `@/lib/i18n` 导入。
 */

/** 首批五语种（BCP 47） */
export const LOCALES = ["zh-Hans", "zh-Hant", "en", "de", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

/** 默认 / 回退语言 */
export const DEFAULT_LOCALE: Locale = "zh-Hans";

/** localStorage 键：用户手动选择的语言 */
export const LOCALE_STORAGE_KEY = "henglu-locale";

/** 语言展示名（用于切换器，自身用该语言书写） */
export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  en: "English",
  de: "Deutsch",
  ja: "日本語",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
