# 背景氛围层（BackgroundLayer）

配置驱动的图/视频背景：静态或轮播、顺序或乱序、手动切换，以及「仅首页 / 全站」。

当前默认：`scope: "home"` + `public/bg/wallpaper.png`（源自「哲风壁纸·动漫-卡通-比奇堡」）。非首页与首页滚过 Hero 后，回到主题底色。

## 怎么用

1. 把素材放到 `public/bg/`（例如 `wallpaper.png`、`loop.webm`）。
2. 编辑 `src/lib/bg/config.ts` 里的 `BACKGROUND_CONFIG`。
3. 本地 `vp run dev` 预览；`prefers-reduced-motion: reduce` 时停自动轮播，仍可手动切换。
4. 图太抢眼就降 `opacity`（首屏默认不加白色蒙层）。

## 字段说明

| 字段           | 含义                                       | 例子                 |
| -------------- | ------------------------------------------ | -------------------- |
| `enabled`      | 总开关                                     | `false` 时完全不渲染 |
| `scope`        | `home` 仅首页；`site` 全站页面             | `"home"`（默认）     |
| `mode`         | `static` 不自动切；`carousel` 按间隔自动切 | `"carousel"`         |
| `order`        | `sequential` 顺序；`shuffle` 打乱          | `"shuffle"`          |
| `intervalMs`   | 自动轮播间隔（毫秒）                       | `12000`              |
| `opacity`      | 媒体不透明度 0–1                           | `0.9`                |
| `manualSwitch` | 多项时显示上一张/下一张控件                | `true`               |
| `items[].type` | `image` 或 `video`                         | `"video"`            |
| `items[].src`  | `public/` 下路径（不要带 `/blog/` base）   | `"bg/loop.webm"`     |
| `items[].alt`  | 图片替代文本（装饰图可空）                 | `""`                 |

## 行为说明

- **仅首页**：`scope: "home"` 时只在首页挂载；滚出 Hero 区域后背景淡出，下方正文用正常 `--hl-bg`。
- **全站**：`scope: "site"` 时各页面都显示，且不随滚动淡出。
- **静态 + 手动**：`mode: "static"` 且 `manualSwitch: true` 时保留完整列表，只停自动切。
- **静态且无手动**：只显示第一项。
- **视频**：须静音循环；滚出首屏时会暂停以省资源。

## 最小示例（多图轮播 + 手动）

```ts
export const BACKGROUND_CONFIG: BgConfig = {
  enabled: true,
  scope: "home",
  mode: "carousel",
  order: "shuffle",
  intervalMs: 12_000,
  opacity: 0.9,
  manualSwitch: true,
  items: [
    { type: "image", src: "bg/wallpaper.png", alt: "" },
    { type: "video", src: "bg/loop.webm" },
  ],
};
```

## 叠层注意

- 背景层必须用 **非负** `z-index`（当前 `z-0`）。在 `body { isolation: isolate }` 下，负 z-index 会被 `html` 底色盖住。
- 正文包在 `.site-chrome.relative.z-10` 里。
- 琉璃控件类名：`glass-panel` / `glass-chip`（顶栏、频道卡、背景切换条等）。

## 无障碍与性能

- 媒体层带 `aria-hidden`；切换条有可访问名。
- 媒体 `pointer-events: none`；切换条可点。
- 大文件请自压到合理体积（建议 webp / 短 webm）。

## 与路线图

对应 `docs/PRODUCT-ROADMAP.md` 的 `plug-bg`。配置入口在 `@/lib/bg`，组件为 `BackgroundLayer`。
