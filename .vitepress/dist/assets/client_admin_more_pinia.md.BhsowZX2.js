import{_ as a,o as n,c as e,ai as t}from"./chunks/framework.BdTV7y8C.js";const h=JSON.parse('{"title":"Pinia使用","description":"","frontmatter":{},"headers":[],"relativePath":"client/admin/more/pinia.md","filePath":"client/admin/more/pinia.md"}'),i={name:"client/admin/more/pinia.md"};function p(l,s,o,r,c,d){return n(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="pinia使用" tabindex="-1">Pinia使用 <a class="header-anchor" href="#pinia使用" aria-label="Permalink to “Pinia使用”">​</a></h1><p>Pinia 是 下一代 Vue 的存储库，相关使用说明请参考<a href="https://pinia.web3doc.top/introduction.html" target="_blank" rel="noreferrer">Pinia</a>文档</p><h2 id="新建store文件" tabindex="-1">新建store文件 <a class="header-anchor" href="#新建store文件" aria-label="Permalink to “新建store文件”">​</a></h2><p>store存放文件夹为<code>@/store/modules</code>，在store文件夹下新建对应store文件，按<a href="https://pinia.web3doc.top/introduction.html" target="_blank" rel="noreferrer">Pinia</a>规则声明<code>defineStore</code>函数并导出为<code>default</code>即可</p><p>示例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { filterAsyncRoutes } from &#39;@/utils/permission&#39;;</span></span>
<span class="line"><span>import useUserStore from &#39;./user&#39;;</span></span>
<span class="line"><span>import { constantRoutes, asyncRoutes } from &#39;@/router&#39;;</span></span>
<span class="line"><span>import { RouteRecordRaw } from &#39;vue-router&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineStore(&#39;route&#39;, {</span></span>
<span class="line"><span>  state: () =&gt; ({</span></span>
<span class="line"><span>    addRoutes: [] as RouteRecordRaw[],</span></span>
<span class="line"><span>    noCacheFullPath: [] as Array&lt;string | RegExp&gt;,</span></span>
<span class="line"><span>  }),</span></span>
<span class="line"><span>  getters: {</span></span>
<span class="line"><span>    routes: (state) =&gt; constantRoutes.concat(state.addRoutes),</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  actions: {</span></span>
<span class="line"><span>    generateRoutes() {</span></span>
<span class="line"><span>      if (useUserStore().rules) {</span></span>
<span class="line"><span>        this.addRoutes = markRaw(filterAsyncRoutes(asyncRoutes));</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return this.addRoutes;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    setNoCache(fullPath: string) {</span></span>
<span class="line"><span>      if (!this.noCacheFullPath.includes(fullPath)) {</span></span>
<span class="line"><span>        this.noCacheFullPath.push(fullPath);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    removeNoCache(fullPath: string) {</span></span>
<span class="line"><span>      const index = this.noCacheFullPath.indexOf(fullPath);</span></span>
<span class="line"><span>      if (index &gt; -1) {</span></span>
<span class="line"><span>        this.noCacheFullPath.splice(index, 1);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="导出语句自动生成" tabindex="-1">导出语句自动生成 <a class="header-anchor" href="#导出语句自动生成" aria-label="Permalink to “导出语句自动生成”">​</a></h2><ul><li>在<code>@/store/modules</code>文件夹下符合<code>[&#39;**/*.{ts,js}&#39;, &#39;*.{ts,js}&#39;]</code> <code>glob</code>规则的文件会在<code>@/store/module.ts</code>文件中自动创建对应导出语句</li></ul><div class="tip custom-block"><p class="custom-block-title">说明</p><p>此功能基于<a href="https://github.com/antfu/unplugin-vue-components" target="_blank" rel="noreferrer">unplugin-vue-components</a>插件实现,对应配置位于<code>vite.config.ts</code>中</p></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//当前文件由vite-plugin-autogeneration-import-file自动生成</span></span>
<span class="line"><span>export { default as useGlobalStore } from &quot;./modules/global&quot;</span></span>
<span class="line"><span>export { default as useRouteStore } from &quot;./modules/route&quot;</span></span>
<span class="line"><span>export { default as useSettingStore } from &quot;./modules/setting&quot;</span></span>
<span class="line"><span>export { default as useUserStore } from &quot;./modules/user&quot;</span></span>
<span class="line"><span>//code</span></span></code></pre></div><ul><li><code>@/store/index.ts</code>文件对<code>@/store/module.ts</code>文件进行了二次导出</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>export * from &#39;./module&#39;;</span></span></code></pre></div><h2 id="使用store" tabindex="-1">使用store <a class="header-anchor" href="#使用store" aria-label="Permalink to “使用store”">​</a></h2><p>直接导入后使用即可,具体规则请参考<a href="https://pinia.web3doc.top/introduction.html" target="_blank" rel="noreferrer">Pinia</a>文档</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { useUserStore } from &#39;@/store&#39;;</span></span>
<span class="line"><span>const userStore = useUserStore();</span></span></code></pre></div>`,15)])])}const g=a(i,[["render",p]]);export{h as __pageData,g as default};
