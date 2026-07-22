import { describe, expect, it, beforeEach } from "vite-plus/test";
import { closePrefs, openPrefs, prefsOpenStore, togglePrefs } from "./chrome";

describe("prefsOpenStore", () => {
  beforeEach(() => {
    prefsOpenStore.set(false);
  });

  it("open / close / toggle", () => {
    openPrefs();
    expect(prefsOpenStore.get()).toBe(true);
    closePrefs();
    expect(prefsOpenStore.get()).toBe(false);
    togglePrefs();
    expect(prefsOpenStore.get()).toBe(true);
  });
});
