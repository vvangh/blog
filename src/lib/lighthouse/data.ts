/**
 * Lighthouse 分数墙数据（手工/CI 录入）。
 * 目录外请经 `@/lib/lighthouse` 导入。
 */

export type LighthouseScore = {
  milestone: string;
  date: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export const LIGHTHOUSE_SCORES: LighthouseScore[] = [
  {
    milestone: "M4",
    date: "2026-06-01",
    performance: 85,
    accessibility: 92,
    bestPractices: 90,
    seo: 95,
  },
  {
    milestone: "M6",
    date: "2026-07-21",
    performance: 92,
    accessibility: 96,
    bestPractices: 95,
    seo: 100,
  },
];
