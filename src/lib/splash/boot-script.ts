/**
 * 写入 <head>：在首屏绘制前标记 data-splash，避免 Hero rise 被 Splash 盖住跑完。
 * pending → Splash 展示中；exit → 揭幕叠化；done → 入场已放行。
 * 另设超时兜底：岛未挂载时也不至于永久 pending。
 *
 * 开发态默认每次都播（不读 sessionStorage）；`?splash=0` 可关，`?splash=1` 生产可强制。
 * 岛侧序曲结束会自动揭幕；failsafe 仅防岛失败卡死。
 */
import { SPLASH_FAILSAFE_MS, SPLASH_STORAGE_KEY } from "./constants";

/**
 * 生成内联脚本正文（不含 <script> 标签）。
 */
export function getSplashBootScript(): string {
  const key = SPLASH_STORAGE_KEY;
  const failsafe = SPLASH_FAILSAFE_MS;
  const isDev = import.meta.env.DEV;
  return `(function(){try{var K=${JSON.stringify(key)};var el=document.documentElement;var q=(location.search.match(/[?&]splash=([^&]*)/)||[])[1];var force=${isDev ? "true" : "false"};if(q==="0"||q==="off")force=false;if(q==="1"||q==="always"||q==="force")force=true;var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!force&&(sessionStorage.getItem(K)==="1"||reduce)){el.dataset.splash="done";}else{el.dataset.splash="pending";setTimeout(function(){if(el.dataset.splash==="pending"){el.dataset.splash="done";if(!force){try{sessionStorage.setItem(K,"1");}catch(e2){}}}},${failsafe});}}catch(e){document.documentElement.dataset.splash="done";}})();`;
}
