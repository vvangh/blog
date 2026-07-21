import { describe, expect, it } from "vite-plus/test";
import { parseJf2Mentions, resolveWebmentionEndpoint } from "./config";

describe("webmentions", () => {
  it("缺 endpoint 返回 null", () => {
    expect(resolveWebmentionEndpoint({})).toBeNull();
  });

  it("解析 JF2 children", () => {
    const items = parseJf2Mentions({
      children: [
        {
          url: "https://example.com/a",
          author: { name: "Ada" },
          "wm-id": 1,
          content: { text: "nice" },
        },
      ],
    });
    expect(items).toHaveLength(1);
    expect(items[0]?.author).toBe("Ada");
  });
});
