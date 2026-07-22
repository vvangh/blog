<script setup lang="ts">
/**
 * 阅读密度 + 高对比设置岛。
 * vue API 由 unplugin-auto-import 注入，勿手写 import。
 */
import {
  applyA11yPreference,
  readA11yPreference,
  writeA11yPreference,
  type A11yPreference,
  type ReadingDensity,
} from "@/lib/a11y";

const props = defineProps<{
  densityHeading: string;
  densityHint: string;
  comfortableLabel: string;
  defaultLabel: string;
  contrastHeading: string;
  contrastOn: string;
  contrastOff: string;
}>();

const pref = ref<A11yPreference>(readA11yPreference());
const live = ref("");

function apply(): void {
  applyA11yPreference(pref.value);
  writeA11yPreference(pref.value);
  live.value = pref.value.highContrast
    ? props.contrastOn
    : `${props.densityHeading}: ${pref.value.density === "comfortable" ? props.comfortableLabel : props.defaultLabel}`;
}

function setDensity(value: ReadingDensity): void {
  pref.value = { ...pref.value, density: value };
}

function toggleContrast(): void {
  pref.value = { ...pref.value, highContrast: !pref.value.highContrast };
}

onMounted(() => {
  pref.value = readA11yPreference();
  apply();
});

watch(
  pref,
  () => {
    apply();
  },
  { deep: true },
);
</script>

<template>
  <div class="prefs-panel" aria-label="a11y">
    <section class="prefs-section" aria-labelledby="a11y-density-heading">
      <h2 id="a11y-density-heading" class="prefs-section__title">{{ props.densityHeading }}</h2>
      <p class="prefs-section__hint">{{ props.densityHint }}</p>
      <div class="prefs-chips" role="group" :aria-label="props.densityHeading">
        <button
          type="button"
          class="prefs-chip"
          :aria-pressed="pref.density === 'default'"
          @click="setDensity('default')"
        >
          {{ props.defaultLabel }}
        </button>
        <button
          type="button"
          class="prefs-chip"
          :aria-pressed="pref.density === 'comfortable'"
          @click="setDensity('comfortable')"
        >
          {{ props.comfortableLabel }}
        </button>
      </div>
    </section>

    <section class="prefs-section" aria-labelledby="a11y-contrast-heading">
      <h2 id="a11y-contrast-heading" class="prefs-section__title">{{ props.contrastHeading }}</h2>
      <button
        type="button"
        class="prefs-toggle"
        :aria-pressed="pref.highContrast"
        @click="toggleContrast"
      >
        <span class="text-sm font-medium">
          {{ pref.highContrast ? props.contrastOff : props.contrastOn }}
        </span>
        <span class="prefs-toggle__track" aria-hidden="true" />
      </button>
    </section>

    <p class="sr-only" aria-live="polite">{{ live }}</p>
  </div>
</template>
