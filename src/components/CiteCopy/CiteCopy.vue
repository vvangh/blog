<script setup lang="ts">
/**
 * 一键复制署名引用块。
 */
const props = defineProps<{
  label: string;
  copyLabel: string;
  copiedLabel: string;
  citation: string;
}>();

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.citation);
    copied.value = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    copied.value = false;
  }
}
</script>

<template>
  <section
    class="mt-8 rounded-lg border border-hl-border p-4"
    data-pagefind-ignore
    aria-labelledby="cite-heading"
  >
    <h2 id="cite-heading" class="m-0 text-sm font-semibold">{{ props.label }}</h2>
    <pre class="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-hl-muted">{{
      props.citation
    }}</pre>
    <button
      type="button"
      class="mt-3 inline-flex min-h-9 items-center rounded-md border border-hl-border px-3 text-sm font-medium text-hl-fg transition hover:border-hl-accent hover:text-hl-accent"
      @click="copy"
    >
      {{ copied ? props.copiedLabel : props.copyLabel }}
    </button>
  </section>
</template>
