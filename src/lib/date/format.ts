/**
 * 日期展示格式化（dayjs + 多 locale）。
 * 目录外请经 `@/lib/date` 导入。
 */
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh-cn";
import "dayjs/locale/zh-tw";
import "dayjs/locale/en";
import "dayjs/locale/de";
import "dayjs/locale/ja";
import "dayjs/locale/ko";
import "dayjs/locale/ru";
import "dayjs/locale/fr";
import "dayjs/locale/es";
import "dayjs/locale/pt";
import "dayjs/locale/ar";
import "dayjs/locale/vi";
import "dayjs/locale/th";
import "dayjs/locale/id";
import "dayjs/locale/hi";
import "dayjs/locale/it";
import "dayjs/locale/tr";
import "dayjs/locale/pl";
import "dayjs/locale/uk";
import "dayjs/locale/nl";

dayjs.extend(localizedFormat);

/** 站点 locale → dayjs locale 名 */
const DAYJS_LOCALE: Record<string, string> = {
  "zh-Hans": "zh-cn",
  "zh-Hant": "zh-tw",
  en: "en",
  de: "de",
  ja: "ja",
  ko: "ko",
  ru: "ru",
  fr: "fr",
  es: "es",
  pt: "pt",
  ar: "ar",
  vi: "vi",
  th: "th",
  id: "id",
  hi: "hi",
  it: "it",
  tr: "tr",
  pl: "pl",
  uk: "uk",
  nl: "nl",
};

/**
 * @param date 日期
 * @param locale 站点 BCP 47（缺省 zh-Hans）
 */
export function formatDate(date: Date, locale = "zh-Hans"): string {
  const dj = DAYJS_LOCALE[locale] ?? "zh-cn";
  return dayjs(date).locale(dj).format("ll");
}
