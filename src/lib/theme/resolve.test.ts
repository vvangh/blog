/**
 * 主题解析单测：同日窗口、跨午夜、auto、非法时间回退。
 */
import { describe, expect, it } from "vite-plus/test";
import { DEFAULT_SCHEDULE } from "./constants";
import { isInLightWindow, parseHmToMinutes, resolveEffectiveTheme } from "./resolve";
import { normalizePreference } from "./storage";

describe("parseHmToMinutes", () => {
  it("parses valid HH:mm", () => {
    expect(parseHmToMinutes("07:00")).toBe(7 * 60);
    expect(parseHmToMinutes("19:30")).toBe(19 * 60 + 30);
  });

  it("rejects invalid", () => {
    expect(parseHmToMinutes("25:00")).toBeNull();
    expect(parseHmToMinutes("abc")).toBeNull();
  });
});

describe("isInLightWindow", () => {
  it("handles same-day window 07:00–19:00", () => {
    const schedule = { lightStart: "07:00", lightEnd: "19:00" };
    expect(isInLightWindow(8 * 60, schedule)).toBe(true);
    expect(isInLightWindow(6 * 60, schedule)).toBe(false);
    expect(isInLightWindow(19 * 60, schedule)).toBe(false);
  });

  it("handles cross-midnight window 22:00–06:00", () => {
    const schedule = { lightStart: "22:00", lightEnd: "06:00" };
    expect(isInLightWindow(23 * 60, schedule)).toBe(true);
    expect(isInLightWindow(3 * 60, schedule)).toBe(true);
    expect(isInLightWindow(12 * 60, schedule)).toBe(false);
  });
});

describe("resolveEffectiveTheme", () => {
  const noon = new Date(2026, 6, 21, 12, 0, 0);
  const night = new Date(2026, 6, 21, 22, 0, 0);

  it("resolves light/dark/auto", () => {
    expect(resolveEffectiveTheme("light", true, DEFAULT_SCHEDULE, noon)).toBe("light");
    expect(resolveEffectiveTheme("dark", false, DEFAULT_SCHEDULE, noon)).toBe("dark");
    expect(resolveEffectiveTheme("auto", true, DEFAULT_SCHEDULE, noon)).toBe("dark");
    expect(resolveEffectiveTheme("auto", false, DEFAULT_SCHEDULE, noon)).toBe("light");
  });

  it("resolves custom by schedule", () => {
    expect(resolveEffectiveTheme("custom", false, DEFAULT_SCHEDULE, noon)).toBe("light");
    expect(resolveEffectiveTheme("custom", false, DEFAULT_SCHEDULE, night)).toBe("dark");
  });
});

describe("normalizePreference", () => {
  it("falls back on garbage", () => {
    const pref = normalizePreference({ mode: "neon", schedule: { lightStart: "xx" } });
    expect(pref.mode).toBe("auto");
    expect(pref.schedule.lightStart).toBe("07:00");
  });
});
