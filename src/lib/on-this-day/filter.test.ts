import { describe, expect, it } from "vite-plus/test";
import { filterOnThisDay, monthDayKey } from "./filter";

describe("on-this-day", () => {
  it("monthDayKey", () => {
    expect(monthDayKey(new Date(Date.UTC(2024, 6, 21)))).toBe("07-21");
  });

  it("聚合往年同日", () => {
    const items = [
      {
        id: "a",
        title: "2024",
        pubDate: new Date(Date.UTC(2024, 6, 21)),
        href: "/a",
        section: "life",
      },
      {
        id: "b",
        title: "2025",
        pubDate: new Date(Date.UTC(2025, 6, 21)),
        href: "/b",
        section: "life",
      },
      {
        id: "c",
        title: "other",
        pubDate: new Date(Date.UTC(2025, 0, 1)),
        href: "/c",
        section: "life",
      },
    ];
    const result = filterOnThisDay(items, new Date(Date.UTC(2026, 6, 21)));
    expect(result.map((r) => r.id)).toEqual(["b", "a"]);
  });
});
