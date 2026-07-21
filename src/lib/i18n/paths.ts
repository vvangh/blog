/**
 * 带语言前缀的站内路径（已含 base）。
 * 目录外请经 `@/lib/i18n` 导入。
 */
import { SITE_BASE } from "@/lib/site";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

/**
 * @param locale 语言
 * @param path 相对路径，如 '' | 'blog' | 'blog/hello'（不要前导 /）
 */
export function localePath(locale: Locale, path = ""): string {
  const base = SITE_BASE.endsWith("/") ? SITE_BASE : `${SITE_BASE}/`;
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!clean) return `${base}${locale}/`;
  return `${base}${locale}/${clean}/`;
}

/** 从 pathname 抽出语言前缀；无法识别则回退默认 */
export function stripLocaleFromPath(pathname: string): { locale: Locale; rest: string } {
  const base = SITE_BASE.endsWith("/") ? SITE_BASE.slice(0, -1) : SITE_BASE;
  let rest = pathname;
  if (rest.startsWith(base)) {
    rest = rest.slice(base.length);
  }
  rest = rest.replace(/^\/+/, "");
  const [maybeLocale, ...parts] = rest.split("/");
  if (maybeLocale && isLocale(maybeLocale)) {
    return { locale: maybeLocale, rest: parts.filter(Boolean).join("/") };
  }
  return { locale: DEFAULT_LOCALE, rest: rest.replace(/\/+$/, "") };
}
