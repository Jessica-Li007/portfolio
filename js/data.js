/* =========================================================
   data.js — 个人信息与项目数据（页面唯一的"内容源"）
   ---------------------------------------------------------
   ★ 内容来源：profile.md（真实资料），更新资料请同步修改本文件。
   ★ 新增项目：往 PROJECTS 数组里加一个对象，页面自动渲染，
     编号、目录、排版模板全部自动更新，无需改其他文件。
   ★ variant 可选值：
       "a" 特稿（通栏大图在左） / "b" 对开（竖图在右错位）
       "c" 紧凑（小图右移）     —— 不填则按顺序自动轮换
   ========================================================= */

/* ---------- 个人信息 ---------- */
const PROFILE = {
  name: "婕妤",
  nameEn: "JIEYU",
  role: "软件工程 · 前端开发 / 交互设计",
  /* 首屏一句话介绍 */
  intro: "软件工程专业大三学生，对前端开发与交互设计有浓厚兴趣。",
  /* 「关于我」导语 */
  aboutLead: "喜欢把想法落地成看得见、用得上的产品，也乐于在团队协作中沟通与分享。",
  /* 「关于我」正文段落（自动排成双栏） */
  aboutParas: [
    "我叫婕妤，是一名软件工程专业的大三学生，对前端开发与交互设计有浓厚兴趣。",
    "在校期间系统学习了编程基础与软件开发流程，并通过课程项目与个人实践不断打磨动手能力。",
  ],
  /* 技能方向（列表展示，非进度条） */
  skills: [
    "HTML/CSS",
    "JavaScript",
    "Vue",
    "Python",
    "Java",
    "MySQL",
    "Git/GitHub",
  ],
  /* 教育背景 */
  education: [
    { time: "大三 · 在读", text: "广州软件学院 · 软件工程专业" },
  ],
  /* 联系方式（link 留空则不生成链接） */
  contacts: [
    { label: "Email · 邮箱", value: "341003901@qq.com", link: "mailto:341003901@qq.com" },
    { label: "GitHub", value: "github.com/jieyu", link: "https://github.com/jieyu" },
    { label: "Location · 所在地", value: "中国 · 广州", link: "" },
  ],
};

/* ---------- 项目数据（共 4 个，内容与 profile.md 一致） ----------
   字段：name 项目名 / intro 简介 / stack 技术栈数组 / date 完成时间
        category 类别 / image 配图路径 / alt 图片描述 */
const PROJECTS = [
  {
    name: "校园二手交易平台",
    intro:
      "一款面向校内学生的二手物品发布与交易 Web 应用，支持商品发布、分类浏览、搜索与站内留言等功能，方便学生在校园内进行闲置物品流转。",
    stack: ["Vue", "Spring Boot", "MySQL"],
    date: "2025.06",
    category: "Web 应用",
    image: "assets/images/project-01.svg",
    alt: "校园二手交易平台——项目封面插画",
  },
  {
    name: "个人学习任务管理小程序",
    intro:
      "一款帮助规划每日学习任务与复习进度的小工具，支持任务打卡与完成度统计，便于自我管理和学习进度的跟踪。",
    stack: ["微信小程序", "JavaScript", "微信云开发"],
    date: "2025.03",
    category: "小程序",
    image: "assets/images/project-02.svg",
    alt: "个人学习任务管理小程序——项目封面插画",
  },
  {
    name: "天气数据可视化页面",
    intro:
      "通过调用公开天气 API，将温度、湿度、风力等数据以图表和卡片形式直观展示，帮助用户快速了解天气状况。",
    stack: ["HTML/CSS", "JavaScript", "ECharts"],
    date: "2024.12",
    category: "数据可视化",
    image: "assets/images/project-03.svg",
    alt: "天气数据可视化页面——项目封面插画",
  },
  {
    name: "学生成绩管理系统",
    intro:
      "实现了学生信息与成绩的增删改查，支持按条件筛选与成绩统计，适用于教务场景下的基础数据管理。",
    stack: ["Java", "MySQL"],
    date: "2024.06",
    category: "管理系统",
    image: "assets/images/project-04.svg",
    alt: "学生成绩管理系统——项目封面插画",
  },
];
