import { describe, expect, it } from "vite-plus/test";
import { estimateReadingMinutes } from "./estimate";

describe("estimateReadingMinutes", () => {
  it("空文至少 1 分钟", () => {
    expect(estimateReadingMinutes("").minutes).toBe(1);
  });

  it("中文按字数估算", () => {
    const text = "衡".repeat(800);
    expect(estimateReadingMinutes(text).minutes).toBe(2);
  });

  it("英文按词数估算", () => {
    const text = Array.from({ length: 400 }, () => "word").join(" ");
    expect(estimateReadingMinutes(text).minutes).toBe(2);
  });
});
