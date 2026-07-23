/**
 * 标签 URL 编解码：中文与特殊字符往返一致。
 */
import { describe, expect, it } from "vite-plus/test";
import { fromTagParam, toTagParam } from "./slug";

describe("toTagParam / fromTagParam", () => {
  it("round-trips ASCII tags", () => {
    expect(fromTagParam(toTagParam("astro"))).toBe("astro");
  });

  it("round-trips Chinese tags", () => {
    expect(fromTagParam(toTagParam("前端"))).toBe("前端");
  });

  it("round-trips slash and space", () => {
    expect(fromTagParam(toTagParam("a/b c"))).toBe("a/b c");
  });
});
