# AI 协作说明

## 项目是什么

这是一个给个人使用的 VitePress 博客模板。用户可能不熟悉代码，优先用简单中文解释修改内容和操作步骤。开始工作前阅读本文件和根目录的 README.md。

## 修改原则

- 只在当前模板项目中工作，不要修改其他项目或从其他项目搬运个人资料。
- 默认保留已有页面布局、首页汉堡动画、漂浮表情背景、导航和功能。
- 用户只要求换文字、资料、文章或图片时，优先编辑 Markdown 或 `docs/.vitepress/userConfig/` 中的数据文件，不要重写 Vue 页面。
- 不要编造姓名、经历、项目、友链、社交链接或文章内容。缺少资料时保留清楚的占位内容，或向用户询问。
- 修改图片时检查文件路径和扩展名与引用一致。图标路径配置在 `docs/.vitepress/config.mjs`。
- 文章使用 Markdown；新文章通常放在 `docs/src/Notes/<分类>/`，包含 `title` 和 `updateTime` frontmatter。
- 新增文章分类时检查分类入口 `docs/src/Notes/index.md` 和名称映射 `docs/.vitepress/userConfig/translations.ts`。
- 不要把生成目录、缓存或依赖目录当作源码修改：例如 `docs/.vitepress/dist/`、`docs/.vitepress/cache/` 和 `node_modules/`。

## 常用文件

- `docs/.vitepress/userConfig/siteInfo.ts`：博客名称、网站地址、简介和 GitHub 链接。
- `docs/.vitepress/userConfig/profileInfo.ts`：首页介绍和关于我页面资料。
- `docs/.vitepress/userConfig/friendsInfo.ts`：友链数据。
- `docs/.vitepress/userConfig/projectsInfo.ts`：项目卡片数据。
- `docs/.vitepress/userConfig/translations.ts`：文章分类名称。
- `docs/src/Notes/`：文章、分类首页和文章归档入口。
- `docs/src/public/`：头像、站点标志、浏览器图标和其他图片。
- `docs/.vitepress/views/`、`docs/.vitepress/components/`：页面和组件实现；仅在用户要求改变交互或设计时修改。

## 修改后

- 对代码或配置的改动，在依赖已安装时运行 `pnpm docs:build` 检查构建。
- 对纯文字修改，说明改动了哪些文件；如果用户需要预览，告知运行 `pnpm docs:dev`。
- 如果构建失败，先根据错误尝试修复；最终用中文说明结果和仍需用户提供的信息。
