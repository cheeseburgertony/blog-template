interface Project {
  banner: string;
  title: string;
  description: string;
  link: string;
  tag?: string;
}

/** 将示例卡片替换成你的项目。 */
export const projectsInfo: Project[] = [
  {
    banner: "/project-img/sample-banner.svg",
    title: "示例项目一",
    description: "简单介绍项目解决的问题、主要功能和使用方式。",
    link: "https://example.com/project-one",
    tag: "TypeScript",
  },
  {
    banner: "/project-img/sample-banner.svg",
    title: "示例项目二",
    description: "补充项目使用的技术、实现的功能或取得的效果。",
    link: "https://example.com/project-two",
    tag: "Vue",
  },
  {
    banner: "/project-img/sample-banner.svg",
    title: "示例项目三",
    description: "用这张卡片介绍另一个作品或实验项目。",
    link: "https://example.com/project-three",
    tag: "JavaScript",
  },
];
