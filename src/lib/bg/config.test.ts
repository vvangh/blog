/**
 * 背景播放列表与展示范围单测。
 */
import { describe, expect, it } from "vite-plus/test";
import {
  advanceIndex,
  resolvePlaylist,
  shouldShowBackground,
  shuffleItems,
  type BgConfig,
} from "./config";

const sample: BgConfig = {
  enabled: true,
  scope: "home",
  mode: "carousel",
  order: "sequential",
  intervalMs: 1000,
  opacity: 0.2,
  manualSwitch: true,
  items: [
    { type: "image", src: "a.webp" },
    { type: "image", src: "b.webp" },
    { type: "video", src: "c.webm" },
  ],
};

describe("resolvePlaylist", () => {
  it("disabled 或空列表返回空", () => {
    expect(resolvePlaylist({ ...sample, enabled: false })).toEqual([]);
    expect(resolvePlaylist({ ...sample, items: [] })).toEqual([]);
  });

  it("static 且无手动切换时只取第一项", () => {
    expect(resolvePlaylist({ ...sample, mode: "static", manualSwitch: false })).toEqual([
      sample.items[0],
    ]);
  });

  it("static 但允许手动切换时保留完整列表", () => {
    expect(
      resolvePlaylist({ ...sample, mode: "static", manualSwitch: true }).map((i) => i.src),
    ).toEqual(["a.webp", "b.webp", "c.webm"]);
  });

  it("sequential 保持顺序", () => {
    expect(resolvePlaylist(sample).map((i) => i.src)).toEqual(["a.webp", "b.webp", "c.webm"]);
  });

  it("shuffle 打乱但元素集合不变", () => {
    const out = shuffleItems(sample.items, 42);
    expect(out.map((i) => i.src).sort()).toEqual(["a.webp", "b.webp", "c.webm"]);
  });
});

describe("shouldShowBackground", () => {
  it("scope=home 仅首页显示", () => {
    expect(shouldShowBackground(sample, true)).toBe(true);
    expect(shouldShowBackground(sample, false)).toBe(false);
  });

  it("scope=site 全站显示", () => {
    expect(shouldShowBackground({ ...sample, scope: "site" }, false)).toBe(true);
  });
});

describe("advanceIndex", () => {
  it("循环前进与后退", () => {
    expect(advanceIndex(0, 3, 1)).toBe(1);
    expect(advanceIndex(2, 3, 1)).toBe(0);
    expect(advanceIndex(0, 3, -1)).toBe(2);
  });
});
