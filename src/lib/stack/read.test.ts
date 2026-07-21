import { describe, expect, it } from "vite-plus/test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readStackFromPackageJson } from "./read";

describe("stack", () => {
  it("从 package.json 读取主力栈", () => {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
    const items = readStackFromPackageJson(root);
    expect(items.some((i) => i.name === "astro")).toBe(true);
    expect(items.some((i) => i.name === "vue")).toBe(true);
  });
});
