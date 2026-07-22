/**
 * 阅读密度与高对比偏好（与主题分开存）。
 * 目录外请经 `@/lib/a11y` 导入。
 */
import { siteStorageKey } from "@/lib/site";

export type ReadingDensity = "default" | "comfortable";

/** localStorage 键 */
export const A11Y_STORAGE_KEY = siteStorageKey("a11y");

export type A11yPreference = {
  density: ReadingDensity;
  highContrast: boolean;
};

export const DEFAULT_A11Y_PREFERENCE: A11yPreference = {
  density: "default",
  highContrast: false,
};

export function normalizeA11yPreference(raw: unknown): A11yPreference {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_A11Y_PREFERENCE };
  const obj = raw as Record<string, unknown>;
  const density = obj.density === "comfortable" ? "comfortable" : "default";
  const highContrast = obj.highContrast === true;
  return { density, highContrast };
}

export function readA11yPreference(): A11yPreference {
  if (typeof localStorage === "undefined") return { ...DEFAULT_A11Y_PREFERENCE };
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y_PREFERENCE };
    return normalizeA11yPreference(JSON.parse(raw) as unknown);
  } catch {
    return { ...DEFAULT_A11Y_PREFERENCE };
  }
}

export function writeA11yPreference(pref: A11yPreference): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(normalizeA11yPreference(pref)));
}

/** 写到 html dataset，供 CSS 挂钩 */
export function applyA11yPreference(pref: A11yPreference): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.density = pref.density;
  if (pref.highContrast) root.dataset.contrast = "high";
  else delete root.dataset.contrast;
}
