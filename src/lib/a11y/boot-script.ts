/**
 * 首屏前应用 a11y 偏好，避免闪动。
 */
import { A11Y_STORAGE_KEY, DEFAULT_A11Y_PREFERENCE } from "./prefs";

export function getA11yBootScript(): string {
  const key = A11Y_STORAGE_KEY;
  const density = DEFAULT_A11Y_PREFERENCE.density;
  return `(function(){try{var K=${JSON.stringify(key)};var raw=localStorage.getItem(K);var p=raw?JSON.parse(raw):null;var d=(p&&p.density)==="comfortable"?"comfortable":${JSON.stringify(density)};var hc=!!(p&&p.highContrast);var el=document.documentElement;el.dataset.density=d;if(hc)el.dataset.contrast="high";else delete el.dataset.contrast;}catch(e){}})();`;
}
