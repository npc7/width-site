// Width 官网 · Eleventy 配置
// 页面都在 src/，英文在根路径，中文在 /zh/。内容写在每个页面的 front matter（sections），
// 版式在 src/_includes，样式在 src/assets/css/site.css。
import * as yaml from "js-yaml";
import markdownIt from "markdown-it";
import { HtmlBasePlugin } from "@11ty/eleventy";
import { readFileSync } from "node:fs";

const md = markdownIt({ html: true, linkify: true, typographer: false });

// 标题自动加锚点 id（文档页右侧「本页目录」和站内链接用）：中文保留原字，空格和标点换成连字符
const slugify = (s) =>
  String(s).trim().toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[\s　]+/g, "-")
    .replace(/[^\p{L}\p{N}\-_]+/gu, "")
    .replace(/-+/g, "-").replace(/^-|-$/g, "");
md.core.ruler.push("heading_ids", (state) => {
  const used = {};
  state.tokens.forEach((tok, i) => {
    if (tok.type !== "heading_open" || tok.attrGet("id")) return;
    const text = state.tokens[i + 1].children.map((c) => c.content).join("");
    let id = slugify(text) || "section";
    if (used[id]) id += "-" + ++used[id]; else used[id] = 1;
    tok.attrSet("id", id);
  });
});

const isProd = process.env.ELEVENTY_RUN_MODE === "build";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addWatchTarget("src/assets/");

  // ---------- 草稿：draft: true 的文章在正式构建里不输出 ----------
  eleventyConfig.addPreprocessor("drafts", "md", (data) => {
    if (data.draft && isProd) return false;
  });

  // ---------- 文章集合（中、英各一套） ----------
  const byDate = (a, b) => b.date - a.date;
  eleventyConfig.addCollection("posts_en", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").sort(byDate)
  );
  eleventyConfig.addCollection("posts_zh", (api) =>
    api.getFilteredByGlob("src/zh/blog/posts/*.md").sort(byDate)
  );

  // ---------- 文档中心（docs）：按 _data/docs.yml 的分组顺序，再按页面的 order 排 ----------
  const docsSort = (sections) => (a, b) => {
    const ia = sections.findIndex((x) => x.key === a.data.section);
    const ib = sections.findIndex((x) => x.key === b.data.section);
    return (ia - ib) || ((a.data.order || 99) - (b.data.order || 99));
  };
  eleventyConfig.addCollection("docs_en", (api) => {
    const sections = yaml.load(readFileSync("src/_data/docs.yml", "utf8")).sections;
    return api.getFilteredByGlob("src/docs/**/*.md").filter((p) => !p.data.isDocsHome).sort(docsSort(sections));
  });
  eleventyConfig.addCollection("docs_zh", (api) => {
    const sections = yaml.load(readFileSync("src/_data/docs.yml", "utf8")).sections;
    return api.getFilteredByGlob("src/zh/docs/**/*.md").filter((p) => !p.data.isDocsHome).sort(docsSort(sections));
  });
  // 纯文本（站内搜索索引用）
  eleventyConfig.addFilter("plain", (html, n = 4000) =>
    String(html || "").replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ")
      .replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim().slice(0, n));
  // h2 / h3 标题列表（搜索索引用）
  // 小标题和折叠问答的问题（<summary>）都进索引；问题没有锚点，跳到它前面最近的小标题
  eleventyConfig.addFilter("headings", (html) => {
    const out = []; let last = "";
    for (const m of String(html || "").matchAll(/<h[23][^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>|<summary>([\s\S]*?)<\/summary>/g)) {
      if (m[1]) { last = m[1]; out.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") }); }
      else out.push({ id: last, text: m[3].replace(/<[^>]+>/g, ""), q: 1 });
    }
    return out;
  });
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  // 文档的上一篇 / 下一篇
  eleventyConfig.addFilter("docNeighbors", (list, url) => {
    const i = (list || []).findIndex((d) => d.url === url);
    return i < 0 ? {} : { prev: list[i - 1] || null, next: list[i + 1] || null };
  });
  eleventyConfig.addFilter("findBy", (arr, key, val) => (arr || []).find((x) => x[key] === val));

  // ---------- 过滤器 ----------
  // Markdown：块级 / 行内
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdi", (s) => (s ? md.renderInline(String(s)) : ""));

  // 站内链接加语言前缀："/pricing/" | locale("zh") → "/zh/pricing/"
  eleventyConfig.addFilter("locale", (href, lang) => {
    if (!href || lang !== "zh") return href;
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    if (href.startsWith("/zh/") || href === "/zh") return href;
    return "/zh" + (href.startsWith("/") ? href : "/" + href);
  });

  // 另一种语言的对应页面；不存在时回到对方语言的首页
  eleventyConfig.addFilter("altUrl", (url, lang, all) => {
    const target = lang === "zh" ? url.replace(/^\/zh(\/|$)/, "/") : "/zh" + url;
    const exists = (all || []).some((p) => p.url === target);
    return exists ? target : lang === "zh" ? "/" : "/zh/";
  });
  eleventyConfig.addFilter("hasAlt", (url, lang, all) => {
    const target = lang === "zh" ? url.replace(/^\/zh(\/|$)/, "/") : "/zh" + url;
    return (all || []).some((p) => p.url === target);
  });

  // 双语字段：{en: "...", zh: "..."} | tr(lang)；普通字符串原样返回
  eleventyConfig.addFilter("tr", (v, lang) => {
    if (v && typeof v === "object" && !Array.isArray(v)) return v[lang] ?? v.en ?? "";
    return v;
  });

  eleventyConfig.addFilter("date", (d, lang = "en") => {
    const dt = d instanceof Date ? d : new Date(d);
    if (lang === "zh") return `${dt.getFullYear()} 年 ${dt.getMonth() + 1} 月 ${dt.getDate()} 日`;
    return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfcDate", (d) => new Date(d).toUTCString());

  // 阅读时长：中文按 400 字 / 分钟，英文按 220 词 / 分钟
  eleventyConfig.addFilter("readingTime", (html, lang) => {
    const text = String(html || "").replace(/<[^>]+>/g, " ");
    if (lang === "zh") {
      const n = (text.match(/[一-鿿]/g) || []).length;
      return Math.max(1, Math.round(n / 400));
    }
    const n = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(n / 220));
  });

  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("where", (arr, key, val) => (arr || []).filter((x) => x.data[key] === val));
  eleventyConfig.addFilter("exclude", (arr, url) => (arr || []).filter((x) => x.url !== url));
  eleventyConfig.addFilter("absolute", (path, base) => {
    if (!path) return base;
    if (/^https?:/.test(path)) return path;
    return base.replace(/\/$/, "") + path;
  });
  eleventyConfig.addFilter("striptags", (s) => String(s || "").replace(/<[^>]+>/g, ""));
  eleventyConfig.addFilter("excerpt", (html, n = 140) => {
    const t = String(html || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n) + "…" : t;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
