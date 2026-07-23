/**
 * E2E：首页协商跳转、导航、主题控件、axe 扫描。
 */
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { clickMoreNavLink, mainNav, openPrefsPanel } from "./helpers";

test.describe("vv 关键路径", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("vv-splash-seen", "1");
    });
  });

  test("根路径最终落到带语言前缀的首页", async ({ page }) => {
    await page.goto("./");
    await page.waitForURL(/\/blog\/(zh-Hans|zh-Hant|en|de|ja|ko|fr|es|ru)\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("vv");
  });

  test("主导航可进入技术；从零到一在更多中", async ({ page }) => {
    await page.goto("./zh-Hans/");
    await mainNav(page).getByRole("link", { name: "技术" }).click();
    await expect(page).toHaveURL(/\/blog\/zh-Hans\/blog\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("技术");

    await page.goto("./zh-Hans/");
    await clickMoreNavLink(page, "从零到一");
    await expect(page).toHaveURL(/\/blog\/zh-Hans\/build\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("从零到一");
  });

  test("关于与友链页可达", async ({ page }) => {
    await page.goto("./zh-Hans/");
    await mainNav(page).getByRole("link", { name: "关于" }).click();
    await expect(page).toHaveURL(/\/blog\/zh-Hans\/about\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("关于");

    await page.goto("./zh-Hans/");
    await clickMoreNavLink(page, "友链");
    await expect(page).toHaveURL(/\/blog\/zh-Hans\/friends\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("友链");
  });

  test("英文首页导航文案切换", async ({ page }) => {
    await page.goto("./en/");
    const nav = page.getByRole("navigation", { name: "Main navigation" }).first();
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Tech" })).toBeVisible();
  });

  test("主题四模式单选可切换且保留焦点可达", async ({ page }) => {
    await page.goto("./zh-Hans/");
    await openPrefsPanel(page);
    const dark = page.getByRole("radio", { name: /暗色/ });
    await expect(dark).toBeVisible();
    await dark.check();
    await expect(dark).toBeChecked();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark", { timeout: 10_000 });

    // 「自定义」进入时段子页，确认前不会 aria-checked，不能用 check()
    const custom = page.getByRole("radio", { name: /自定义/ });
    await custom.click();
    await expect(page.getByLabel("浅色开始")).toBeVisible();
    await expect(page.getByLabel("浅色结束")).toBeVisible();
  });

  test("首页与文章分区通过 axe wcag2a/aa", async ({ page }) => {
    for (const path of ["./zh-Hans/", "./zh-Hans/blog/", "./zh-Hans/build/"]) {
      await page.goto(path);
      // 等入场动效结束，避免 axe 采到动画中间态的半透明前景色
      await page.waitForTimeout(900);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        // ink-invert 用 mix-blend-mode:difference，axe 只看到源色 #fff，无法评估真实对比度
        .exclude(".ink-invert")
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    }
  });

  test("技术文章列表与详情可达", async ({ page }) => {
    await page.goto("./zh-Hans/blog/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("技术");
    await page.getByRole("link", { name: "欢迎来到 vv" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("欢迎来到 vv");
  });

  test("长文有目录、阅读进度、听读与系列导航", async ({ page }) => {
    await page.goto("./zh-Hans/blog/welcome/");
    const toc = page.getByRole("navigation", { name: "本页目录" });
    await expect(toc).toBeVisible();
    await expect(toc.getByRole("link", { name: "这是什么站" })).toBeVisible();
    await expect(page.getByRole("progressbar", { name: "阅读进度" })).toBeVisible();
    await expect(page.getByRole("button", { name: "朗读" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "系列" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "修订时间线" })).toBeVisible();
    const related = page.getByRole("region", { name: "相关文章" });
    await expect(related).toBeVisible();
    await expect(related.getByRole("link", { name: /用 Vite\+ 管住个人站工具链/ })).toBeVisible();
    await expect(page.locator(".callout")).toBeVisible();
    // 缺 Giscus env 时不渲染评论区（优雅降级）
    await expect(page.locator(".giscus")).toHaveCount(0);
  });

  test("生活区、今夕何夕与实验室可达", async ({ page }) => {
    await page.goto("./zh-Hans/life/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("生活");
    await page.goto("./zh-Hans/on-this-day/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("今夕何夕");
    await page.goto("./zh-Hans/lab/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("仓库仪表盘");
  });

  test("归档页含写作热力图", async ({ page }) => {
    await page.goto("./zh-Hans/archive/");
    await expect(page.getByRole("heading", { name: "写作热力图" })).toBeVisible();
  });

  test("RSS 可获取", async ({ request }) => {
    const res = await request.get("./zh-Hans/rss.xml");
    expect(res.ok()).toBeTruthy();
    const text = await res.text();
    expect(text).toContain("<rss");
    expect(text).toContain("欢迎来到 vv");
  });

  test("PWA manifest 可达且 scope 指向 /blog/", async ({ request }) => {
    const res = await request.get("./manifest.webmanifest");
    expect(res.ok()).toBeTruthy();
    const manifest = await res.json();
    expect(manifest.start_url).toContain("/blog");
    expect(manifest.scope).toContain("/blog");
  });

  test("OG 自动图可访问", async ({ request }) => {
    const res = await request.get("./og/home.png");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"]).toMatch(/image\/png/);
  });
});
