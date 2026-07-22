/**
 * 在听 / 在看：静态配置（不连 Spotify 等需账号的 API）。
 * 目录外请经 `@/lib/now-playing` 导入。
 */

export type NowPlayingItem = {
  kind: "listening" | "watching";
  title: string;
  artistOrCreator?: string;
  url?: string;
};

/**
 * 页脚展示条。
 * 空数组 = 不渲染（没有在听/在看就不要占位糊弄）。
 * 有真实条目时再往里加，例如：
 * `{ kind: "listening", title: "曲名", artistOrCreator: "艺人" }`
 */
export const NOW_PLAYING: NowPlayingItem[] = [];
