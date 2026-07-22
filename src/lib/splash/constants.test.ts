/**
 * Splash 时长常量单测。
 */
import { describe, expect, it } from "vite-plus/test";
import {
  SPLASH_CHOREO_MS,
  SPLASH_EXIT_MS,
  SPLASH_FAILSAFE_MS,
  SPLASH_HYDRATE_SLACK_MS,
} from "./constants";

describe("splash timing", () => {
  it("failsafe 覆盖序曲 + 揭幕 + 水合余量", () => {
    expect(SPLASH_FAILSAFE_MS).toBe(SPLASH_CHOREO_MS + SPLASH_EXIT_MS + SPLASH_HYDRATE_SLACK_MS);
    expect(SPLASH_HYDRATE_SLACK_MS).toBeGreaterThanOrEqual(5000);
    expect(SPLASH_FAILSAFE_MS).toBeGreaterThan(SPLASH_CHOREO_MS + SPLASH_EXIT_MS);
  });
});
