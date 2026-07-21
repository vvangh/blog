/**
 * 友链数据模型（静态配置，后续可改为 Content Collection）。
 * 目录外请经 `@/lib/friends` 导入。
 */

export type FriendLink = {
  name: string;
  url: string;
  description?: string;
  avatar?: string;
};

export const FRIENDS: FriendLink[] = [
  {
    name: "Astro",
    url: "https://astro.build/",
    description: "站点框架",
  },
  {
    name: "Vite+",
    url: "https://viteplus.dev/",
    description: "工具链",
  },
];
