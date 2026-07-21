# 背景氛围层（BackgroundLayer）

配置驱动的全站背景图/视频层。默认**关闭**，无素材时不渲染，不影响正文可读性。

## 怎么用

1. 把素材放到 `public/bg/`（例如 `signal-1.webp`、`loop.webm`）。
2. 编辑 `src/lib/bg/config.ts` 里的 `BACKGROUND_CONFIG`：
   - `enabled: true`
   - 在 `items` 填入相对 `public/` 的路径（不要带 `/blog/` base 前缀）
3. 本地 `vp run dev` 预览；`prefers-reduced-motion: reduce` 时只显示首帧并停止轮播。

## 字段说明

| 字段           | 含义                                   | 例子                       |
| -------------- | -------------------------------------- | -------------------------- |
| `enabled`      | 总开关                                 | `false` 时完全不渲染       |
| `mode`         | `static` 只显示第一项；`carousel` 轮播 | `"carousel"`               |
| `order`        | `sequential` 顺序；`shuffle` 打乱      | `"shuffle"`                |
| `intervalMs`   | 轮播间隔（毫秒）                       | `12000`                    |
| `opacity`      | 叠层不透明度 0–1                       | `0.22`（偏氛围、不抢正文） |
| `items[].type` | `image` 或 `video`                     | `"image"`                  |
| `items[].src`  | `public/` 下路径                       | `"bg/signal-1.webp"`       |
| `items[].alt`  | 图片替代文本（装饰图可空）             | `""`                       |

## 最小示例

```ts
export const BACKGROUND_CONFIG: BgConfig = {
  enabled: true,
  mode: "carousel",
  order: "sequential",
  intervalMs: 12_000,
  opacity: 0.22,
  items: [
    { type: "image", src: "bg/signal-1.webp", alt: "" },
    { type: "video", src: "bg/signal-loop.webm" },
  ],
};
```

## 无障碍与性能

- 层带 `aria-hidden`，不进入读屏树。
- `pointer-events: none`，不挡点击。
- 视频须静音循环；大文件请自压到合理体积（建议 webp / 短 webm）。
- 与 Signal 主题的 CSS 光斑/网格叠在一起；素材对比过强时先降 `opacity`。

## 与路线图

对应 `docs/PRODUCT-ROADMAP.md` 的 `plug-bg`。配置入口在 `@/lib/bg`，组件为 `BackgroundLayer`。
