/**
 * Splash 是否强制每次展示：开发态默认每次都出，便于打磨；
 * `?splash=1` 生产也可强制；`?splash=0` 开发也可关掉。
 * 强制只影响「是否忽略 session / 每次都播」，播完仍自动揭幕。
 */
export type SplashQueryMode = "force" | "off" | "default";

/** 解析 URL 上的 splash 查询参数 */
export function parseSplashQuery(search: string): SplashQueryMode {
  const raw = new URLSearchParams(search).get("splash");
  if (raw === "0" || raw === "off") return "off";
  if (raw === "1" || raw === "always" || raw === "force") return "force";
  return "default";
}

/**
 * 是否忽略 sessionStorage / 固定展示。
 * @param isDev 是否开发构建（`import.meta.env.DEV`）
 * @param search `location.search`
 */
export function shouldForceSplashShow(isDev: boolean, search: string): boolean {
  const mode = parseSplashQuery(search);
  if (mode === "off") return false;
  if (mode === "force") return true;
  return isDev;
}
