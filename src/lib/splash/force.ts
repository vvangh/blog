/**
 * Splash 强制展示：默认跟生产一样，本会话只播一次。
 * `?splash=1` 可强制每次都出（打磨用）；`?splash=0` 强制跳过。
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
 * 是否忽略 sessionStorage、每次进站都播。
 * @param _isDev 保留参数以兼容调用方（不再因开发态默认强制）
 * @param search `location.search`
 */
export function shouldForceSplashShow(_isDev: boolean, search: string): boolean {
  return parseSplashQuery(search) === "force";
}

/**
 * 是否强制跳过开屏（`?splash=0` / `off`）。
 * 与 force 互斥；跳过时 boot / 岛均直接写 `data-splash=done`。
 */
export function shouldSkipSplashShow(search: string): boolean {
  return parseSplashQuery(search) === "off";
}
