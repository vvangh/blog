<script setup lang="ts">
/**
 * 最小 Vue 岛：验证 @astrojs/vue + Vue 3.5 客户端水合可用。
 * 业务交互岛请另建目录，经各自 barrel 导出。
 */
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button
    type="button"
    class="rounded border border-current px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
    @click="count += 1"
  >
    Vue 岛已就绪（点击 {{ count }}）
  </button>
</template>
