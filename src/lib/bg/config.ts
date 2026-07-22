/**
 * 背景氛围层配置（图/视频、静态/轮播、顺序/打乱、首屏/全站）。
 * 目录外请经 `@/lib/bg` 导入。
 */

export type BgMediaType = "image" | "video";

/** home：仅首页；site：全站页面 */
export type BgScope = "home" | "site";

export type BgItem = {
  type: BgMediaType;
  /** public/ 下路径，勿含 base 前缀 */
  src: string;
  alt?: string;
};

export type BgConfig = {
  enabled: boolean;
  /** 展示范围：默认首页首屏氛围，正文区仍用主题底色 */
  scope: BgScope;
  /** static：不自动切；carousel：按 interval 自动切 */
  mode: "static" | "carousel";
  order: "sequential" | "shuffle";
  /** 轮播间隔（ms） */
  intervalMs: number;
  /** 叠层不透明度 0–1 */
  opacity: number;
  /** 多项时是否显示手动上一张/下一张 */
  manualSwitch: boolean;
  items: BgItem[];
};

/**
 * 壁纸来源：本机「哲风壁纸·休闲-室内-居家」→ public/bg/wallpaper.png。
 * 用法见 docs/设计/壁纸背景.md。
 */
export const BACKGROUND_CONFIG: BgConfig = {
  enabled: true,
  scope: "home",
  mode: "static",
  order: "sequential",
  intervalMs: 12_000,
  /** 首屏直出壁纸，不加白蒙；需要淡一点再降此值 */
  opacity: 1,
  manualSwitch: true,
  items: [{ type: "image", src: "bg/wallpaper.png", alt: "" }],
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

/**
 * 解析播放列表。
 * - static 且关闭手动切换：只留首项
 * - 其余：按 order 排出完整列表（供轮播或手动切换）
 */
export function resolvePlaylist(config: BgConfig, seed?: number): BgItem[] {
  if (!config.enabled || config.items.length === 0) return [];
  const ordered = config.order === "shuffle" ? shuffleItems(config.items, seed) : [...config.items];
  if (config.mode === "static" && !config.manualSwitch) {
    return [ordered[0]!];
  }
  return ordered;
}

/** 当前页是否应挂载背景层 */
export function shouldShowBackground(config: BgConfig, isHome: boolean): boolean {
  if (!config.enabled || config.items.length === 0) return false;
  return config.scope === "site" || isHome;
}

export function advanceIndex(current: number, length: number, delta: number): number {
  if (length <= 0) return 0;
  return (((current + delta) % length) + length) % length;
}
