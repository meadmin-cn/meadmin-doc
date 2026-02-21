import{_ as a,o as n,c as i,ai as e}from"./chunks/framework.BdTV7y8C.js";const o=JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[],"relativePath":"client/admin/guide/started.md","filePath":"client/admin/guide/started.md"}'),p={name:"client/admin/guide/started.md"};function l(t,s,h,c,d,r){return n(),i("div",null,[...s[0]||(s[0]=[e(`<h1 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to “快速上手”">​</a></h1><h2 id="依赖环境" tabindex="-1">依赖环境 <a class="header-anchor" href="#依赖环境" aria-label="Permalink to “依赖环境”">​</a></h2><ul><li><a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">nodejs v20+</a></li></ul><h2 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to “快速开始”">​</a></h2><ul><li>clone 代码<div class="warning custom-block"><p class="custom-block-title">注意</p><p>如果想使用基础模板，请切换为template分支</p></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/meadmin-cn/meadmin-template.git</span></span></code></pre></div></li><li>安装依赖<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> meadmin-template</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div></li><li>本地运行<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div></li><li>打包<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div></li></ul><h2 id="目录说明" tabindex="-1">目录说明 <a class="header-anchor" href="#目录说明" aria-label="Permalink to “目录说明”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── dist 打包文件夹</span></span>
<span class="line"><span>├── mock mock文件夹</span></span>
<span class="line"><span>├── plugins vite插件</span></span>
<span class="line"><span>├── public 公共静态资源目录</span></span>
<span class="line"><span>├── src  主目录</span></span>
<span class="line"><span>│   ├── api 接口文件</span></span>
<span class="line"><span>│   ├── assets 资源文件</span></span>
<span class="line"><span>│   │   └── images 项目存放图片的文件夹</span></span>
<span class="line"><span>│   ├── components 公共组件（里面的组件会自动引入）</span></span>
<span class="line"><span>│   ├── config 配置文件夹</span></span>
<span class="line"><span>│   │   ├── index.ts 配置入口文件</span></span>
<span class="line"><span>│   │   ├── locale.ts 国际化配置</span></span>
<span class="line"><span>│   │   ├── login.ts  登录配置</span></span>
<span class="line"><span>│   │   └── theme.ts  主题配置</span></span>
<span class="line"><span>│   ├── directives 指令（里面的指令会自动引入）</span></span>
<span class="line"><span>│   ├── dict  字典</span></span>
<span class="line"><span>│   ├── event 事件</span></span>
<span class="line"><span>|   ├── hooks 公共hooks</span></span>
<span class="line"><span>│   ├── icons 图标</span></span>
<span class="line"><span>│   │   ├── svg  svg图标文件夹（放入此文件夹的svg会被自动注册图标组件）</span></span>
<span class="line"><span>│   │   └── index.ts 图标自动注册入口文件</span></span>
<span class="line"><span>│   ├── layout 布局文件</span></span>
<span class="line"><span>│   ├── locales  国际化</span></span>
<span class="line"><span>│   │   └── lang 全局语言包</span></span>
<span class="line"><span>│   ├── router  路由配置</span></span>
<span class="line"><span>│   │   ├── guard 路由全局守卫</span></span>
<span class="line"><span>│   │   └── routes 动态路由存放目录</span></span>
<span class="line"><span>|   ├── styles 样式文件 </span></span>
<span class="line"><span>│   ├── store  pinia文件夹</span></span>
<span class="line"><span>│   ├── utils  工具类</span></span>
<span class="line"><span>│   ├── views  页面</span></span>
<span class="line"><span>│   └── main.ts 入口文件</span></span>
<span class="line"><span>├── template自动生成模板</span></span>
<span class="line"><span>├── types  类型文件</span></span>
<span class="line"><span>└── vite.config.ts vite配置文件</span></span></code></pre></div>`,7)])])}const g=a(p,[["render",l]]);export{o as __pageData,g as default};
