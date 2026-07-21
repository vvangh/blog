<script setup lang="ts">
/**
 * Ctrl/Cmd+K 全局搜索（Pagefind）。
 * 生产构建后索引位于 BASE_URL/pagefind/；开发态无索引时提示先 build。
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  openLabel: string;
  title: string;
  placeholder: string;
  empty: string;
  noIndex: string;
  closeLabel: string;
}>();

type SearchHit = {
  id: string;
  url: string;
  title: string;
  excerpt: string;
};

const open = ref(false);
const query = ref("");
const hits = ref<SearchHit[]>([]);
const loading = ref(false);
const ready = ref(false);
const unavailable = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const activeIndex = ref(0);

let pagefindApi: {
  init?: () => Promise<void>;
  search: (q: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        url: string;
        meta?: { title?: string };
        excerpt?: string;
      }>;
    }>;
  }>;
} | null = null;

const base = import.meta.env.BASE_URL;

async function ensurePagefind() {
  if (pagefindApi || unavailable.value) return;
  try {
    const mod = await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`);
    if (typeof mod.init === "function") {
      await mod.init();
    }
    pagefindApi = mod;
    ready.value = true;
  } catch {
    unavailable.value = true;
  }
}

async function runSearch(q: string) {
  const trimmed = q.trim();
  if (!trimmed) {
    hits.value = [];
    return;
  }
  await ensurePagefind();
  if (!pagefindApi) {
    hits.value = [];
    return;
  }
  loading.value = true;
  try {
    const res = await pagefindApi.search(trimmed);
    const top = res.results.slice(0, 8);
    const mapped: SearchHit[] = [];
    for (const r of top) {
      const data = await r.data();
      mapped.push({
        id: r.id,
        url: data.url,
        title: data.meta?.title ?? data.url,
        excerpt: data.excerpt ?? "",
      });
    }
    hits.value = mapped;
    activeIndex.value = 0;
  } finally {
    loading.value = false;
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | undefined;
watch(query, (q) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    void runSearch(q);
  }, 160);
});

async function openDialog() {
  open.value = true;
  await ensurePagefind();
  await nextTick();
  inputRef.value?.focus();
}

function closeDialog() {
  open.value = false;
  query.value = "";
  hits.value = [];
}

function onGlobalKey(e: KeyboardEvent) {
  const isK = e.key === "k" || e.key === "K";
  if (isK && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (open.value) closeDialog();
    else void openDialog();
    return;
  }
  if (e.key === "Escape" && open.value) {
    e.preventDefault();
    closeDialog();
  }
}

function onResultKey(e: KeyboardEvent) {
  if (!open.value || hits.value.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % hits.value.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value - 1 + hits.value.length) % hits.value.length;
  } else if (e.key === "Enter") {
    const hit = hits.value[activeIndex.value];
    if (hit) {
      window.location.assign(hit.url);
    }
  }
}

const statusText = computed(() => {
  if (unavailable.value) return props.noIndex;
  if (loading.value) return "…";
  if (query.value.trim() && hits.value.length === 0 && ready.value) return props.empty;
  return "";
});

onMounted(() => {
  window.addEventListener("keydown", onGlobalKey);
  window.addEventListener("keydown", onResultKey);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onGlobalKey);
  window.removeEventListener("keydown", onResultKey);
  clearTimeout(debounceTimer);
});

defineExpose({ openDialog });
</script>

<template>
  <div class="site-search">
    <button
      type="button"
      class="inline-flex min-h-10 items-center gap-2 rounded-full border border-hl-border bg-hl-panel/50 px-3 text-sm text-hl-muted transition hover:border-hl-accent hover:text-hl-accent"
      :aria-label="openLabel"
      @click="openDialog"
    >
      <span aria-hidden="true">⌕</span>
      <kbd class="hidden font-mono text-xs sm:inline">Ctrl K</kbd>
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
      role="presentation"
      @click.self="closeDialog"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        class="w-full max-w-lg overflow-hidden rounded-xl border border-hl-border bg-hl-panel shadow-xl"
      >
        <div class="flex items-center gap-2 border-b border-hl-border px-3 py-2">
          <label class="sr-only" for="site-search-input">{{ placeholder }}</label>
          <input
            id="site-search-input"
            ref="inputRef"
            v-model="query"
            type="search"
            class="min-h-11 w-full bg-transparent text-base text-hl-fg outline-none placeholder:text-hl-muted"
            :placeholder="placeholder"
            autocomplete="off"
            enterkeyhint="search"
          />
          <button
            type="button"
            class="shrink-0 rounded-md px-2 py-1 text-sm text-hl-muted hover:text-hl-fg"
            @click="closeDialog"
          >
            {{ closeLabel }}
          </button>
        </div>
        <p v-if="statusText" class="px-4 py-3 text-sm text-hl-muted" role="status">
          {{ statusText }}
        </p>
        <ul v-else-if="hits.length" class="max-h-[50vh] overflow-auto py-2" role="listbox">
          <li
            v-for="(hit, i) in hits"
            :key="hit.id"
            role="option"
            :aria-selected="i === activeIndex"
          >
            <a
              class="block px-4 py-3 no-underline transition"
              :class="
                i === activeIndex ? 'bg-hl-soft text-hl-accent' : 'text-hl-fg hover:bg-hl-soft/60'
              "
              :href="hit.url"
              @mouseenter="activeIndex = i"
            >
              <span class="block font-medium">{{ hit.title }}</span>
              <!-- eslint-disable-next-line vue/no-v-html -- Pagefind 提供带 <mark> 的摘要 -->
              <span class="mt-1 block text-sm text-hl-muted" v-html="hit.excerpt" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
