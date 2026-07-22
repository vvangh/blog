/**
 * 跨岛 chrome 状态（nanostores）。
 * 各 Vue 岛各自挂载，Pinia 不适配；用 atom + @nanostores/vue 共享。
 */
import { atom } from "nanostores";

/** 右下角「站点偏好」抽屉是否打开 */
export const prefsOpenStore = atom(false);

export function openPrefs(): void {
  prefsOpenStore.set(true);
}

export function closePrefs(): void {
  prefsOpenStore.set(false);
}

export function togglePrefs(): void {
  prefsOpenStore.set(!prefsOpenStore.get());
}
