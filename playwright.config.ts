/**
 * Playwright E2E：预览静态站（含 base=/blog/），关键路径 + axe。
 */
import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const BASE = "http://127.0.0.1:4173/blog/";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // 本地并行过多会把 preview 打满导致 goto 超时；CI 单 worker 更稳
  workers: process.env.CI ? 1 : 4,
  reporter: process.env.CI ? "github" : "list",
  timeout: 45_000,
  use: {
    baseURL: BASE,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    // 注意：勿写成 `vp run preview -- --host`，多余的 `--` 会导致 Astro 忽略 host/port
    command: process.env.CI
      ? `vp run preview --host 127.0.0.1 --port ${PORT}`
      : `vp run build && vp run preview --host 127.0.0.1 --port ${PORT}`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
