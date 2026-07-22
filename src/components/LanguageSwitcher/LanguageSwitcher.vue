<script setup lang="ts">
/**
 * 语言切换：复用 FilterableSelect；写入 localStorage 后跳转同路径其它语言前缀。
 */
import {
  FilterableSelect,
  type FilterableSelectOption,
} from "@/components/molecules/FilterableSelect";
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
  switchedTemplate: string;
  filterPlaceholder: string;
  filterEmpty: string;
}>();

const liveMessage = ref("");

const options = computed<FilterableSelectOption[]>(() =>
  LOCALES.map((code) => ({ value: code, label: LOCALE_LABELS[code] })),
);

function onSelect(next: string): void {
  const locale = next as Locale;
  if (locale === props.locale) return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  const { rest } = stripLocaleFromPath(window.location.pathname);
  const target = localePath(locale, rest);
  liveMessage.value = props.switchedTemplate.replace("{label}", LOCALE_LABELS[locale]);
  window.location.assign(target);
}

onMounted(() => {
  localStorage.setItem(LOCALE_STORAGE_KEY, props.locale);
});
</script>

<template>
  <section
    class="prefs-panel prefs-section prefs-section--spaced"
    aria-labelledby="lang-switcher-heading"
  >
    <h2 id="lang-switcher-heading" class="prefs-section__title">{{ heading }}</h2>
    <FilterableSelect
      class="mt-[0.85rem]"
      :model-value="locale"
      :options="options"
      :list-label="heading"
      :filter-placeholder="filterPlaceholder"
      :filter-empty="filterEmpty"
      @update:model-value="onSelect"
    />
    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
  </section>
</template>
