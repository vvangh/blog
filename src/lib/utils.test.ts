import { describe, expect, it } from "vite-plus/test";
import { cn } from "./utils";

describe("cn", () => {
  it("合并并去掉冲突的 Tailwind 类", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});
