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

/** 页脚展示条；清空数组则不渲染 */
export const NOW_PLAYING: NowPlayingItem[] = [
  {
    kind: "listening",
    title: "Night Trails",
    artistOrCreator: "示例曲目",
  },
  {
    kind: "watching",
    title: "从零到一 · 建站纪录片（占位）",
  },
];
