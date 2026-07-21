/**
 * `@/lib/theme` 公开面：主题四模式类型、解析、存储。
 */
export type { CustomSchedule, ResolvedTheme, ThemeMode, ThemePreference } from "./types";
export { DEFAULT_SCHEDULE, DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from "./constants";
export { isInLightWindow, parseHmToMinutes, resolveEffectiveTheme } from "./resolve";
export {
  applyResolvedTheme,
  normalizePreference,
  readThemePreference,
  writeThemePreference,
} from "./storage";
export { getThemeBootScript } from "./boot-script";
