/**
 * E2E 共享操作：主导航「更多」、设置抽屉。
 * 桌面端次要入口在 details 里；主题控件在右下角设置面板内。
 */
import type { Locator, Page } from "@playwright/test";

/** 桌面主导航（DOM 中第一个；窄屏副本 aria-label 相同但通常隐藏） */
export function mainNav(page: Page): Locator {
  return page.getByRole("navigation", { name: "主导航" }).first();
}

/** 若存在桌面「更多」菜单则展开，再点目标链接 */
export async function clickMoreNavLink(page: Page, linkName: string | RegExp): Promise<void> {
  const nav = mainNav(page);
  const details = nav.locator("details.site-header__more");
  // 精细指针下 pointerenter 已会 open；再点 summary 会 toggle 关掉
  if (await details.isVisible()) {
    await details.evaluate((el: HTMLDetailsElement) => {
      el.open = true;
    });
    const link = details.getByRole("link", { name: linkName });
    await link.waitFor({ state: "visible" });
    await link.click();
    return;
  }
  await nav.getByRole("link", { name: linkName }).click();
}

/** 打开右下角设置抽屉，等待对话框出现 */
export async function openPrefsPanel(page: Page): Promise<void> {
  const prefsBtn = page.getByRole("button", { name: "打开设置" });
  // 空闲可能已收到右侧：先悬停展开再点
  await prefsBtn.hover({ force: true });
  await prefsBtn.click();
  // 对话框名来自 about.prefs（简中为「设置」）
  await page.getByRole("dialog", { name: "设置" }).waitFor({ state: "visible" });
}
