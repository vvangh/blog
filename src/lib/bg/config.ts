/**
 * 背景氛围层配置（图/视频、静态/轮播、顺序/打乱）。
 * 目录外请经 `@/lib/bg` 导入。
 */

export type BgMediaType = "image" | "video";

export type BgItem = {
  type: BgMediaType;
  /** public/ 下路径，勿含 base 前缀 */
  src: string;
  alt?: string;
};

export type BgConfig = {
  enabled: boolean;
  mode: "static" | "carousel";
  order: "sequential" | "shuffle";
  /** 轮播间隔（ms） */
  intervalMs: number;
  /** 叠层不透明度 0–1 */
  opacity: number;
  items: BgItem[];
};

/** 默认关闭：无素材时不渲染层；有素材时改 enabled 与 items */
export const BACKGROUND_CONFIG: BgConfig = {
  enabled: false,
  mode: "carousel",
  order: "shuffle",
  intervalMs: 12_000,
  opacity: 0.22,
  items: [
    // 示例（放入 public/bg/ 后启用）：
    // { type: "image", src: "bg/signal-1.webp", alt: "" },
    // { type: "video", src: "bg/signal-loop.webm" },
  ],
};

/** Fisher–Yates 打乱（纯函数，便于单测） */
export function shuffleItems<T>(items: readonly T[], seed = Date.now()): T[] {
  const arr = [...items];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export function resolvePlaylist(config: BgConfig, seed?: number): BgItem[] {
  if (!config.enabled || config.items.length === 0) return [];
  if (config.mode === "static") return [config.items[0]!];
  return config.order === "shuffle" ? shuffleItems(config.items, seed) : [...config.items];
}
