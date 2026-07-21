/**
 * 主题偏好读写（浏览器 localStorage）。
 * SSR/构建期无 window 时返回默认值，不抛错。
 * 目录外请经 `@/lib/theme` 导入。
 */
import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from "./constants";
import type { ThemeMode, ThemePreference } from "./types";
import { parseHmToMinutes } from "./resolve";

const MODES: ReadonlySet<string> = new Set(["light", "dark", "auto", "custom"]);

function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && MODES.has(value);
}

/** 校验并规范化偏好；坏数据回退默认 */
export function normalizePreference(raw: unknown): ThemePreference {
  if (!raw || typeof raw !== "object") {
    return structuredClone(DEFAULT_THEME_PREFERENCE);
  }
  const obj = raw as Record<string, unknown>;
  const mode = isThemeMode(obj.mode) ? obj.mode : DEFAULT_THEME_PREFERENCE.mode;
  const scheduleRaw =
    obj.schedule && typeof obj.schedule === "object"
      ? (obj.schedule as Record<string, unknown>)
      : {};
  const lightStart =
    typeof scheduleRaw.lightStart === "string" && parseHmToMinutes(scheduleRaw.lightStart) !== null
      ? scheduleRaw.lightStart
      : DEFAULT_THEME_PREFERENCE.schedule.lightStart;
  const lightEnd =
    typeof scheduleRaw.lightEnd === "string" && parseHmToMinutes(scheduleRaw.lightEnd) !== null
      ? scheduleRaw.lightEnd
      : DEFAULT_THEME_PREFERENCE.schedule.lightEnd;
  return { mode, schedule: { lightStart, lightEnd } };
}

/** 从 localStorage 读取偏好 */
export function readThemePreference(): ThemePreference {
  if (typeof localStorage === "undefined") {
    return structuredClone(DEFAULT_THEME_PREFERENCE);
  }
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_THEME_PREFERENCE);
    return normalizePreference(JSON.parse(raw) as unknown);
  } catch {
    return structuredClone(DEFAULT_THEME_PREFERENCE);
  }
}

/** 写入偏好 */
export function writeThemePreference(preference: ThemePreference): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(normalizePreference(preference)));
}

/**
 * 把解析结果写到 <html data-theme>，供 CSS 变量切换。
 * 同时同步 color-scheme，便于原生控件配色。
 */
export function applyResolvedTheme(resolved: "light" | "dark"): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
}
