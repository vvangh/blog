/**
 * 在 Vue 岛内订阅 prefs 抽屉开关（nanostores → Vue ref）。
 */
import { useStore } from "@nanostores/vue";
import { closePrefs, openPrefs, prefsOpenStore, togglePrefs } from "@/lib/stores";

export function usePrefsOpen() {
  const prefsOpen = useStore(prefsOpenStore);
  return {
    prefsOpen,
    openPrefs,
    closePrefs,
    togglePrefs,
  };
}
