import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Meadmin",
  lang: "zh-CN",
  description: "js全栈一站式中后台解决方案",
  markdown: {
    toc: {
      level: [1, 2, 3], // TOC 显示 h1、h2、h3
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: [1, 6], // 右侧导航显示 h1、h2、h3
      label: " ",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide" },
      { text: "后端文档", link: "/server/guide" },
      {
        text: "前端文档",
        items: [
          { text: "管理后台", link: "/client/admin/guide/index" },
          { text: "前台", link: "/client/index/guide" },
        ],
      },
      {
        text: "社区",
        items: [
          {
            text: "QQ群：752939100",
            link: "https://jq.qq.com/?_wv=1027&k=zSjWSant",
          },
        ],
      },
      {
        text: "相关链接",
        items: [
          {
            text: "预览",
            link: "https://meadmin-cn.github.io/meadmin-template/",
          },
          {
            text: "Github",
            link: "https://github.com/meadmin-cn/meadmin",
          },
          {
            text: "文档Github",
            link: "https://github.com/meadmin-cn/meadmin-doc",
          },
          {
            text: "文档",
            link: "https://www.meadmin.cn/",
          },
        ],
      },
    ],
    sidebar: [
      {
        text: "指南",
        items: [
          { text: "介绍", link: "/guide" },
          { text: "快速开始", link: "/start" },
        ],
      },
      {
        text: "后端文档",
        items: [
          { text: "介绍", link: "/server/guide" },
          { text: "路由和控制器", link: "/server/controller" },
          {
            text: "Application 和 Context",
            link: "/server/applicationContext",
          },
          { text: "Service服务", link: "/server/service" },
          { text: "数据库", link: "/server/entity" },
          { text: "校验和swagger文档", link: "/server/validateSwagger" },
          { text: "最佳实践", link: "/server/best" },
          { text: "一键crud", link: "/server/crud" },
          { text: "其他", link: "/server/other" },
        ],
      },
      {
        text: "前端文档",
        items: [
          {
            text: "后台文档",
            items: [
              {
                text: "指南",
                items: [
                  { text: "介绍", link: "/client/admin/guide/index" },
                  { text: "配置", link: "/client/admin/guide/config" },
                  { text: "路由", link: "/client/admin/guide/route" },
                  { text: "权限", link: "/client/admin/guide/permission" },
                  { text: "请求", link: "/client/admin/guide/request" },
                  { text: "多语言", link: "/client/admin/guide/i18n" },
                  { text: "样式", link: "/client/admin/guide/style" },
                ],
              },
              {
                text: "深入",
                items: [
                  {
                    text: "组件自动按需引入",
                    link: "/client/admin/more/components",
                  },
                  { text: "Pinia使用", link: "/client/admin/more/pinia" },
                  { text: "api自动引入", link: "/client/admin/more/apiAuto" },
                  {
                    text: "配置vscode模板片段",
                    link: "/client/admin/more/vsTemplate",
                  },
                  { text: "setUp", link: "/client/admin/more/setUp" },
                  {
                    text: "服务方式调用组件",
                    link: "/client/admin/more/service",
                  },
                ],
              },
              {
                text: "组件",
                items: [
                  {
                    text: "meKeepAlive",
                    link: "/client/admin/components/core/meKeepAlive",
                  },
                  {
                    text: "meComponent",
                    link: "/client/admin/components/core/meComponent",
                  },
                  { text: "icon", link: "/client/admin/components/core/icon" },
                  {
                    text: "文件上传",
                    link: "/client/admin/components/extends/upload",
                  },

                  {
                    text: "meNumber",
                    link: "/client/admin/components/extends/meNumber",
                  },
                  {
                    text: "富文本",
                    link: "/client/admin/components/extends/meWangEditor",
                  },
                  {
                    text: "表格",
                    link: "/client/admin/components/extends/meVxeTable",
                  },
                  {
                    text: "弹窗",
                    link: "/client/admin/components/extends/meDialog",
                  },
                  {
                    text: "meSearchForm",
                    link: "/client/admin/components/extends/meSearchForm",
                  },
                  {
                    text: "图片预览",
                    link: "/client/admin/components/service/meImageViewer",
                  },
                ],
              },
            ],
          },
          {
            text: "前台文档",
            link: "/client/index/guide",
          },
        ],
      },
      { text: "开发规范", link: "/normalize" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/meadmin-cn/meadmin" },
    ],
  },
});
