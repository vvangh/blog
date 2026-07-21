import { describe, expect, it } from "vite-plus/test";
import { normalizeA11yPreference } from "./prefs";

describe("a11y prefs", () => {
  it("规范化坏数据", () => {
    expect(normalizeA11yPreference(null)).toEqual({ density: "default", highContrast: false });
    expect(normalizeA11yPreference({ density: "comfortable", highContrast: true })).toEqual({
      density: "comfortable",
      highContrast: true,
    });
  });
});
