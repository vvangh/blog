/**
 * Splash 强制展示规则单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { parseSplashQuery, shouldForceSplashShow, shouldSkipSplashShow } from "./force";

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
  it("默认不强制（开发/生产相同），仅 ?splash=1 强制", () => {
    expect(shouldForceSplashShow(true, "")).toBe(false);
    expect(shouldForceSplashShow(false, "")).toBe(false);
    expect(shouldForceSplashShow(true, "?splash=1")).toBe(true);
    expect(shouldForceSplashShow(false, "?splash=1")).toBe(true);
  });

  it("?splash=0 不强制", () => {
    expect(shouldForceSplashShow(true, "?splash=0")).toBe(false);
    expect(shouldForceSplashShow(false, "?splash=0")).toBe(false);
  });
});

describe("shouldSkipSplashShow", () => {
  it("仅 ?splash=0 / off 跳过", () => {
    expect(shouldSkipSplashShow("")).toBe(false);
    expect(shouldSkipSplashShow("?splash=1")).toBe(false);
    expect(shouldSkipSplashShow("?splash=0")).toBe(true);
    expect(shouldSkipSplashShow("?splash=off")).toBe(true);
  });
});
