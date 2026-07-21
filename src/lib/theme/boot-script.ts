/**
 * 写入 <head> 的极短内联脚本字符串：在首屏绘制前应用主题，避免闪白/闪黑。
 * 逻辑与 `@/lib/theme` 的 resolve / storage 约定对齐；改解析规则时两边一起改。
 */
import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * 生成内联脚本正文（不含 <script> 标签）。
 * 刻意自包含，不依赖打包模块，以便 Astro 以 is:inline 注入。
 */
export function getThemeBootScript(): string {
  const key = THEME_STORAGE_KEY;
  const fallbackMode = DEFAULT_THEME_PREFERENCE.mode;
  const fallbackStart = DEFAULT_THEME_PREFERENCE.schedule.lightStart;
  const fallbackEnd = DEFAULT_THEME_PREFERENCE.schedule.lightEnd;

  return `(function(){try{var K=${JSON.stringify(key)};var raw=localStorage.getItem(K);var pref=raw?JSON.parse(raw):null;var mode=(pref&&pref.mode)||${JSON.stringify(fallbackMode)};var sch=(pref&&pref.schedule)||{};var start=sch.lightStart||${JSON.stringify(fallbackStart)};var end=sch.lightEnd||${JSON.stringify(fallbackEnd)};function parse(hm){var p=String(hm).split(":");var h=+p[0],m=+p[1];if(isNaN(h)||isNaN(m))return null;return h*60+m;}function inLight(now,s,e){var a=parse(s),b=parse(e);if(a==null||b==null)return true;if(a===b)return true;if(a<b)return now>=a&&now<b;return now>=a||now<b;}var dark=false;if(mode==="dark")dark=true;else if(mode==="light")dark=false;else if(mode==="custom"){var d=new Date();var mins=d.getHours()*60+d.getMinutes();dark=!inLight(mins,start,end);}else{dark=window.matchMedia("(prefers-color-scheme: dark)").matches;}var r=dark?"dark":"light";var el=document.documentElement;el.dataset.theme=r;el.style.colorScheme=r;}catch(e){document.documentElement.dataset.theme="light";}})();`;
}
