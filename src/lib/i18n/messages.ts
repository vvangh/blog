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
  | "splash.brand"
  | "toc.title"
  | "progress.label"
  | "comments.title";

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
  "toc.title": "本页目录",
  "progress.label": "阅读进度",
  "comments.title": "评论",
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
  "toc.title": "本頁目錄",
  "progress.label": "閱讀進度",
  "comments.title": "留言",
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
  "toc.title": "On this page",
  "progress.label": "Reading progress",
  "comments.title": "Comments",
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
  "toc.title": "Inhalt",
  "progress.label": "Lesefortschritt",
  "comments.title": "Kommentare",
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
  "toc.title": "目次",
  "progress.label": "読書進捗",
  "comments.title": "コメント",
};

const ko: Catalog = {
  ...zhHans,
  "nav.home": "홈",
  "nav.blog": "기술",
  "nav.build": "제로에서",
  "nav.life": "생활",
  "nav.fun": "취미",
  "nav.main": "주 탐색",
  "nav.about": "소개",
  "nav.archive": "아카이브",
  "nav.friends": "친구",
  "nav.tags": "태그",
  "skip.toMain": "본문으로 건너뛰기",
  "search.open": "검색 열기",
  "search.title": "사이트 검색",
  "search.placeholder": "글과 페이지 검색…",
  "search.empty": "결과 없음",
  "search.noIndex": "검색 인덱스가 없습니다 (vp run build)",
  "search.close": "닫기",
  "about.title": "소개",
  "archive.title": "아카이브",
  "friends.title": "친구 링크",
  "tags.title": "태그",
  "splash.skip": "건너뛰기",
  "splash.brand": "Henglu",
  "theme.heading": "모양",
  "lang.heading": "언어",
  "lang.switched": "{label}(으)로 전환됨",
  "toc.title": "목차",
  "progress.label": "읽기 진행률",
  "comments.title": "댓글",
};

const fr: Catalog = {
  ...zhHans,
  "nav.home": "Accueil",
  "nav.blog": "Tech",
  "nav.build": "De zéro",
  "nav.life": "Vie",
  "nav.fun": "Loisirs",
  "nav.main": "Navigation principale",
  "nav.about": "À propos",
  "nav.archive": "Archives",
  "nav.friends": "Amis",
  "nav.tags": "Tags",
  "skip.toMain": "Aller au contenu",
  "footer.rights": "© {year} Henglu · vvangh",
  "footer.license": "Code Apache-2.0 ; articles © l’auteur.",
  "home.intro":
    "Henglu est le site personnel de vvangh : notes tech, vie, un peu de fun—et un journal de construction ouvert.",
  "blog.title": "Tech",
  "build.title": "De zéro",
  "life.title": "Vie",
  "fun.title": "Loisirs",
  "search.open": "Ouvrir la recherche",
  "search.title": "Rechercher sur le site",
  "search.placeholder": "Rechercher articles et pages…",
  "search.empty": "Aucun résultat",
  "search.noIndex": "Index de recherche absent (lancez vp run build)",
  "search.close": "Fermer",
  "about.title": "À propos",
  "about.body":
    "Henglu est le site personnel de vvangh : notes tech, vie, un peu de fun—et un journal de construction ouvert.",
  "archive.title": "Archives",
  "archive.empty": "Rien de publié pour l’instant.",
  "friends.title": "Amis",
  "friends.empty": "Pas encore de liens.",
  "tags.title": "Tags",
  "tags.empty": "Pas encore de tags.",
  "splash.skip": "Passer",
  "splash.brand": "Henglu",
  "theme.heading": "Apparence",
  "theme.hint": "Clair, sombre, système, ou horaire personnalisé.",
  "lang.heading": "Langue",
  "lang.hint": "Choisissez la langue de l’interface ; nous la mémorisons.",
  "lang.switched": "Basculé vers {label}",
  "toc.title": "Sommaire",
  "progress.label": "Progression de lecture",
  "comments.title": "Commentaires",
};

const es: Catalog = {
  ...zhHans,
  "nav.home": "Inicio",
  "nav.blog": "Tech",
  "nav.build": "Desde cero",
  "nav.life": "Vida",
  "nav.fun": "Ocio",
  "nav.main": "Navegación principal",
  "nav.about": "Acerca de",
  "nav.archive": "Archivo",
  "nav.friends": "Amigos",
  "nav.tags": "Etiquetas",
  "skip.toMain": "Saltar al contenido",
  "footer.rights": "© {year} Henglu · vvangh",
  "footer.license": "Código Apache-2.0; artículos © el autor.",
  "home.intro":
    "Henglu es el sitio personal de vvangh: notas técnicas, vida, un poco de ocio—y un diario de construcción abierto.",
  "blog.title": "Tech",
  "build.title": "Desde cero",
  "life.title": "Vida",
  "fun.title": "Ocio",
  "search.open": "Abrir búsqueda",
  "search.title": "Buscar en el sitio",
  "search.placeholder": "Buscar artículos y páginas…",
  "search.empty": "Sin resultados",
  "search.noIndex": "Índice de búsqueda no listo (ejecuta vp run build)",
  "search.close": "Cerrar",
  "about.title": "Acerca de",
  "about.body":
    "Henglu es el sitio personal de vvangh: notas técnicas, vida, un poco de ocio—y un diario de construcción abierto.",
  "archive.title": "Archivo",
  "archive.empty": "Aún no hay publicaciones.",
  "friends.title": "Amigos",
  "friends.empty": "Aún no hay enlaces.",
  "tags.title": "Etiquetas",
  "tags.empty": "Aún no hay etiquetas.",
  "splash.skip": "Omitir",
  "splash.brand": "Henglu",
  "theme.heading": "Apariencia",
  "theme.hint": "Claro, oscuro, sistema o horario personalizado.",
  "lang.heading": "Idioma",
  "lang.hint": "Elige el idioma de la interfaz; lo recordaremos.",
  "lang.switched": "Cambiado a {label}",
  "toc.title": "Contenido",
  "progress.label": "Progreso de lectura",
  "comments.title": "Comentarios",
};

const ru: Catalog = {
  ...zhHans,
  "nav.home": "Главная",
  "nav.blog": "Техника",
  "nav.build": "С нуля",
  "nav.life": "Жизнь",
  "nav.fun": "Досуг",
  "nav.main": "Основная навигация",
  "nav.about": "О сайте",
  "nav.archive": "Архив",
  "nav.friends": "Друзья",
  "nav.tags": "Теги",
  "skip.toMain": "К основному содержимому",
  "footer.rights": "© {year} Henglu · vvangh",
  "footer.license": "Код Apache-2.0; статьи © автор.",
  "home.intro":
    "Henglu — личный сайт vvangh: техника, жизнь, немного досуга и открытый дневник сборки.",
  "blog.title": "Техника",
  "build.title": "С нуля",
  "life.title": "Жизнь",
  "fun.title": "Досуг",
  "search.open": "Открыть поиск",
  "search.title": "Поиск по сайту",
  "search.placeholder": "Искать статьи и страницы…",
  "search.empty": "Нет совпадений",
  "search.noIndex": "Индекс поиска не готов (сначала vp run build)",
  "search.close": "Закрыть",
  "about.title": "О сайте",
  "about.body":
    "Henglu — личный сайт vvangh: техника, жизнь, немного досуга и открытый дневник сборки.",
  "archive.title": "Архив",
  "archive.empty": "Пока нет публикаций.",
  "friends.title": "Друзья",
  "friends.empty": "Пока нет ссылок.",
  "tags.title": "Теги",
  "tags.empty": "Пока нет тегов.",
  "splash.skip": "Пропустить",
  "splash.brand": "Henglu",
  "theme.heading": "Оформление",
  "theme.hint": "Светлая, тёмная, системная или своё расписание.",
  "lang.heading": "Язык",
  "lang.hint": "Выберите язык интерфейса; мы запомним выбор.",
  "lang.switched": "Переключено на {label}",
  "toc.title": "Содержание",
  "progress.label": "Прогресс чтения",
  "comments.title": "Комментарии",
};

export const MESSAGES: Record<Locale, Catalog> = {
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  en,
  de,
  ja,
  ko,
  fr,
  es,
  ru,
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
  const text = catalog[key] || MESSAGES["zh-Hans"][key];
  return formatMessage(text, params);
}
