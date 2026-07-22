<script setup lang="ts">
/**
 * 顶栏滚动态：首页从透明渐变到悬浮玻璃；其它页保持悬浮玻璃。
 * 写入 --header-lift（0–1）供 CSS 插值。
 */
import { onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    /** 首页透明模式：顶部 lift=0，滚入内容后抬升 */
    transparent?: boolean;
  }>(),
  { transparent: false },
);

let header: HTMLElement | null = null;
let reduceMotion = false;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function sync() {
  if (!header) return;

  let lift = 1;
  if (props.transparent) {
    const hero = document.querySelector<HTMLElement>(".home-hero");
    const span = Math.max(160, (hero?.offsetHeight ?? window.innerHeight) * 0.45);
    lift = reduceMotion ? (window.scrollY > 24 ? 1 : 0) : clamp01(window.scrollY / span);
  }

  header.style.setProperty("--header-lift", String(lift));
  // 玻璃与实色字同步抬起：过早切换会在浅壁纸上出现「浅字/浅底」
  header.classList.toggle("has-glass-blur", lift > 0.28);
  header.classList.toggle("is-scrolled", lift > 0.55);
  header.dataset.scrolled = lift > 0.55 ? "true" : "false";
}

onMounted(() => {
  header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) return;
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  header.dataset.reduceMotion = reduceMotion ? "true" : "false";
  if (!props.transparent) {
    header.style.setProperty("--header-lift", "1");
    header.classList.add("has-glass-blur", "is-scrolled");
  }
  sync();
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", sync);
  window.removeEventListener("resize", sync);
});
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
