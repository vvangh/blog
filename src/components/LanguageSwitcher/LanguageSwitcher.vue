<script setup lang="ts">
/**
 * 语言切换岛：写入 localStorage 后跳转到同路径的其它语言前缀。
 */
import { onMounted, ref } from "vue";
import {
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  LOCALES,
  type Locale,
  stripLocaleFromPath,
  localePath,
} from "@/lib/i18n";

const props = defineProps<{
  locale: Locale;
  heading: string;
  hint: string;
  switchedTemplate: string;
}>();

const liveMessage = ref("");

function switchTo(next: Locale): void {
  if (next === props.locale) return;
  localStorage.setItem(LOCALE_STORAGE_KEY, next);
  const { rest } = stripLocaleFromPath(window.location.pathname);
  const target = localePath(next, rest);
  liveMessage.value = props.switchedTemplate.replace("{label}", LOCALE_LABELS[next]);
  window.location.assign(target);
}

onMounted(() => {
  // 同步偏好（已在 URL 上的语言为准）
  localStorage.setItem(LOCALE_STORAGE_KEY, props.locale);
});
</script>

<template>
  <section class="lang-switcher" aria-labelledby="lang-switcher-heading">
    <h2 id="lang-switcher-heading" class="lang-switcher__title">{{ heading }}</h2>
    <p class="lang-switcher__hint">{{ hint }}</p>
    <div class="lang-switcher__list" role="list">
      <button
        v-for="code in LOCALES"
        :key="code"
        type="button"
        role="listitem"
        class="lang-switcher__btn"
        :aria-current="code === locale ? 'true' : undefined"
        :disabled="code === locale"
        @click="switchTo(code)"
      >
        {{ LOCALE_LABELS[code] }}
      </button>
    </div>
    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
  </section>
</template>

<style scoped>
.lang-switcher {
  display: grid;
  gap: 0.75rem;
  max-width: 28rem;
  padding: 1rem;
  border: 1px solid color-mix(in oklab, var(--henglu-fg) 18%, transparent);
  border-radius: 0.5rem;
}

.lang-switcher__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.lang-switcher__hint {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.75;
}

.lang-switcher__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.lang-switcher__btn {
  min-height: 2.25rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid color-mix(in oklab, var(--henglu-fg) 22%, transparent);
  border-radius: 0.375rem;
  background: var(--henglu-bg);
  color: var(--henglu-fg);
  cursor: pointer;
  font: inherit;
}

.lang-switcher__btn[aria-current="true"],
.lang-switcher__btn:disabled {
  background: var(--henglu-accent-soft);
  color: var(--henglu-fg);
  border-color: var(--henglu-accent);
  cursor: default;
}

.lang-switcher__btn:focus-visible {
  outline: 2px solid var(--henglu-focus);
  outline-offset: 2px;
}
</style>
