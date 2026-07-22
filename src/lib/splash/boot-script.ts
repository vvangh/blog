/**
 * 写入 <head>：在首屏绘制前标记 data-splash，避免 Hero rise 被 Splash 盖住跑完。
 * pending → Splash 展示中；exit → 揭幕叠化；done → 入场已放行。
 * 另设超时兜底：岛未挂载时也不至于永久 pending。
 *
 * 默认本会话只播一次（读 sessionStorage）；`?splash=1` 强制每次播，`?splash=0` 跳过。
 * 岛侧序曲结束会自动揭幕；failsafe 仅防岛失败卡死。
 */
import { SPLASH_FAILSAFE_MS, SPLASH_STORAGE_KEY } from "./constants";

/**
 * 生成内联脚本正文（不含 <script> 标签）。
 */
export function getSplashBootScript(): string {
  const key = SPLASH_STORAGE_KEY;
  const failsafe = SPLASH_FAILSAFE_MS;
  return `(function(){try{var K=${JSON.stringify(key)};var el=document.documentElement;var q=(location.search.match(/[?&]splash=([^&]*)/)||[])[1];var force=q==="1"||q==="always"||q==="force";var off=q==="0"||q==="off";var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(off||(!force&&(sessionStorage.getItem(K)==="1"||reduce))){el.dataset.splash="done";if(off||reduce){try{sessionStorage.setItem(K,"1");}catch(e2){}}}else{el.dataset.splash="pending";setTimeout(function(){if(el.dataset.splash==="pending"){el.dataset.splash="done";if(!force){try{sessionStorage.setItem(K,"1");}catch(e2){}}}},${failsafe});}}catch(e){document.documentElement.dataset.splash="done";}})();`;
}
