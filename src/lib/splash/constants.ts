/**
 * Splash 会话标记与时长（生产自动关须覆盖整段序曲 + 揭幕）。
 */
import { siteStorageKey } from "@/lib/site";

/** sessionStorage：本会话已看过开屏 */
export const SPLASH_STORAGE_KEY = siteStorageKey("splash-seen");

/** 点火序曲后开始揭幕（ms）；副标落定前后即交棒首页 */
export const SPLASH_CHOREO_MS = 4000;

/** 揭幕退场（ms）：略长于视觉揭幕，等 Hero/页脚接棒入场播完再卸岛 */
export const SPLASH_EXIT_MS = 1500;

/** 岛失败兜底：须大于序曲 + 揭幕 */
export const SPLASH_FAILSAFE_MS = SPLASH_CHOREO_MS + SPLASH_EXIT_MS + 1500;
