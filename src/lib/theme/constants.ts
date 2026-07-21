/**
 * 主题偏好存储键与默认值。
 * 目录外请经 `@/lib/theme` 导入。
 */
import type { CustomSchedule, ThemePreference } from "./types";

/** localStorage 键：整份 ThemePreference 的 JSON */
export const THEME_STORAGE_KEY = "henglu-theme";

/** 默认自定义时段：07:00–19:00 浅色，其余暗色 */
export const DEFAULT_SCHEDULE: CustomSchedule = {
  lightStart: "07:00",
  lightEnd: "19:00",
};

/** 默认偏好：跟随系统 */
export const DEFAULT_THEME_PREFERENCE: ThemePreference = {
  mode: "auto",
  schedule: { ...DEFAULT_SCHEDULE },
};
