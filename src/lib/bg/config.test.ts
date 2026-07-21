/**
 * 背景播放列表解析单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { resolvePlaylist, shuffleItems, type BgConfig } from "./config";

const sample: BgConfig = {
  enabled: true,
  mode: "carousel",
  order: "sequential",
  intervalMs: 1000,
  opacity: 0.2,
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

  it("static 只取第一项", () => {
    expect(resolvePlaylist({ ...sample, mode: "static" })).toEqual([sample.items[0]]);
  });

  it("sequential 保持顺序", () => {
    expect(resolvePlaylist(sample).map((i) => i.src)).toEqual(["a.webp", "b.webp", "c.webm"]);
  });

  it("shuffle 打乱但元素集合不变", () => {
    const out = shuffleItems(sample.items, 42);
    expect(out.map((i) => i.src).sort()).toEqual(["a.webp", "b.webp", "c.webm"]);
  });
});
