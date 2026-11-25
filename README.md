# Width 官网（新版 width.info）

静态网站，用 [Eleventy](https://www.11ty.dev/) 生成，推送到 GitHub 后自动部署到 GitHub Pages。中英双语：英文在根路径 `/`，中文在 `/zh/`。

- **主页面 + 子页面：** 首页、平台、6 个产品页、4 个行业方案、执法 / 高校合作、数据中心、个人地址体检、开发者、价格、关于、联系
- **文章（CMS）：** `/blog/`、`/zh/blog/`，分类、分页、RSS、相关文章
- **SEO：** 每页独立 title / description / canonical、中英 hreflang、sitemap.xml、robots.txt、Open Graph 分享卡片、结构化数据（公司、面包屑、文章、FAQ）

## 本地预览

需要 Node.js 18 以上。

```bash
npm install
npm run dev        # 打开 http://localhost:8080 ，改文件会自动刷新
npm run build      # 生成静态文件到 _site/
```

## 目录

```
src/
├── index.md, zh/index.md           首页（英 / 中）
├── platform.md, products/…         平台与产品页（中文在 zh/ 下同名文件）
├── solutions/…, partners/…         行业方案、合作
├── data.md, check.md, developers.md, pricing.md, about.md, contact.md
├── blog/posts/*.md                 英文文章
├── zh/blog/posts/*.md              中文文章
├── _data/
│   ├── site.js                     域名、联系方式、外链、表单地址
│   ├── nav.yml                     顶部导航和页脚链接
│   ├── i18n.yml                    按钮、标签等界面文字
│   └── boards.yml                  数据中心榜单数据
├── _includes/
│   ├── layouts/                    base（页头页脚 + SEO）、page（版块拼页）、post（文章）
│   ├── sections/                   页面版块，一个文件一种版块
│   ├── visuals/                    资金流图、结果卡、四档处置、代码块
│   └── partials/                   页头、页脚、结构化数据、文章卡片
├── assets/css/site.css             全站样式（唯一的样式文件）
├── assets/js/site.js               导航、标签页、表单预选
├── assets/uploads/blog/            文章图片
└── admin/                          文章后台（CMS）
```

## 给设计同学

1. **先改设计变量。** `src/assets/css/site.css` 最上面的 `:root` 里是颜色、字体、圆角、间距，改这里全站会跟着变。四档处置色（绿 / 黄 / 橙 / 红）只用于风险含义，不要拿来做装饰。
2. **每种版块一份样式。** CSS 按版块分段，搜索 `== 版块名` 定位，例如 `== hero`、`== problems`、`== cards`。对应的 HTML 在 `src/_includes/sections/<版块名>.njk`。
3. **页面由版块拼成。** 每个页面文件顶部的 `sections:` 列表从上到下就是页面结构。调整顺序、删一个版块，直接改这个列表即可，不用碰 HTML。
4. **主视觉。** 首页右侧的资金流图在 `src/_includes/visuals/flow.njk`（SVG），讲的是「按时间顺序追资金：顺序成立的路径计分、时间倒流的路径排除、交易所对手方豁免」。可以重画，但这三层意思建议保留，这是 DART 和别家最大的不同。
5. **图片。** 放进 `src/assets/img/`，页面里写 `/assets/img/文件名`。分享卡片默认图是 `og-default.png`（1200×630）。
6. 改完在本地 `npm run dev` 看效果，手机宽度也看一下。

### 版块字段

| 版块 `type` | 用途 | 主要字段 |
|---|---|---|
| `hero` | 页面头图 | eyebrow, title（可用 `<em>` 高亮）, lead, ctas, note, visual, stats, compact |
| `ledger` | 首页头图：文字居中，下面整幅宽的账本点阵（模拟筛查动画），再下面是数字条 | eyebrow, title, lead, ctas, note, stats |
| `stats` | 数字条 | items: value, unit, label |
| `audiences` | 按客户类型切换的标签页 | items: label, title, text, points, href, link |
| `problems` | 客户问题 → 怎么解决 → 证据 | items: problem, detail, solution, proof |
| `steps` | 编号流程 | items: label, title, text |
| `cards` | 卡片网格 | columns, items: tag, title, text, points, href, link |
| `split` | 左文右图 | eyebrow, title, text, points, ctas, visual, code, reverse |
| `cases` | 匿名案例 | items: tag, metric, metricLabel, title, text; note |
| `table` | 表格 | head, rows, note |
| `faq` | 常见问题（自动生成 FAQ 结构化数据） | items: q, a |
| `cta` | 行动号召 | title, text, points, ctas |
| `posts` | 最新文章 | limit, category |
| `news` | 新闻与亮点（三张卡片，没有图片时显示 16:9 占位框） | title, lead, placeholder（true 时显示“占位内容”提示）, items: image, imageAlt, tag, date, title, text, href |
| `showcase` | 一张大的产品示意图 + 一行三个要点 | title, lead, items: tag, title, text |
| `boards` | 数据榜单 | items: 榜单 key（见 boards.yml） |
| `form` | 联系表单 | title, text, points |
| `prose` | 一段正文 | body |

全站版式：大标题在左、说明在右，细线代替卡片边框，底部行动号召是一整条深蓝（带流动的点）。首页另外写了 `bodyClass: home-v2`：字更大。首页头图用 `ledger` 版块，它的脚本是 `assets/js/ledger.js`，需要从 cdnjs 加载 three.js r128（模板 `sections/ledger.njk` 里已经引入，只在用到这个版块的页面加载）。

所有版块都支持 `id`（锚点）和 `tone: alt`（换底色）。`visual` 可选 `flow`、`result`、`scores`、`code`、`image`。

## 发布文章

### 方式一：网页后台（推荐给不写代码的同事）

1. 打开 `https://<网站地址>/admin/`，用 GitHub 账号登录（需要仓库的写权限）。
2. 选「文章（中文）」或「Articles (English)」，点新建。
3. 填标题、网址短名（英文，例如 `usdt-freeze-weekly`）、摘要、日期、分类、封面图，写正文，保存发布。
4. 后台会直接提交到 GitHub，1–2 分钟后网站自动更新。勾选「草稿」的文章不会出现在网站上。

首次使用前，要确认 `src/admin/config.yml` 里的 `repo` 是实际仓库名（现在是 `npc7/width-site`）。后台用的是 [Sveltia CMS](https://github.com/sveltia/sveltia-cms)，登录时可以选「用 GitHub 令牌登录」，令牌在 GitHub → Settings → Developer settings → Personal access tokens 里生成（只需要这个仓库的 Contents 读写权限）。

### 方式二：直接加 Markdown 文件

在 `src/zh/blog/posts/`（中文）或 `src/blog/posts/`（英文）新建 `网址短名.md`：

```markdown
---
title: 文章标题
slug: usdt-freeze-weekly
description: 80–160 字的摘要，会显示在列表和搜索结果里
date: 2026-11-20
category: research        # research / product / regulation / incidents / guides
author: Width DART 团队
cover: /assets/uploads/blog/封面.webp
coverAlt: 封面图说明
tags: [KYT, 稳定币]
---

正文用 Markdown 写。
```

### 写文章前过一遍（对外口径）

1. **不点名竞品。** 写「另一款工具」。
2. **不点名客户。** 一律匿名，写客户名要先拿到书面同意。
3. **不给地址定性。** 不公开具体风险地址，地址用示意或截断写法。
4. **数字要能溯源。** 不确定的数字不写。
5. **免费口径：** 「接入 DART，免费用到 2028 年 12 月 31 日」。
6. **跳数：** 跳数可按需配置，默认流入 3 跳、流出 1 跳。不写「最多 5 跳」。
7. **FinCEN 9714 是命令，不是制裁。**
8. **不提内部问题。**

## 数据中心榜单

数据在 `src/_data/boards.yml`。现在是示例数据（`sample: true`，页面上会显示「示例数据 · 上线前替换」）。接入真实数据后把 `rows` 换掉，并把 `sample` 改成 `false`。以后可以写脚本定期从 DART 数据生成这个文件。

## 部署到 GitHub Pages

1. 把这个目录推到一个 GitHub 仓库。
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
3. 推送到 `main` 后会自动构建发布，地址是 `https://<组织名>.github.io/<仓库名>/`。

可选的仓库变量（Settings → Secrets and variables → Actions → Variables）：

| 变量 | 作用 |
|---|---|
| `SITE_URL` | 正式域名，例如 `https://width.info`，用于 canonical、sitemap、分享卡片 |
| `PATH_PREFIX` | 绑定自定义域名后填 `/` |
| `ALLOW_INDEX` | 正式上线时填 `true`。默认不让搜索引擎收录，避免预览站和正式站内容重复 |
| `FORM_ENDPOINT` | 联系表单提交地址（Formspree、飞书表单等）。不填时表单用邮件发到 sales@width.com |
| `GA_ID` | Google Analytics 4 测量 ID |

**正式切换到 width.info 前要注意：** 现在的控制台（`/login`）、产品手册（`/docs`）、API 文档（`/api-reference`）、交易所资金流向（`/exchange-flows`）、`llms.txt`、`openapi.json` 都在现有的 width.info 应用上，新站里是用完整网址链过去的。切域名前要先定好这些路径放在哪（比如新站放 `www`，应用放子域名，或者用反向代理按路径分流），否则这些链接会断。

## 上线前待办

- [ ] 数据中心三个榜单接入真实数据
- [ ] 联系表单接入提交服务（`FORM_ENDPOINT`）
- [x] `src/admin/config.yml` 填实际仓库名（npc7/width-site）
- [ ] 办公室地址（关于页）补全
- [ ] 产品截图：`src/assets/img/` 里有控制台截图，可以按需放进产品页（`visual: image`）
- [ ] 确认 width.info 域名和现有应用的路径方案
- [ ] 正式上线时设置 `SITE_URL`、`PATH_PREFIX`、`ALLOW_INDEX=true`，并在 Google Search Console 提交 sitemap
