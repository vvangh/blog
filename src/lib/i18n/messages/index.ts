/**
 * 消息表聚合与插值翻译。
 */
import type { Locale } from "../locales";
import type { Catalog, MessageKey } from "./keys";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ja } from "./ja";
import { ko } from "./ko";
import { ru } from "./ru";
import { zhHans } from "./zh-Hans";
import { zhHant } from "./zh-Hant";

export type { Catalog, MessageKey } from "./keys";

export const MESSAGES: Record<Locale, Catalog> = {
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  en,
  de,
  ja,
  ko,
  fr,
  es,
  ru,
};

/** 简单插值：`{year}` → params.year */
export function formatMessage(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in params ? String(params[key]) : `{${key}}`,
  );
}

export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  const catalog = MESSAGES[locale] ?? MESSAGES["zh-Hans"];
  const text = catalog[key] || MESSAGES["zh-Hans"][key];
  return formatMessage(text, params);
}
