<script setup lang="ts">
/**
 * 首次进站 Splash：可跳过；prefers-reduced-motion 时立即结束。
 */
import { onMounted, ref } from "vue";

const props = defineProps<{
  brand: string;
  skipLabel: string;
}>();

const STORAGE_KEY = "henglu-splash-seen";
const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function dismiss() {
  visible.value = false;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
  if (timer) clearTimeout(timer);
}

onMounted(() => {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
  } catch {
    /* ignore */
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    // 尊重减动效：不播放启动页
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    return;
  }
  visible.value = true;
  timer = setTimeout(dismiss, 1600);
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
    <p
      class="motion-safe-rise font-display text-5xl font-semibold tracking-tight text-hl-fg md:text-6xl"
    >
      {{ brand }}
    </p>
    <p
      class="motion-safe-rise mt-3 font-mono text-xs tracking-[0.35em] text-hl-accent uppercase"
      style="animation-delay: 0.12s"
    >
      HENGLU · SIGNAL
    </p>
    <button
      type="button"
      class="absolute right-4 bottom-6 min-h-11 rounded-md px-4 text-sm text-hl-muted hover:text-hl-accent"
      @click="dismiss"
    >
      {{ skipLabel }}
    </button>
  </div>
</template>
