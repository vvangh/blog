/**
 * Splash 强制展示规则单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { parseSplashQuery, shouldForceSplashShow } from "./force";

describe("parseSplashQuery", () => {
  it("识别强制与关闭", () => {
    expect(parseSplashQuery("?splash=1")).toBe("force");
    expect(parseSplashQuery("?splash=always")).toBe("force");
    expect(parseSplashQuery("?x=1&splash=force")).toBe("force");
    expect(parseSplashQuery("?splash=0")).toBe("off");
    expect(parseSplashQuery("?splash=off")).toBe("off");
    expect(parseSplashQuery("")).toBe("default");
  });
});

describe("shouldForceSplashShow", () => {
  it("开发态默认强制，可被 ?splash=0 关掉", () => {
    expect(shouldForceSplashShow(true, "")).toBe(true);
    expect(shouldForceSplashShow(true, "?splash=0")).toBe(false);
  });

  it("生产默认不强制，?splash=1 可开", () => {
    expect(shouldForceSplashShow(false, "")).toBe(false);
    expect(shouldForceSplashShow(false, "?splash=1")).toBe(true);
  });
});
