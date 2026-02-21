import{_ as n,o as s,c as e,ai as p,ak as l}from"./chunks/framework.BdTV7y8C.js";const g=JSON.parse('{"title":"路由菜单","description":"","frontmatter":{},"headers":[],"relativePath":"client/admin/guide/route.md","filePath":"client/admin/guide/route.md"}'),i={name:"client/admin/guide/route.md"};function t(c,a,o,r,d,h){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="路由菜单" tabindex="-1">路由菜单 <a class="header-anchor" href="#路由菜单" aria-label="Permalink to “路由菜单”">​</a></h1><p>这里的路由分为两种，constantRoutes 和 asyncRoutes。</p><p>constantRoutes： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。</p><p>asyncRoutes： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。</p><h2 id="静态路由-constantroutes" tabindex="-1">静态路由(constantRoutes) <a class="header-anchor" href="#静态路由-constantroutes" aria-label="Permalink to “静态路由(constantRoutes)”">​</a></h2><p>静态路由定义位于<code>@/router/routes/index.ts</code>文件下,主要包含一些无需登录的公共路由。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>export const constantRoutes: RouteRecordRaw[] = [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: PageEnum.LOGIN,</span></span>
<span class="line"><span>    component: async () =&gt; await import(&#39;@/views/login/index.vue&#39;),</span></span>
<span class="line"><span>    meta: {</span></span>
<span class="line"><span>      hideMenu: true,</span></span>
<span class="line"><span>      title: &#39;登录&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: PageEnum.HOME,</span></span>
<span class="line"><span>    meta: {</span></span>
<span class="line"><span>      hideMenu: true,</span></span>
<span class="line"><span>      title: &#39;首页&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    redirect: () =&gt; useRouteStore().firstMenu(),//重定向到第一个路由</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/redirect&#39;,</span></span>
<span class="line"><span>    component: Layout,</span></span>
<span class="line"><span>    children: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        name: &#39;redirect&#39;,</span></span>
<span class="line"><span>        path: &#39;/redirect/:path(.*)&#39;,</span></span>
<span class="line"><span>        component: async () =&gt; await import(&#39;@/views/redirect.vue&#39;),</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    meta: {</span></span>
<span class="line"><span>      hideMenu: true,</span></span>
<span class="line"><span>      title: &#39;&#39;,</span></span>
<span class="line"><span>      noCache: true,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/:pathMatch(.*)*&#39;,</span></span>
<span class="line"><span>    component: async () =&gt; await import(&#39;@/views/404.vue&#39;),</span></span>
<span class="line"><span>    meta: { hideMenu: true, title: &#39;404&#39; },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>];</span></span></code></pre></div><h2 id="动态路由-asyncroutes" tabindex="-1">动态路由(asyncRoutes) <a class="header-anchor" href="#动态路由-asyncroutes" aria-label="Permalink to “动态路由(asyncRoutes)”">​</a></h2><ul><li><strong>动态定义通过api接口获取</strong></li><li><strong>动态路由获取成功后会动态注册到vue-router中。</strong></li><li><strong>动态路由注册时会自动注册到一级路由<code>/</code>的children下,这样菜单路由只有一级也可以渲染出layout框架</strong></li></ul><p>路由功能基于<a href="https://router.vuejs.org/zh/introduction.html" target="_blank" rel="noreferrer">vue-router</a>开发,自定义配置放在了<a href="#meta配置说明">meta</a>中,其余定义规则参考<a href="https://router.vuejs.org/zh/api/#routerecordraw" target="_blank" rel="noreferrer">vue-router#routerecordraw</a>。</p><p>将<code>settingConfig.menuMode</code>(位于<code>@/config/index.ts</code>文件中)设置为<code>MenuModeEnum.API</code>，将使用前端定义模式。</p><h3 id="动态路由api获取模式" tabindex="-1">动态路由api获取模式 <a class="header-anchor" href="#动态路由api获取模式" aria-label="Permalink to “动态路由api获取模式”">​</a></h3><p>将<code>settingConfig.menuMode</code>(位于<code>@/config/index.ts</code>文件中)设置为<code>MenuModeEnum.API</code>，将使用api模式，此值已自动设置，请勿更改。</p><p>在api模式下，登录成功后或者已登录首次访问时，会通过调用接口获取菜单数组，动态注册到vue-router中。</p><h3 id="创建菜单" tabindex="-1">创建菜单 <a class="header-anchor" href="#创建菜单" aria-label="Permalink to “创建菜单”">​</a></h3><p>在 菜单权限页面 直接创建 类型为 菜单， 组件路径为 相对于<code>src/views</code>文件夹无后缀的相对路径即可 <img src="`+l+`" alt="alt text"></p><h3 id="配置说明" tabindex="-1">配置说明 <a class="header-anchor" href="#配置说明" aria-label="Permalink to “配置说明”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>export interface RouteMeta extends Record&lt;string | number | symbol, unknown&gt; {</span></span>
<span class="line"><span>    // 标题设置该路由在侧边栏和面包屑中展示的名字</span></span>
<span class="line"><span>    title: string;</span></span>
<span class="line"><span>    // 对应权限 多个之间为或的关系</span></span>
<span class="line"><span>    rule?: string[];</span></span>
<span class="line"><span>    // 是否是固定的tag</span></span>
<span class="line"><span>    affix?: boolean;</span></span>
<span class="line"><span>    // 图标</span></span>
<span class="line"><span>    icon?: string;</span></span>
<span class="line"><span>    // 在tag中隐藏</span></span>
<span class="line"><span>    hideTag?: boolean;</span></span>
<span class="line"><span>    // 外链</span></span>
<span class="line"><span>    isLink?: boolean;</span></span>
<span class="line"><span>    // 当路由设置了该属性，则会高亮相对应的侧边栏。</span></span>
<span class="line"><span>    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list</span></span>
<span class="line"><span>    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置</span></span>
<span class="line"><span>    // asyncRoutes如果不设置会自动计算展示不隐藏的祖级（包括当前）</span></span>
<span class="line"><span>    activeMenu?: string;</span></span>
<span class="line"><span>    // 如果设置为true，则不会被 &lt;keep-alive&gt; 缓存</span></span>
<span class="line"><span>    noCache?: boolean;</span></span>
<span class="line"><span>    // 在菜单中隐藏</span></span>
<span class="line"><span>    hideMenu?: boolean;</span></span>
<span class="line"><span>    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式</span></span>
<span class="line"><span>    // 只有一个时，会将那个子路由当做根路由显示在侧边栏</span></span>
<span class="line"><span>    // 若你想不管路由下面的 children 声明的个数都显示你的根路由</span></span>
<span class="line"><span>    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由</span></span>
<span class="line"><span>    alwaysShow?: boolean;</span></span>
<span class="line"><span>    // 是否需要面包屑 false不展示在面包屑,ture一直展示在面包屑,undefined当只有一个子元素面包屑时跳过展示</span></span>
<span class="line"><span>    breadcrumb?: boolean;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h3 id="外链" tabindex="-1">外链 <a class="header-anchor" href="#外链" aria-label="Permalink to “外链”">​</a></h3><p>当为外链 时，路径 需填写外链地址。</p><h3 id="菜单图标" tabindex="-1">菜单图标 <a class="header-anchor" href="#菜单图标" aria-label="Permalink to “菜单图标”">​</a></h3><p>菜单图标定义值为图标组件的name,自定义svg图标和使用elment-plus图标请参考<a href="./icon.html">图标</a></p><h3 id="keepalive缓存" tabindex="-1">keepAlive缓存 <a class="header-anchor" href="#keepalive缓存" aria-label="Permalink to “keepAlive缓存”">​</a></h3><p>页面缓存通过 组件<a href="./../components/core/meKeepAlive.html">me-keep-alive</a>实现,通过路由的fullPath进行缓存过滤，所以无需对页面组件设置name,即可进行缓存，并且多路由共用同一页面组件时，可以进行独立刷新，互不影响。</p><ul><li>如果想全局禁用keppAlive，去<code>@/config/index.ts</code>配置<code>settingConfig.openKeepAlive</code>为<code>false</code>即可，配置详情参见<a href="./config.html#基础配置">config</a>。</li><li>如需设置某个路由不缓存设置缓存值为<code>否</code>即可。</li></ul>`,25)])])}const m=n(i,[["render",t]]);export{g as __pageData,m as default};
