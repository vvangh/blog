<script setup lang="ts">
/**
 * 阅读密度 + 高对比设置岛。
 */
import { onMounted, ref, watch } from "vue";
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
  <section
    class="grid max-w-md gap-4 rounded-xl border border-hl-border bg-hl-panel p-4"
    aria-label="a11y"
  >
    <div>
      <h2 class="m-0 text-lg font-semibold">{{ props.densityHeading }}</h2>
      <p class="mt-1 text-sm text-hl-muted">{{ props.densityHint }}</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          class="min-h-9 rounded-md border px-3 text-sm"
          :class="
            pref.density === 'default' ? 'border-hl-accent text-hl-accent' : 'border-hl-border'
          "
          :aria-pressed="pref.density === 'default'"
          @click="setDensity('default')"
        >
          {{ props.defaultLabel }}
        </button>
        <button
          type="button"
          class="min-h-9 rounded-md border px-3 text-sm"
          :class="
            pref.density === 'comfortable' ? 'border-hl-accent text-hl-accent' : 'border-hl-border'
          "
          :aria-pressed="pref.density === 'comfortable'"
          @click="setDensity('comfortable')"
        >
          {{ props.comfortableLabel }}
        </button>
      </div>
    </div>

    <div>
      <h2 class="m-0 text-lg font-semibold">{{ props.contrastHeading }}</h2>
      <button
        type="button"
        class="mt-3 min-h-9 rounded-md border border-hl-border px-3 text-sm"
        :aria-pressed="pref.highContrast"
        @click="toggleContrast"
      >
        {{ pref.highContrast ? props.contrastOff : props.contrastOn }}
      </button>
    </div>

    <p class="sr-only" aria-live="polite">{{ live }}</p>
  </section>
</template>
