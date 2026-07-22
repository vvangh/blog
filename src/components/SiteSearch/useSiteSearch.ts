/**
 * 站点搜索逻辑：Pagefind 优先，开发态目录兜底；快捷键与结果键盘导航。
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { filterDevCatalog, type DevSearchEntry } from "@/lib/search/filter";

export type SearchHit = {
  id: string;
  url: string;
  title: string;
  excerpt: string;
};

type PagefindApi = {
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
};

export function useSiteSearch(options: {
  empty: Ref<string> | string;
  noIndex: Ref<string> | string;
  devCatalog?: Ref<DevSearchEntry[] | undefined> | DevSearchEntry[];
}) {
  const open = ref(false);
  const query = ref("");
  const hits = ref<SearchHit[]>([]);
  const loading = ref(false);
  const ready = ref(false);
  const unavailable = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);
  const activeIndex = ref(0);

  let pagefindApi: PagefindApi | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  const base = import.meta.env.BASE_URL;

  const catalog = computed(() => {
    const raw = options.devCatalog;
    const list = raw && typeof raw === "object" && "value" in raw ? raw.value : raw;
    return list ?? [];
  });

  const hasDevCatalog = computed(() => catalog.value.length > 0);

  function labelOf(source: Ref<string> | string): string {
    return typeof source === "string" ? source : source.value;
  }

  function syncHeaderSearchState(isOpen: boolean) {
    document
      .querySelector<HTMLElement>("[data-site-header]")
      ?.classList.toggle("is-search-open", isOpen);
  }

  async function ensurePagefind() {
    if (pagefindApi || unavailable.value) return;
    try {
      const mod = (await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`)) as PagefindApi;
      if (typeof mod.init === "function") await mod.init();
      pagefindApi = mod;
      ready.value = true;
    } catch {
      if (!hasDevCatalog.value) unavailable.value = true;
      else ready.value = true;
    }
  }

  async function runSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) {
      hits.value = [];
      return;
    }
    await ensurePagefind();
    loading.value = true;
    try {
      if (pagefindApi) {
        const res = await pagefindApi.search(trimmed);
        const mapped: SearchHit[] = [];
        for (const r of res.results.slice(0, 8)) {
          const data = await r.data();
          mapped.push({
            id: r.id,
            url: data.url,
            title: data.meta?.title ?? data.url,
            excerpt: data.excerpt ?? "",
          });
        }
        hits.value = mapped;
      } else if (hasDevCatalog.value) {
        hits.value = filterDevCatalog(catalog.value, trimmed);
      } else {
        hits.value = [];
      }
      activeIndex.value = 0;
    } finally {
      loading.value = false;
    }
  }

  watch(query, (q) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      void runSearch(q);
    }, 160);
  });

  async function openDialog() {
    open.value = true;
    syncHeaderSearchState(true);
    await ensurePagefind();
    await nextTick();
    inputRef.value?.focus();
  }

  function closeDialog() {
    open.value = false;
    query.value = "";
    hits.value = [];
    syncHeaderSearchState(false);
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
      if (hit) window.location.assign(hit.url);
    }
  }

  const statusText = computed(() => {
    if (unavailable.value) return labelOf(options.noIndex);
    if (loading.value) return "…";
    if (query.value.trim() && hits.value.length === 0 && ready.value) return labelOf(options.empty);
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
    syncHeaderSearchState(false);
  });

  return {
    open,
    query,
    hits,
    loading,
    inputRef,
    activeIndex,
    statusText,
    openDialog,
    closeDialog,
  };
}
