<script setup lang="ts">
/**
 * 首页顶栏：顶部透明，滚动后磨砂实底（尊重 reduced-motion 时仍切换状态，仅无过渡）。
 */
import { onMounted, onUnmounted } from "vue";

const props = defineProps<{
  /** 与 SiteHeader 根节点 data-site-header 对应 */
  threshold?: number;
}>();

const threshold = props.threshold ?? 24;
let header: HTMLElement | null = null;
let reduceMotion = false;

function sync() {
  if (!header) return;
  const scrolled = window.scrollY > threshold;
  header.classList.toggle("is-scrolled", scrolled);
  header.dataset.scrolled = scrolled ? "true" : "false";
}

onMounted(() => {
  header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header || header.dataset.transparent !== "true") return;
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  header.dataset.reduceMotion = reduceMotion ? "true" : "false";
  sync();
  window.addEventListener("scroll", sync, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", sync);
});
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
