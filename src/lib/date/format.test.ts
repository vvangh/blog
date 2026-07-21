/**
 * dayjs 日期格式化单测。
 */
import { describe, expect, it } from "vite-plus/test";
import { formatDate } from "@/lib/date";

describe("formatDate", () => {
  it("formats English locale", () => {
    const text = formatDate(new Date("2026-07-21T12:00:00Z"), "en");
    expect(text.length).toBeGreaterThan(0);
    expect(text).toMatch(/2026|Jul|July|21/i);
  });

  it("formats zh-Hans", () => {
    const text = formatDate(new Date("2026-07-21T12:00:00Z"), "zh-Hans");
    expect(text.length).toBeGreaterThan(0);
  });
});
