<script setup lang="ts">
/**
 * 文内 TOC：侧栏跳章节，滚动时高亮当前标题。
 */
export type TocItem = {
  depth: number;
  slug: string;
  text: string;
};

const props = defineProps<{
  title: string;
  items: TocItem[];
}>();

const activeSlug = ref<string>("");
let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (props.items.length === 0) return;
  const nodes = props.items
    .map((item) => document.getElementById(item.slug))
    .filter((el): el is HTMLElement => Boolean(el));
  if (nodes.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
      const first = visible[0]?.target;
      if (first instanceof HTMLElement && first.id) {
        activeSlug.value = first.id;
      }
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: [0, 1] },
  );
  for (const node of nodes) observer.observe(node);
  activeSlug.value = props.items[0]?.slug ?? "";
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <nav v-if="items.length > 0" class="post-toc" :aria-label="title">
    <p class="mb-3 text-xs font-semibold tracking-wide text-hl-muted uppercase">{{ title }}</p>
    <ol class="m-0 list-none space-y-1.5 p-0 text-sm">
      <li v-for="item in items" :key="item.slug" :class="item.depth === 3 ? 'pl-3' : ''">
        <a
          class="block rounded-sm py-0.5 text-hl-muted no-underline transition-colors hover:text-hl-accent"
          :class="activeSlug === item.slug ? 'font-medium text-hl-accent' : ''"
          :href="`#${item.slug}`"
        >
          {{ item.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>
