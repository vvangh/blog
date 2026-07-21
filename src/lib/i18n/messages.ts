/**
 * UI 消息表：导航、页脚、分区说明等（正文译文可后续按文补）。
 * 目录外请经 `@/lib/i18n` 的 `t()` 使用，勿直接散落引用本文件。
 */
import type { Locale } from "./locales";

export type MessageKey =
  | "nav.home"
  | "nav.blog"
  | "nav.build"
  | "nav.life"
  | "nav.fun"
  | "nav.main"
  | "skip.toMain"
  | "footer.rights"
  | "footer.license"
  | "home.intro"
  | "blog.title"
  | "blog.empty"
  | "build.title"
  | "build.empty"
  | "life.title"
  | "life.empty"
  | "fun.title"
  | "fun.empty"
  | "theme.heading"
  | "theme.hint"
  | "lang.heading"
  | "lang.hint"
  | "lang.switched"
  | "nav.about"
  | "nav.archive"
  | "nav.friends"
  | "nav.tags"
  | "search.open"
  | "search.title"
  | "search.placeholder"
  | "search.empty"
  | "search.noIndex"
  | "search.close"
  | "about.title"
  | "about.body"
  | "archive.title"
  | "archive.empty"
  | "friends.title"
  | "friends.empty"
  | "tags.title"
  | "tags.empty"
  | "splash.skip"
  | "splash.brand";

type Catalog = Record<MessageKey, string>;

const zhHans: Catalog = {
  "nav.home": "首页",
  "nav.blog": "技术",
  "nav.build": "从零到一",
  "nav.life": "生活",
  "nav.fun": "趣味",
  "nav.main": "主导航",
  "skip.toMain": "跳到主要内容",
  "footer.rights": "© {year} 衡录 · vvangh",
  "footer.license": "代码 Apache-2.0；文章版权归作者。",
  "home.intro": "衡录是 vvangh 的个人站点：写技术、记生活、收藏一点娱乐；并从零公开搭建过程。",
  "blog.title": "技术",
  "blog.empty": "技术博客内容将在后续里程碑写入 Content Collection「blog」。",
  "build.title": "从零到一",
  "build.empty": "建站日志将写入 Content Collection「build-log」，并在此公开。",
  "life.title": "生活",
  "life.empty": "日记与影音等生活内容预留于此（集合 life）。",
  "fun.title": "趣味",
  "fun.empty": "娱乐嵌入与交互岛预留于此（集合 fun）。",
  "theme.heading": "外观",
  "theme.hint": "浅色、暗色、跟随系统，或按作息自定义时段。",
  "lang.heading": "语言",
  "lang.hint": "选择界面语言；下次访问会记住你的选择。",
  "lang.switched": "已切换为 {label}",
  "nav.about": "关于",
  "nav.archive": "归档",
  "nav.friends": "友链",
  "nav.tags": "标签",
  "search.open": "打开搜索",
  "search.title": "搜索站点",
  "search.placeholder": "搜索文章与页面…",
  "search.empty": "没有匹配结果",
  "search.noIndex": "搜索索引未就绪（请先 vp run build）",
  "search.close": "关闭",
  "about.title": "关于",
  "about.body": "衡录是 vvangh 的个人站点：写技术、记生活、收藏一点娱乐；并从零公开搭建过程。",
  "archive.title": "归档",
  "archive.empty": "暂无已发布内容。",
  "friends.title": "友链",
  "friends.empty": "暂无友链。",
  "tags.title": "标签",
  "tags.empty": "暂无标签。",
  "splash.skip": "跳过",
  "splash.brand": "衡录",
};

const zhHant: Catalog = {
  ...zhHans,
  "nav.home": "首頁",
  "nav.blog": "技術",
  "nav.build": "從零到一",
  "nav.life": "生活",
  "nav.fun": "趣味",
  "nav.main": "主導航",
  "skip.toMain": "跳到主要內容",
  "footer.rights": "© {year} 衡錄 · vvangh",
  "footer.license": "程式碼 Apache-2.0；文章版權歸作者。",
  "home.intro": "衡錄是 vvangh 的個人站點：寫技術、記生活、收藏一點娛樂；並從零公開搭建過程。",
  "blog.title": "技術",
  "blog.empty": "技術部落格內容將在後續里程碑寫入 Content Collection「blog」。",
  "build.title": "從零到一",
  "build.empty": "建站日誌將寫入 Content Collection「build-log」，並在此公開。",
  "life.title": "生活",
  "life.empty": "日記與影音等生活內容預留於此（集合 life）。",
  "fun.title": "趣味",
  "fun.empty": "娛樂嵌入與互動島預留於此（集合 fun）。",
  "theme.heading": "外觀",
  "theme.hint": "淺色、暗色、跟隨系統，或按作息自訂時段。",
  "lang.heading": "語言",
  "lang.hint": "選擇介面語言；下次造訪會記住你的選擇。",
  "lang.switched": "已切換為 {label}",
  "nav.about": "關於",
  "nav.archive": "歸檔",
  "nav.friends": "友鏈",
  "nav.tags": "標籤",
  "search.open": "開啟搜尋",
  "search.title": "搜尋站點",
  "search.placeholder": "搜尋文章與頁面…",
  "search.empty": "沒有符合的結果",
  "search.noIndex": "搜尋索引尚未就緒（請先 vp run build）",
  "search.close": "關閉",
  "about.title": "關於",
  "about.body": "衡錄是 vvangh 的個人站點：寫技術、記生活、收藏一點娛樂；並從零公開搭建過程。",
  "archive.title": "歸檔",
  "archive.empty": "暫無已發布內容。",
  "friends.title": "友鏈",
  "friends.empty": "暫無友鏈。",
  "tags.title": "標籤",
  "tags.empty": "暫無標籤。",
  "splash.skip": "跳過",
  "splash.brand": "衡錄",
};

const en: Catalog = {
  "nav.home": "Home",
  "nav.blog": "Tech",
  "nav.build": "From Zero",
  "nav.life": "Life",
  "nav.fun": "Fun",
  "nav.main": "Main navigation",
  "skip.toMain": "Skip to main content",
  "footer.rights": "© {year} Henglu · vvangh",
  "footer.license": "Code Apache-2.0; articles © the author.",
  "home.intro":
    "Henglu is vvangh’s personal site: tech notes, life logs, a bit of fun—and an open build diary from day one.",
  "blog.title": "Tech",
  "blog.empty": "Tech posts will land in the blog content collection in a later milestone.",
  "build.title": "From Zero",
  "build.empty": "Build-log entries will appear here from the build-log collection.",
  "life.title": "Life",
  "life.empty": "Diary and media will live here later (life collection).",
  "fun.title": "Fun",
  "fun.empty": "Entertainment embeds and islands will live here later (fun collection).",
  "theme.heading": "Appearance",
  "theme.hint": "Light, dark, system, or a custom schedule.",
  "lang.heading": "Language",
  "lang.hint": "Pick a UI language; we’ll remember it next time.",
  "lang.switched": "Switched to {label}",
  "nav.about": "About",
  "nav.archive": "Archive",
  "nav.friends": "Friends",
  "nav.tags": "Tags",
  "search.open": "Open search",
  "search.title": "Search the site",
  "search.placeholder": "Search posts and pages…",
  "search.empty": "No matches",
  "search.noIndex": "Search index not ready (run vp run build first)",
  "search.close": "Close",
  "about.title": "About",
  "about.body":
    "Henglu is vvangh’s personal site: tech notes, life logs, a bit of fun—and an open build diary.",
  "archive.title": "Archive",
  "archive.empty": "Nothing published yet.",
  "friends.title": "Friends",
  "friends.empty": "No friend links yet.",
  "tags.title": "Tags",
  "tags.empty": "No tags yet.",
  "splash.skip": "Skip",
  "splash.brand": "Henglu",
};

const de: Catalog = {
  "nav.home": "Start",
  "nav.blog": "Technik",
  "nav.build": "Von Null",
  "nav.life": "Leben",
  "nav.fun": "Spaß",
  "nav.main": "Hauptnavigation",
  "skip.toMain": "Zum Inhalt springen",
  "footer.rights": "© {year} Henglu · vvangh",
  "footer.license": "Code Apache-2.0; Texte © Autor.",
  "home.intro":
    "Henglu ist vvanghs persönliche Seite: Technik, Leben, etwas Unterhaltung—und ein offenes Baulogbuch.",
  "blog.title": "Technik",
  "blog.empty": "Technikbeiträge folgen in einem späteren Meilenstein.",
  "build.title": "Von Null",
  "build.empty": "Baulogbuch-Einträge erscheinen hier später.",
  "life.title": "Leben",
  "life.empty": "Tagebuch und Medien folgen später.",
  "fun.title": "Spaß",
  "fun.empty": "Unterhaltung folgt später.",
  "theme.heading": "Erscheinungsbild",
  "theme.hint": "Hell, dunkel, System oder eigener Zeitplan.",
  "lang.heading": "Sprache",
  "lang.hint": "UI-Sprache wählen; wir merken sie uns.",
  "lang.switched": "Gewechselt zu {label}",
  "nav.about": "Über",
  "nav.archive": "Archiv",
  "nav.friends": "Freunde",
  "nav.tags": "Tags",
  "search.open": "Suche öffnen",
  "search.title": "Website durchsuchen",
  "search.placeholder": "Beiträge und Seiten suchen…",
  "search.empty": "Keine Treffer",
  "search.noIndex": "Suchindex fehlt (zuerst vp run build)",
  "search.close": "Schließen",
  "about.title": "Über",
  "about.body":
    "Henglu ist vvanghs persönliche Seite: Technik, Leben, etwas Unterhaltung—und ein offenes Baulogbuch.",
  "archive.title": "Archiv",
  "archive.empty": "Noch keine Beiträge.",
  "friends.title": "Freunde",
  "friends.empty": "Noch keine Links.",
  "tags.title": "Tags",
  "tags.empty": "Noch keine Tags.",
  "splash.skip": "Überspringen",
  "splash.brand": "Henglu",
};

const ja: Catalog = {
  "nav.home": "ホーム",
  "nav.blog": "技術",
  "nav.build": "ゼロから",
  "nav.life": "生活",
  "nav.fun": "趣味",
  "nav.main": "メインナビ",
  "skip.toMain": "本文へスキップ",
  "footer.rights": "© {year} 衡録 · vvangh",
  "footer.license": "コードは Apache-2.0、文章の著作権は著者に帰属。",
  "home.intro":
    "衡録（Henglu）は vvangh の個人サイト。技術・生活・趣味を残し、構築過程も公開します。",
  "blog.title": "技術",
  "blog.empty": "技術記事は後のマイルストーンで blog コレクションに追加します。",
  "build.title": "ゼロから",
  "build.empty": "構築ログは build-log コレクションで公開します。",
  "life.title": "生活",
  "life.empty": "日記や映像は後で life コレクションに置きます。",
  "fun.title": "趣味",
  "fun.empty": "エンタメ埋め込みは後で fun コレクションに置きます。",
  "theme.heading": "外観",
  "theme.hint": "ライト／ダーク／システム／時間帯カスタム。",
  "lang.heading": "言語",
  "lang.hint": "UI 言語を選ぶと次回も覚えています。",
  "lang.switched": "{label} に切り替えました",
  "nav.about": "について",
  "nav.archive": "アーカイブ",
  "nav.friends": "友人",
  "nav.tags": "タグ",
  "search.open": "検索を開く",
  "search.title": "サイト内検索",
  "search.placeholder": "記事やページを検索…",
  "search.empty": "一致する結果がありません",
  "search.noIndex": "検索インデックス未準備（先に vp run build）",
  "search.close": "閉じる",
  "about.title": "について",
  "about.body":
    "衡録（Henglu）は vvangh の個人サイト。技術・生活・趣味を残し、構築過程も公開します。",
  "archive.title": "アーカイブ",
  "archive.empty": "公開記事はまだありません。",
  "friends.title": "友人リンク",
  "friends.empty": "まだリンクがありません。",
  "tags.title": "タグ",
  "tags.empty": "まだタグがありません。",
  "splash.skip": "スキップ",
  "splash.brand": "衡録",
};

export const MESSAGES: Record<Locale, Catalog> = {
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  en,
  de,
  ja,
};

/** 简单插值：`{year}` → params.year */
export function formatMessage(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in params ? String(params[key]) : `{${key}}`,
  );
}

export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  const catalog = MESSAGES[locale] ?? MESSAGES["zh-Hans"];
  return formatMessage(catalog[key] ?? MESSAGES["zh-Hans"][key], params);
}
