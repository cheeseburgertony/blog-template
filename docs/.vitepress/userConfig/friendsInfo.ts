export interface Friend {
  avatar?: string;
  name: string;
  link: string;
  title?: string;
  tag?: string;
  color?: string;
  isMe?: boolean;
}

export const friendsInfo: Friend[] = [
  {
    avatar: "/avatar.svg",
    name: "示例友链一",
    title: "这里填写朋友的网站简介。",
    tag: "开发者",
    link: "https://example.com/friend-one",
    color: "indigo",
  },
  {
    avatar: "/avatar.svg",
    name: "示例友链二",
    title: "分享想法、项目与学习记录的个人博客。",
    tag: "创作者",
    link: "https://example.com/friend-two",
    color: "teal",
  },
];
