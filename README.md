# 个人博客模板使用指南

这是一个基于 VitePress 的个人博客模板。页面布局和功能已经准备好，你可以先替换个人资料和示例内容，再慢慢调整样式。即使不熟悉代码，也可以把需求和资料告诉 AI，让它帮你修改。

> 请在 AI 工具中打开这个 `blog-template` 项目目录再开始操作。这个目录是独立模板；不要让 AI 修改旁边的其他项目。

## 先运行起来

需要安装 Node.js 和 pnpm。依赖只需安装一次：

```sh
pnpm install
```

启动本地预览：

```sh
pnpm docs:dev
```

终端会显示一个本地网址，复制到浏览器即可预览。修改文件后，浏览器通常会自动刷新。按 `Ctrl+C` 可以停止预览。

发布前可以先检查能否正常构建：

```sh
pnpm docs:build
```

如果看到错误，把终端里的完整报错复制给 AI，并让它在当前项目中修复。

## 先替换哪些内容

| 想修改的内容 | 文件位置 |
| --- | --- |
| 博客名称、简介、网址、GitHub | `docs/.vitepress/userConfig/siteInfo.ts` |
| 关于我页面和个人介绍卡片 | `docs/.vitepress/userConfig/profileInfo.ts` |
| 朋友链接 | `docs/.vitepress/userConfig/friendsInfo.ts` |
| 项目展示卡片 | `docs/.vitepress/userConfig/projectsInfo.ts` |
| 文章分类名称 | `docs/.vitepress/userConfig/translations.ts` |
| 首页、关于我、项目、友链等页面文字 | `docs/src/` 下对应的 Markdown 页面 |
| 博客文章 | `docs/src/Notes/` 下的 Markdown 文件 |
| 图片和图标 | `docs/src/public/` |

主页的站点名称和简介会读取 `siteInfo.ts`、`profileInfo.ts`。关于我页面的大部分文字也在 `profileInfo.ts`，通常只要改资料，不需要改页面代码。

### 替换头像、站点标志和浏览器图标

图片放在 `docs/src/public/`。当前导航栏标志使用 `logo.webp`，浏览器标签页图标使用 `favicon.webp`，个人头像默认使用 `avatar.svg`。可以让 AI 用你的图片替换它们；如果改了文件名或扩展名，也要同步更新配置里的图片路径。

页面顶部的大标题背景图是 `title.svg`。要改首页汉堡动画或漂浮表情效果时，先明确告诉 AI 你要改的是哪一个；它们分别由首页组件和 `EmojiBackground` 组件控制。

## 添加一篇文章

在合适的分类文件夹里新建 Markdown 文件，例如：

`docs/src/Notes/Learning/我的新文章.md`

文章开头写上标题和更新时间：

```md
---
title: 我的新文章
updateTime: "2026-09-29 12:00"
---

# 我的新文章

从这里开始写正文。支持标题、列表、引用、代码和图片等 Markdown 格式。
```

保存后，文章会生成对应页面，并自动出现在文章侧边栏和归档中。现有分类是“学习笔记”和“随想杂文”。如果要新增分类，需要同时新增分类文件夹、更新 `translations.ts`，并调整 `docs/src/Notes/index.md` 的分类入口；可以直接让 AI 一起处理。

文章图片可以放在 `docs/src/public/`，正文中用 `![图片说明](/图片文件名.webp)` 引用。

## 用 AI 修改：可以直接复制这段话

把下面这段发给你使用的 AI，再补上自己的资料：

```text
请先阅读当前项目根目录的 README.md 和 AGENTS.md。这里是一个给个人使用的 VitePress 博客模板，我不熟悉代码，请用中文和我沟通。

请只修改当前 blog-template 项目，不要改动其他项目。默认保留现有页面布局、汉堡动画、背景表情、导航和功能；除非我明确提出，否则只替换文字、个人资料、文章或图片，不要重做页面。

我的需求是：[写你想修改什么]
我的资料是：[粘贴姓名、简介、链接、文章内容或图片说明]

完成后请告诉我改了哪些文件、我该如何预览。如果你改动了代码或配置，请运行 pnpm docs:build；如果失败，请先尝试修复并说明结果。不要替我编造个人经历、项目、链接或文章事实。
```

常见需求也可以直接说：

- “把博客名称改成……，GitHub 地址是……”
- “根据下面的资料填写关于我页面，不要编造资料，也不要改变页面布局。”
- “帮我把下面这篇文章整理成 Markdown，放进学习笔记分类。”
- “我想换头像，这是图片。请替换头像并确认引用路径正确。”
- “这个终端报错是什么意思？请在当前项目中修复，并告诉我怎么确认修好了。”

## 项目目录速查

- `docs/src/`：网站页面和文章内容。
- `docs/.vitepress/userConfig/`：个人资料、站点信息、项目和友链数据。
- `docs/.vitepress/views/`、`components/`：页面结构和可复用组件。需要调整页面外观时再改这里。
- `docs/.vitepress/config.mjs`：站点导航、图标路径和 VitePress 设置。
- `docs/src/public/`：网站图片等静态资源。

添加文章和替换资料时，优先改 Markdown 或 `userConfig` 中的数据文件；不确定某个文件用途时，先让 AI 解释再修改。

## 项目功能

- 文章路由和侧边栏自动生成
- 本地全文搜索、数学公式和文章目录
- 文章归档、关于我、友链和项目展示页
- 链接卡片组件与打印样式
