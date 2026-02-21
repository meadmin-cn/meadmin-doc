import{_ as a,o as n,c as p,ai as e}from"./chunks/framework.BdTV7y8C.js";const q=JSON.parse('{"title":"配置vscode模板片段","description":"","frontmatter":{},"headers":[],"relativePath":"client/admin/more/vsTemplate.md","filePath":"client/admin/more/vsTemplate.md"}'),t={name:"client/admin/more/vsTemplate.md"};function l(i,s,o,c,u,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="配置vscode模板片段" tabindex="-1">配置vscode模板片段 <a class="header-anchor" href="#配置vscode模板片段" aria-label="Permalink to “配置vscode模板片段”">​</a></h1><h2 id="vue模板" tabindex="-1">vue模板 <a class="header-anchor" href="#vue模板" aria-label="Permalink to “vue模板”">​</a></h2><ul><li>点击vscode 左下角设置图标</li><li>选中配置用户代码片段</li><li>选中新建全局代码片段</li><li>输入名称<code>v3</code></li><li>粘贴入以下代码</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>{</span></span>
<span class="line"><span>	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and </span></span>
<span class="line"><span>	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:</span></span>
<span class="line"><span>	// $1, $2 for tab stops, $0 for the final cursor position, and \${1:label}, \${2:another} for placeholders. Placeholders with the </span></span>
<span class="line"><span>	// same ids are connected.</span></span>
<span class="line"><span>	// Example:</span></span>
<span class="line"><span>	&quot;Print to console&quot;: {</span></span>
<span class="line"><span>		&quot;prefix&quot;: &quot;&lt;v3&quot;,</span></span>
<span class="line"><span>		&quot;body&quot;: [</span></span>
<span class="line"><span>			&quot;&lt;template&gt;&quot;,</span></span>
<span class="line"><span>                &quot;&lt;div class=\\&quot;\${TM_FILENAME_BASE/([A-Z])/-\${1:/downcase}/g}\\&quot;&gt;&quot;,</span></span>
<span class="line"><span>				&quot;\${1}&quot;,</span></span>
<span class="line"><span>				&quot;&lt;/div&gt;&quot;,</span></span>
<span class="line"><span>                &quot;&lt;/template&gt;&quot;,</span></span>
<span class="line"><span>                &quot;&quot;,</span></span>
<span class="line"><span>                &quot;&lt;script setup lang=\\&quot;ts\\&quot; name=\\&quot;\${TM_FILENAME_BASE/(.*)/\${1:/pascalcase}/}\\&quot;&gt;&quot;,</span></span>
<span class="line"><span>				&quot;&quot;,</span></span>
<span class="line"><span>                &quot;&lt;/script&gt;&quot;,</span></span>
<span class="line"><span>                &quot;&lt;style lang=\\&quot;scss\\&quot; scoped&gt;&quot;,</span></span>
<span class="line"><span>                &quot;.\${TM_FILENAME_BASE/([A-Z])/-\${1:/downcase}/g}{&quot;,</span></span>
<span class="line"><span>				&quot;&quot;,</span></span>
<span class="line"><span>				&quot;}&quot;,</span></span>
<span class="line"><span>                &quot;&lt;/style&gt;&quot;</span></span>
<span class="line"><span>		],</span></span>
<span class="line"><span>		&quot;description&quot;: &quot;A vue file template&quot;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>新建<code>.vue</code>文件后 输入<code>&lt;v3</code>会出现对应模板选项，选中后会自动生成vue文件模板</li></ul><h2 id="pinia-模板" tabindex="-1">pinia 模板 <a class="header-anchor" href="#pinia-模板" aria-label="Permalink to “pinia 模板”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>{</span></span>
<span class="line"><span>   // Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and </span></span>
<span class="line"><span>   // description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope </span></span>
<span class="line"><span>   // is left empty or omitted, the snippet gets applied to all languages. The prefix is what is </span></span>
<span class="line"><span>   // used to trigger the snippet and the body will be expanded and inserted. Possible variables are: </span></span>
<span class="line"><span>   // $1, $2 for tab stops, $0 for the final cursor position, and \${1:label}, \${2:another} for placeholders. </span></span>
<span class="line"><span>   // Placeholders with the same ids are connected.</span></span>
<span class="line"><span>   // Example:</span></span>
<span class="line"><span>   &quot;Print to console&quot;: {</span></span>
<span class="line"><span>   	&quot;scope&quot;: &quot;typescript&quot;,</span></span>
<span class="line"><span>   	&quot;prefix&quot;: &quot;&lt;s&quot;,</span></span>
<span class="line"><span>   	&quot;body&quot;: [</span></span>
<span class="line"><span>   		&quot;const use\${TM_FILENAME_BASE/(.*)/\${1:/pascalcase}/}Store =  defineStore(&#39;global&#39;, {&quot;,</span></span>
<span class="line"><span>   		&quot;  state:()=&gt;({&quot;,</span></span>
<span class="line"><span>   		&quot;    $0&quot;,</span></span>
<span class="line"><span>   		&quot;  }),&quot;,</span></span>
<span class="line"><span>   		&quot;});&quot;,</span></span>
<span class="line"><span>   		&quot;&quot;,</span></span>
<span class="line"><span>   		&quot;if (import.meta.hot) {&quot;,</span></span>
<span class="line"><span>   		&quot;  import.meta.hot.accept(acceptHMRUpdate(use\${TM_FILENAME_BASE/(.*)/\${1:/pascalcase}/}Store, import.meta.hot))&quot;,</span></span>
<span class="line"><span>   		&quot;}&quot;,</span></span>
<span class="line"><span>   		&quot;&quot;,</span></span>
<span class="line"><span>   		&quot;export default use\${TM_FILENAME_BASE/(.*)/\${1:/pascalcase}/}Store&quot;,</span></span>
<span class="line"><span>   		&quot;&quot;</span></span>
<span class="line"><span>   	],</span></span>
<span class="line"><span>   	&quot;description&quot;: &quot;vue pinia store&quot;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,7)])])}const h=a(t,[["render",l]]);export{q as __pageData,h as default};
