import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { getSidebar } from "./utils/getSidebar";
import { visualizer } from "rollup-plugin-visualizer";
import { siteInfo } from "./userConfig/siteInfo";
export default defineConfig({
  title: siteInfo.title,
  titleTemplate: siteInfo.name,
  // md 文件根目录
  srcDir: "./src",
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: siteInfo.url,
  },
  description: siteInfo.description,
  head: [
    ["link", { rel: "icon", href: "/favicon.webp" }],
    // DNS 预解析和预连接优化
    [
      "link",
      { rel: "dns-prefetch", href: "https://vitals.vercel-insights.com" },
    ],
    ["link", { rel: "preconnect", href: "https://vitals.vercel-insights.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    // 视口和渲染优化
    ["meta", { name: "renderer", content: "webkit" }],
    ["meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  ],
  themeConfig: {
    logo: "/logo.webp",
    // 顶部导航栏
    nav: [
      { text: "👋 About", link: "/AboutMe" },
      { text: "💭 Blogs", link: "/Notes/index" },
      { text: "🦄 Projects", link: "/Projects" },
      { text: "👫 Friends", link: "/Friends" },
    ],
    // 文章页面左侧导航
    sidebar: {
      "/Notes/": getSidebar("/docs/src", "/Notes/"),
    },
    // 是否启动搜索功能
    search: {
      provider: "local",
    },
    // 顶部导航栏左侧的社交平台跳转
    socialLinks: siteInfo.githubUrl
      ? [{ icon: "github", link: siteInfo.githubUrl }]
      : [],
    // 首页底部版权声明
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} ${siteInfo.name}`,
    },
    // 文章内导航栏标题
    outlineTitle: "导航栏",
  },
  vite: {
    plugins: [
      process.env.ANALYZE &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "./.vitepress/stats.html",
        }),
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocFooterLastUpdated\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/UpdateTime.vue", import.meta.url),
          ),
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/Footer.vue", import.meta.url),
          ),
        },
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 可以添加其他非 external 的大型依赖
          },
        },
      },
    },
  },
  markdown: {
    math: true,
    // 配置图片懒加载
    config: (md) => {
      // 为所有图片添加 loading="lazy" 属性
      const defaultImageRender = md.renderer.rules.image;
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        // 添加懒加载属性
        token.attrSet("loading", "lazy");
        // 添加解码异步属性
        token.attrSet("decoding", "async");
        return defaultImageRender(tokens, idx, options, env, self);
      };
    },
  },
});
