/**
 * 写入 <head>：在首屏绘制前标记 data-splash，避免 Hero rise 被 Splash 盖住跑完。
 * pending → Splash 展示中；done → 可播入场（已看过 / 降级 / 关闭后）。
 * 另设超时兜底：岛未挂载时也不至于永久 pending。
 */
import { SPLASH_STORAGE_KEY } from "./constants";

/** 岛失败时的最长等待（ms），须大于 Splash 正常时长 */
const SPLASH_FAILSAFE_MS = 4000;

/**
 * 生成内联脚本正文（不含 <script> 标签）。
 */
export function getSplashBootScript(): string {
  const key = SPLASH_STORAGE_KEY;
  const failsafe = SPLASH_FAILSAFE_MS;
  return `(function(){try{var K=${JSON.stringify(key)};var el=document.documentElement;if(sessionStorage.getItem(K)==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches){el.dataset.splash="done";}else{el.dataset.splash="pending";setTimeout(function(){if(el.dataset.splash==="pending"){el.dataset.splash="done";try{sessionStorage.setItem(K,"1");}catch(e2){}}},${failsafe});}}catch(e){document.documentElement.dataset.splash="done";}})();`;
}
