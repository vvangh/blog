/**
 * 全局搜索：Ctrl/Cmd+K 打开对话框；构建后可检索文章。
 */
import { test, expect } from "@playwright/test";

test.describe("站点搜索", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("vv-splash-seen", "1");
    });
  });

  test("Ctrl+K 打开搜索对话框", async ({ page }) => {
    await page.goto("./zh-Hans/");
    // 等搜索岛挂载后再发快捷键，避免 listener 未绑定
    await expect(page.getByRole("button", { name: "打开搜索" })).toBeVisible();
    await page.keyboard.press("Control+KeyK");
    const dialog = page.getByRole("dialog", { name: "搜索站点" });
    await expect(dialog).toBeVisible();
    await expect(page.getByPlaceholder("搜索文章与页面…")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("可检索到已索引文章", async ({ page }) => {
    await page.goto("./zh-Hans/");
    await page.getByRole("button", { name: "打开搜索" }).click();
    const input = page.getByPlaceholder("搜索文章与页面…");
    await input.fill("Vite");
    // Pagefind 异步加载 + debounce
    await expect(page.getByRole("listbox")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("option").first()).toContainText(/Vite|工具链/);
  });
});
