/**
 * `@/lib/i18n` 公开面：语种、协商、消息表、路径助手。
 */
export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from "./locales";
export { negotiateLocale, normalizeLanguageTag } from "./negotiate";
export { MESSAGES, formatMessage, translate, type MessageKey } from "./messages";
export { localePath, stripLocaleFromPath } from "./paths";
