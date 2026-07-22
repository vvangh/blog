<script setup lang="ts">
/**
 * 首次进站 Splash：品牌字标入场；可跳过；prefers-reduced-motion 时立即结束。
 * 关闭后把 html[data-splash]=done，让首页 Hero 错落入场在可见时再播。
 * vue API 由 unplugin-auto-import 注入。
 */
import { SPLASH_STORAGE_KEY } from "@/lib/splash";

defineProps<{
  brand: string;
  skipLabel: string;
  tagline?: string;
}>();

const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function hideStaticCover() {
  document.querySelector<HTMLElement>("[data-splash-cover]")?.setAttribute("hidden", "");
}

function markSplashDone() {
  document.documentElement.dataset.splash = "done";
  hideStaticCover();
}

function dismiss() {
  visible.value = false;
  markSplashDone();
  try {
    sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
  if (timer) clearTimeout(timer);
}

onMounted(() => {
  try {
    if (sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1") {
      markSplashDone();
      return;
    }
  } catch {
    /* ignore */
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    markSplashDone();
    return;
  }
  document.documentElement.dataset.splash = "pending";
  visible.value = true;
  // 等富交互层入 DOM 再收静态遮罩，避免中间露白
  void nextTick(() => hideStaticCover());
  timer = setTimeout(dismiss, 1500);
});
</script>

<template>
  <div
    v-if="visible"
    class="splash fixed inset-0 z-[100] flex flex-col items-center justify-center bg-hl-bg"
    role="dialog"
    aria-modal="true"
    :aria-label="brand"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        class="motion-safe-glow absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-hl-fg/10 blur-3xl"
      />
    </div>
    <p class="brand-mark motion-safe-rise relative text-6xl font-semibold text-hl-fg md:text-7xl">
      {{ brand }}
    </p>
    <p
      v-if="tagline"
      class="motion-safe-rise relative mt-6 max-w-xs text-center text-base text-hl-muted"
      style="animation-delay: 0.15s"
    >
      {{ tagline }}
    </p>
    <button
      type="button"
      class="absolute right-4 bottom-6 min-h-11 rounded-full px-4 text-sm text-hl-muted hover:text-hl-fg"
      @click="dismiss"
    >
      {{ skipLabel }}
    </button>
  </div>
</template>
