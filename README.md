# ram-blog 维护指南

RaM's Blog 是一个纯静态博客：深色网格背景、半透明卡片、暖色强调。页面不写死文章列表和统计，所有动态内容都来自 `js/posts.js`。

## 快速开始

```bash
npm run build
npm test
npm run serve
```

打开 `http://127.0.0.1:8787` 预览。

## GitHub Pages 部署

仓库根目录就是静态站点根目录。提交并 push 以下内容即可直接在 GitHub Pages 使用：

- `index.html`、`archive.html`、`friends.html`、`about.html`
- `posts/`、`css/`、`js/`、`images/`
- 已生成的 `js/posts.js`

发布前运行：

```bash
npm run check
```

GitHub Pages 不会自动运行构建脚本，所以新增或删除文章后必须先在本地运行 `npm run build`，把生成后的 `js/posts.js` 一起提交。

## 日常流程

1. 在 `posts/` 下新增或修改 `postN.html`。
2. 运行 `npm run build`，自动扫描文章并生成：
   - `js/posts.js`
   - `_build_report.txt`
3. 运行 `npm test`，检查页面引用、JS 语法、文章统计和基础数据。
4. 运行 `npm run serve` 本地预览。

也可以直接运行：

```bash
npm run check
```

## 自动化规则

`tools/build.mjs` 会自动提取：

| 数据 | 来源 |
| --- | --- |
| 标题 | 优先 `<h1>`，其次 `<title>` |
| 日期 | 页面里的 `YYYY-MM-DD` |
| 标签 | `.post-tag` 和文章页底部 hashtag |
| 摘要 | 正文第一段 |
| 字数 | 中文字符 + 英文/数字单词 |
| 阅读时长 | 中文约 350 字/分钟，英文约 220 词/分钟 |
| 重复文章 | 同日期 + 同标题，保留字数最多的一篇 |

重复文章会标记 `duplicateOf`，不会进入首页、归档、统计和标签云。

## 当前结构

```text
ram-blog/
├─ index.html / archive.html / friends.html / about.html
├─ posts/*.html
├─ css/style.css
├─ js/
│  ├─ site.js
│  ├─ posts.js
│  ├─ toc.js
│  └─ data/friends.js
├─ tools/
│  ├─ build.mjs
│  ├─ smoke.mjs
│  ├─ serve.mjs
│  ├─ build_posts.py
│  └─ smoke_test.py
└─ _build_report.txt
```

## 友链维护

编辑 `js/data/friends.js` 的 `window.FRIENDS` 数组即可。友链页卡片、站点统计会自动同步。

## 旧脚本

`tools/build_posts.py` 和 `tools/smoke_test.py` 暂时保留作兼容备份。当前推荐使用 Node 版脚本，因为本项目不再要求本机安装 Python。
