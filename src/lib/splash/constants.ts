/**
 * Splash 会话标记与时长（生产自动关须覆盖整段序曲 + 揭幕）。
 */
import { siteStorageKey } from "@/lib/site";

/** sessionStorage：本会话已看过开屏 */
export const SPLASH_STORAGE_KEY = siteStorageKey("splash-seen");

/** 点火序曲播完（ms），此后生产态开始揭幕 */
export const SPLASH_CHOREO_MS = 5600;

/** 揭幕退场（ms） */
export const SPLASH_EXIT_MS = 900;

/** 岛失败兜底：须大于序曲 + 揭幕 */
export const SPLASH_FAILSAFE_MS = SPLASH_CHOREO_MS + SPLASH_EXIT_MS + 1500;
