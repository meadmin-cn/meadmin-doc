import{_ as n,o as a,c as p,ai as e}from"./chunks/framework.BdTV7y8C.js";const h=JSON.parse('{"title":"前台文档","description":"","frontmatter":{},"headers":[],"relativePath":"client/index/guide.md","filePath":"client/index/guide.md"}'),i={name:"client/index/guide.md"};function l(t,s,c,o,r,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="前台文档" tabindex="-1">前台文档 <a class="header-anchor" href="#前台文档" aria-label="Permalink to “前台文档”">​</a></h1><p>前台前端模板，与后台模板规则一致，只是去除了多语言和权限校验，增加了服务端渲染支持。 详细说明请参考<a href="/client/admin/guide/">后台文档</a></p><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to “目录结构”">​</a></h2><p>根目录为<code>view/index</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>├── dist 打包文件夹</span></span>
<span class="line"><span>│   ├── mock mock文件夹</span></span>
<span class="line"><span>│   ├── plugins vite插件</span></span>
<span class="line"><span>│   ├── public 公共静态资源目录</span></span>
<span class="line"><span>│   ├── src  主目录</span></span>
<span class="line"><span>│   │   ├── api 接口文件</span></span>
<span class="line"><span>│   │   ├── assets 资源文件</span></span>
<span class="line"><span>│   │   │   └── images 项目存放图片的文件夹</span></span>
<span class="line"><span>│   │   ├── components 公共组件（里面的组件会自动引入）</span></span>
<span class="line"><span>│   │   ├── config 配置文件夹</span></span>
<span class="line"><span>│   │   │   ├── index.ts 配置入口文件</span></span>
<span class="line"><span>│   │   │   └── login.ts  登录配置</span></span>
<span class="line"><span>│   │   ├── dict  字典</span></span>
<span class="line"><span>│   │   ├── directives 指令（里面的指令会自动引入）</span></span>
<span class="line"><span>│   │   ├── event 事件</span></span>
<span class="line"><span>│   |   ├── hooks 公共hooks</span></span>
<span class="line"><span>│   │   ├── icons 图标</span></span>
<span class="line"><span>│   │   │   ├── svg  svg图标文件夹（放入此文件夹的svg会被自动注册图标组件）</span></span>
<span class="line"><span>│   │   │   └── index.ts 图标自动注册入口文件</span></span>
<span class="line"><span>│   │   ├── layout 布局文件</span></span>
<span class="line"><span>│   │   ├── router  路由配置</span></span>
<span class="line"><span>│   │   │   ├── guard 路由全局守卫</span></span>
<span class="line"><span>│   │   │   └── routes 动态路由文件夹</span></span>
<span class="line"><span>│   │   ├── store  pinia文件夹</span></span>
<span class="line"><span>│   |   ├── styles 样式文件 </span></span>
<span class="line"><span>│   │   ├── utils  工具类</span></span>
<span class="line"><span>│   │   ├── views  页面</span></span>
<span class="line"><span>│   │   ├── entry-client.ts 客户端渲染入口文件</span></span>
<span class="line"><span>│   │   ├── entry-server.ts 服务端渲染入口文件</span></span>
<span class="line"><span>│   │   └── main.ts 入口文件</span></span>
<span class="line"><span>│   ├── template自动生成模板</span></span>
<span class="line"><span>│   ├── types  类型文件</span></span>
<span class="line"><span>└── └── vite.config.ts vite配置文件</span></span></code></pre></div><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to “注意事项”">​</a></h2><p>开发需寻遵循以下事项，以兼容服务端渲染特性</p><ul><li>如需使用window对象需增加服务端渲染判断</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>if (!import.meta.env.SSR) {</span></span>
<span class="line"><span>  //下面代码仅在客户端执行</span></span>
<span class="line"><span>  window.addEventListener(&#39;resize&#39;, () =&gt; mitter.emit(event.RESIZE));</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>request请求需在setup顶层创建，以规避服务端渲染“跨请求状态污染”</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//login.vue</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot; name=&quot;Login&quot;&gt;</span></span>
<span class="line"><span>//...</span></span>
<span class="line"><span>import {  loginCaptchaApi } from &#39;@/api/login&#39;;</span></span>
<span class="line"><span>const { data: captchaObj, runAsync: getCaptchRun } = loginCaptchaApi();</span></span>
<span class="line"><span>const getCaptch = async () =&gt; {</span></span>
<span class="line"><span>  await getCaptchRun();</span></span>
<span class="line"><span>  //...</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>await getCaptch();</span></span>
<span class="line"><span>//...</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><ul><li>如在组件外发送请求需透传app给request方法，</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//login.ts</span></span>
<span class="line"><span>export function loginApi&lt;T extends boolean = true&gt;(returnAxios: T = true as T, app?:App) {</span></span>
<span class="line"><span>  return request&lt;LoginResult, [LoginParams], T&gt;(</span></span>
<span class="line"><span>    (params) =&gt; ({</span></span>
<span class="line"><span>      url: &#39;login/login&#39;,</span></span>
<span class="line"><span>      method: &#39;post&#39;,</span></span>
<span class="line"><span>      data: params,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>    {},</span></span>
<span class="line"><span>    returnAxios,</span></span>
<span class="line"><span>    app,</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span> // userStore</span></span>
<span class="line"><span>  login: async function (app:App, params: LoginParams) {</span></span>
<span class="line"><span>    //...</span></span>
<span class="line"><span>    const res = await loginApi(true,app)(params);</span></span>
<span class="line"><span>    //...</span></span>
<span class="line"><span>  },</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//login.vue</span></span>
<span class="line"><span>const _this = getCurrentInstance();</span></span>
<span class="line"><span>const submit = async () =&gt; {</span></span>
<span class="line"><span>  //...</span></span>
<span class="line"><span>  await userStore.login(_this!.appContext.app,loginParams);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>//...</span></span></code></pre></div><ul><li><p>请求直接，在setp 顶层await否则服务端渲染期间无法获取到数据。</p></li><li><p>如需在组件外创建store，需传入pinia</p></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//request.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function request&lt;R, P extends unknown[] = [], T = boolean&gt;(</span></span>
<span class="line"><span>  axiosConfig: (...args: P) =&gt; AxiosRequestConfig | Promise&lt;AxiosRequestConfig&gt;,</span></span>
<span class="line"><span>  options?: RequestOptions&lt;R, P&gt;,</span></span>
<span class="line"><span>  returnAxios?: T,</span></span>
<span class="line"><span>  app?: App,</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>//...</span></span>
<span class="line"><span> store = app?.config.globalProperties.$pinia;</span></span>
<span class="line"><span> const userStore = useUserStore(store);</span></span>
<span class="line"><span>//...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="路由声明" tabindex="-1">路由声明 <a class="header-anchor" href="#路由声明" aria-label="Permalink to “路由声明”">​</a></h2><p>前台项目路由声明在<code>src/routes</code>文件夹下，src/routes文件夹下的<code>.ts</code>会自动引入加载，不经过权限校验。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/router/routes/002-demo.ts</span></span>
<span class="line"><span>import Layout from &#39;@/layout/default/index.vue&#39;;</span></span>
<span class="line"><span>import { concatObjectValue } from &#39;@/utils/helper&#39;;</span></span>
<span class="line"><span>import { RouteRecordRaw } from &#39;vue-router&#39;;</span></span>
<span class="line"><span>export const routes: RouteRecordRaw[] = [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/demo&#39;,</span></span>
<span class="line"><span>    redirect: &#39;/demo/1&#39;,</span></span>
<span class="line"><span>    component: Layout,</span></span>
<span class="line"><span>    children: concatObjectValue&lt;RouteRecordRaw&gt;(import.meta.glob(&#39;./demo/*.ts&#39;, { eager: true, import: &#39;routes&#39; })),</span></span>
<span class="line"><span>    meta: { title: &#39;演示菜单&#39; },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>];</span></span></code></pre></div>`,20)])])}const u=n(i,[["render",l]]);export{h as __pageData,u as default};
