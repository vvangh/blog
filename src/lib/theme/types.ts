/**
 * 主题四模式相关类型。
 * 目录外请经 `@/lib/theme` 导入。
 */

/** 用户可选的主题策略 */
export type ThemeMode = "light" | "dark" | "auto" | "custom";

/** 解析后实际生效的外观（仅浅/暗） */
export type ResolvedTheme = "light" | "dark";

/**
 * 自定义时段：在 lightStart–lightEnd 内用浅色，其余用暗色。
 * 支持跨午夜（如 22:00–06:00）。
 */
export interface CustomSchedule {
  /** 浅色开始，格式 HH:mm */
  lightStart: string;
  /** 浅色结束，格式 HH:mm（不含该时刻） */
  lightEnd: string;
}

/** 持久化到 localStorage 的完整偏好 */
export interface ThemePreference {
  mode: ThemeMode;
  schedule: CustomSchedule;
}
