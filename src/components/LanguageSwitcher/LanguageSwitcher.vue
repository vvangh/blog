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
  localStorage.setItem(LOCALE_STORAGE_KEY, props.locale);
});
</script>

<template>
  <section class="prefs-panel grid w-full gap-3" aria-labelledby="lang-switcher-heading">
    <h2 id="lang-switcher-heading" class="m-0 text-lg font-semibold">{{ heading }}</h2>
    <p class="m-0 text-sm text-hl-muted">{{ hint }}</p>
    <div class="flex flex-wrap gap-2" role="list">
      <button
        v-for="code in LOCALES"
        :key="code"
        type="button"
        role="listitem"
        class="min-h-9 rounded-md border border-hl-border bg-hl-bg px-3 text-sm text-hl-fg transition enabled:cursor-pointer enabled:hover:border-hl-accent enabled:hover:text-hl-accent disabled:cursor-default disabled:border-hl-accent disabled:bg-hl-soft"
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
