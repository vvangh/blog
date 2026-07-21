import { describe, expect, it } from "vite-plus/test";
import { resolveNewsletterAction } from "./config";

describe("newsletter", () => {
  it("缺 action 返回 null", () => {
    expect(resolveNewsletterAction({})).toBeNull();
  });
});
