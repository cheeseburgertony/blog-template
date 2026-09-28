# VitePress Blog Template

一个基于 VitePress 的个人博客模板，包含文章归档、自动侧边栏、关于页、项目页和友链页。模板保留原博客的页面布局和导航结构，附带两篇示例文章；个人资料、友链和项目数据使用占位内容，不包含原博客文章或个人工作文档。

## 开始使用

```sh
pnpm install
pnpm docs:dev
```

常用命令：

```sh
pnpm docs:build
pnpm docs:preview
```

## 个性化设置

1. 修改 `docs/.vitepress/userConfig/siteInfo.ts` 中的站点名称、域名和 GitHub 链接，并按需调整 `docs/src/public/title.svg`。
2. 修改 `docs/.vitepress/userConfig/profileInfo.ts` 中的简介、头像、兴趣和经历；技术栈图标可在 `docs/.vitepress/views/AboutMe.vue` 中调整。
3. 在 `friendsInfo.ts` 和 `projectsInfo.ts` 中添加友链和项目。
4. 在 `docs/src/Notes/` 下添加 Markdown 文章；目录名会生成路由和侧边栏，分类名称可在 `translations.ts` 中自定义。
5. 将站点图标、头像和项目图片放到 `docs/src/public/`，并在对应配置中引用。

## 功能

- 新增文章时自动生成路由和侧边栏
- 本地全文搜索、数学公式和文章目录
- 文章归档、友链和项目展示页
- 链接卡片组件与打印样式
- Vercel Analytics 和 Speed Insights

## 来源

本项目基于 [ZbWeR 的博客](https://github.com/ZbWeR) 改造，感谢原作者的开源分享。
