import { describe, expect, it } from "vite-plus/test";
import { buildHeatmap, countByDay, toDateKey } from "./build";

describe("heatmap", () => {
  it("toDateKey 用 UTC 日历日", () => {
    expect(toDateKey(new Date(Date.UTC(2026, 6, 21)))).toBe("2026-07-21");
  });

  it("countByDay 聚合同日", () => {
    const map = countByDay([
      new Date(Date.UTC(2026, 6, 21)),
      new Date(Date.UTC(2026, 6, 21)),
      new Date(Date.UTC(2026, 6, 20)),
    ]);
    expect(map.get("2026-07-21")).toBe(2);
    expect(map.get("2026-07-20")).toBe(1);
  });

  it("buildHeatmap 产出固定天数且含强度", () => {
    const end = new Date(Date.UTC(2026, 6, 21));
    const cells = buildHeatmap([new Date(Date.UTC(2026, 6, 21))], end, 7);
    expect(cells).toHaveLength(7);
    expect(cells.at(-1)?.date).toBe("2026-07-21");
    expect(cells.at(-1)?.level).toBeGreaterThan(0);
  });
});
