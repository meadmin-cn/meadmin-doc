import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Meadmin",
  lang: 'zh-CN',
  description: "js全栈一站式中后台解决方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide' },
      { text: '后端文档', link: '/server/guide' },
      { text: '前端文档', link: '/client/admin/guide' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide' },
          { text: '快速开始', link: '/start' }
        ]
      },
      {
        text: '后端文档',
        items: [
          { text: '介绍', link: '/server/guide' },
        ]
      },
      {
        text: '前端文档',
        items: [
          {
            text: '后台文档',
            items: [
              { text: '介绍', link: '/client/admin/guide' },
            ]
          },
          {
            text: '前台文档',
            items: [
              { text: '介绍', link: '/client/index/guide' },
            ]
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/meadmin-cn/meadmin' }
    ]
  }
})
