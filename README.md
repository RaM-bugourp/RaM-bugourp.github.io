# ram-blog 维护指南

RaM's Blog — 纯静态博客，深色主题。基于 **单一真相源 + 构建管道 + 运行时动态统计** 架构。

## 快速开始

```bash
# 新增/修改文章后，重建数据（生成 js/posts.js + 校验报告）
py tools/build_posts.py

# 冒烟测试（页面引用完整性 + JS 语法 + 统计计算）
py tools/smoke_test.py

# 本地预览
py -m http.server 8787
# 打开 http://127.0.0.1:8787
```

## 架构

```
ram-blog/
├── index.html / archive.html / friends.html / about.html   # 页面壳（无业务数据）
├── posts/*.html              # 文章（唯一内容源，含元信息）
├── js/
│   ├── posts.js              # [自动生成] 文章元数据（勿手改）
│   ├── site.js               # 统一引擎：动态渲染 + 统计 + 标签云 + 友链
│   ├── data/friends.js       # 友链数据（手动维护）
│   └── toc.js                # 文章目录（LineSidebar）
├── tools/
│   ├── build_posts.py        # 扫描 posts/ → 生成 posts.js + 校验报告
│   └── smoke_test.py         # 集成冒烟测试
└── css/style.css
```

**核心原则：所有数字都不是写死的，而是运行时根据 `js/posts.js` 实时计算。**

## 新增一篇文章（只需 2 步）

1. 在 `posts/` 下新建 `postN.html`，套用现有文章页模板，包含：
   - `<div class="post-meta">📅 2026-08-13 · 🕒 5分钟阅读</div>`（时长会被自动实测覆盖，可不写）
   - `<div class="post-content">...</div>`
   - 结尾引用 `../js/posts.js`、`../js/data/friends.js`、`../js/site.js`
2. 运行 `py tools/build_posts.py`

> 之后**无需改任何页面**：首页列表、归档分组、文章数/标签数/字数/阅读时长、标签云、侧边栏统计全部自动更新。

## 自动计算的统计项

| 统计 | 来源 |
|------|------|
| 文章总数 | `posts.js` 中 type=post 且非重复的数量 |
| 标签数量 | 全部文章 tag + tags 去重 |
| 总字数 | 各文章正文中文字符 + 英文单词数之和 |
| 累计阅读 | 各文章实测阅读分钟之和（中文 350 字/分钟 + 英文 220 词/分钟） |
| 友情链接 | `js/data/friends.js` 数组长度 |
| 最新更新 | 最新文章日期 |
| 热门标签 | 标签使用频率 Top-10，字号按热度缩放 |

## 重复文章检测

`build_posts.py` 自动检测 **同日期 + 同标题** 的文章，字数多的保留为标准，其余标记 `duplicateOf`，自动从列表/统计中排除（例如 post9 是 post13 的重复，已被排除）。

## 友链维护

编辑 `js/data/friends.js`（name/url/desc/avatar/tags 数组）。友链页卡片、侧边栏「友情链接」数、申请信息全部自动同步。

## 已知现状（2026-08-13 优化后）

- 有效文章 11 篇（post9 与 post13 重复已自动排除）
- 文章页静态阅读时长（8~12 分钟）与实际字数不符，现全部以实测为准（1~6 分钟）
- 文章页 `<title>` 与 `<h1>` 不一致的（post4/6/7/9），列表以 `<h1>` 为准
- `3d.html` 是独立演示页（眼球追随效果），不进入任何统计
