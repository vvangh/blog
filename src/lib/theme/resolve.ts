/**
 * 主题解析纯函数：根据模式、系统偏好与自定义时段算出浅/暗。
 * 目录外请经 `@/lib/theme` 导入；也供 head 内联脚本逻辑对齐单测。
 */
import type { CustomSchedule, ResolvedTheme, ThemeMode } from "./types";

/** HH:mm → 当日分钟数；非法返回 null */
export function parseHmToMinutes(hm: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hm.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

/**
 * 判断当前分钟是否落在浅色窗口内。
 * start === end 视为全天浅色；start > end 表示跨午夜。
 */
export function isInLightWindow(nowMinutes: number, schedule: CustomSchedule): boolean {
  const start = parseHmToMinutes(schedule.lightStart);
  const end = parseHmToMinutes(schedule.lightEnd);
  if (start === null || end === null) return true;
  if (start === end) return true;
  if (start < end) {
    return nowMinutes >= start && nowMinutes < end;
  }
  // 跨午夜：例如 22:00–06:00
  return nowMinutes >= start || nowMinutes < end;
}

/**
 * 将用户模式解析为实际浅/暗。
 * @param mode 四模式之一
 * @param prefersDark 系统是否偏好暗色（auto 用）
 * @param schedule 自定义时段
 * @param now 可选，便于单测注入时间
 */
export function resolveEffectiveTheme(
  mode: ThemeMode,
  prefersDark: boolean,
  schedule: CustomSchedule,
  now: Date = new Date(),
): ResolvedTheme {
  switch (mode) {
    case "light":
      return "light";
    case "dark":
      return "dark";
    case "auto":
      return prefersDark ? "dark" : "light";
    case "custom": {
      const mins = now.getHours() * 60 + now.getMinutes();
      return isInLightWindow(mins, schedule) ? "light" : "dark";
    }
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}
