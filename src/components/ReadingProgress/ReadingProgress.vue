<script setup lang="ts">
/**
 * 阅读进度条：跟踪 [data-reading-root] 区域内的滚动比例。
 */
import { onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
  }>(),
  { label: "阅读进度" },
);

const progress = ref(0);

function update() {
  const root = document.querySelector<HTMLElement>("[data-reading-root]");
  if (!root) {
    progress.value = 0;
    return;
  }
  const rect = root.getBoundingClientRect();
  const total = root.offsetHeight - window.innerHeight;
  if (total <= 0) {
    progress.value = rect.bottom <= window.innerHeight ? 100 : 0;
    return;
  }
  const scrolled = Math.min(Math.max(-rect.top, 0), total);
  progress.value = Math.round((scrolled / total) * 100);
}

onMounted(() => {
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", update);
  window.removeEventListener("resize", update);
});
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="progress"
    :aria-label="props.label"
  >
    <div
      class="h-full origin-left bg-hl-accent transition-[width] duration-100 ease-out"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
