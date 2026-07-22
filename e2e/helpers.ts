/**
 * E2E 共享操作：主导航「更多」、设置抽屉。
 * 桌面端次要入口在 details 里；主题控件在右下角设置面板内。
 */
import type { Locator, Page } from "@playwright/test";

/** 桌面主导航（DOM 中第一个；窄屏副本 aria-label 相同但通常隐藏） */
export function mainNav(page: Page): Locator {
  return page.getByRole("navigation", { name: "主导航" }).first();
}

/** 若存在可见的「更多」summary 则展开，再点目标链接 */
export async function clickMoreNavLink(page: Page, linkName: string | RegExp): Promise<void> {
  const nav = mainNav(page);
  const moreSummary = nav.locator("summary").filter({ hasText: "更多" });
  if (await moreSummary.isVisible()) {
    await moreSummary.click();
  }
  await nav.getByRole("link", { name: linkName }).click();
}

/** 打开右下角设置抽屉，等待主题单选出现 */
export async function openPrefsPanel(page: Page): Promise<void> {
  await page.getByRole("button", { name: "打开设置" }).click();
  await page.getByRole("dialog", { name: "站点偏好" }).waitFor({ state: "visible" });
}
