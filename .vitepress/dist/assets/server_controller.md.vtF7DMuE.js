import{_ as n,o as a,c as e,ai as l}from"./chunks/framework.BdTV7y8C.js";const h=JSON.parse('{"title":"路由和控制器","description":"","frontmatter":{},"headers":[],"relativePath":"server/controller.md","filePath":"server/controller.md"}'),p={name:"server/controller.md"};function i(t,s,r,o,c,d){return a(),e("div",null,[...s[0]||(s[0]=[l(`<h1 id="路由和控制器" tabindex="-1">路由和控制器 <a class="header-anchor" href="#路由和控制器" aria-label="Permalink to “路由和控制器”">​</a></h1><p>在常见的 MVC 架构中，C 即代表控制器，控制器用于负责 解析用户的输入，处理后返回相应的结果。</p><p>更多内容请阅读<a href="https://midwayjs.org/docs/controller" target="_blank" rel="noreferrer">midway 路由和控制器</a>文档。</p><h2 id="定义路由可控制器" tabindex="-1">定义路由可控制器 <a class="header-anchor" href="#定义路由可控制器" aria-label="Permalink to “定义路由可控制器”">​</a></h2><p>用@Controller装饰器声明控制器类，@Get 、 @Post 、 @Put() 、 @Del() 、 @Patch() 、 @Options() 、 @Head() 和 @All()，表示各自的 HTTP 请求方法，声明路由方法。@All 装饰器比较特殊，表示能接受以上所有类型的 HTTP Method。midway 会自动扫描项目目录下的所有@Controller类进行路由注册。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { Controller, Get } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;/api/&#39;)</span></span>
<span class="line"><span>export class UserController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Get(&#39;/home&#39;)</span></span>
<span class="line"><span>  async home(@Query(&#39;uid&#39;) uid: string) {</span></span>
<span class="line"><span>    return {content:&quot;Hello Meadmin! &quot;+uid};</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Post(&#39;/up&#39;)</span></span>
<span class="line"><span>  async update(@Body() user: User) {</span></span>
<span class="line"><span>    return {content:&quot;Hello Meadmin! &quot;+user.uid};</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Get(&#39;/:uid&#39;)</span></span>
<span class="line"><span>  async getUser(@Param(&#39;uid&#39;) uid: string): Promise&lt;User&gt; {</span></span>
<span class="line"><span>    return {content:&quot;Hello Meadmin! &quot;+uid};</span></span>
<span class="line"><span>  }  </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>@Controller装饰器有一个可选参数，用于进行路由前缀（分组），这样这个控制器下面的所有路由都会带上这个前缀,如上述所示例允许的请求为：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>GET &#39;/api/home?uid=123&#39; //返回json对象{&quot;content&quot;:&quot;Hello Midwayjs! 123&quot;}</span></span>
<span class="line"><span>POST &#39;/api/home&#39;   {&quot;uid&quot;: &quot;1&quot;, &quot;name&quot;: &quot;harry&quot;}  //返回json对象{&quot;content&quot;:&quot;Hello Midwayjs! 1&quot;}</span></span>
<span class="line"><span>GET &#39;/api/1&#39;    //返回json对象{&quot;content&quot;:&quot;Hello Midwayjs! 1&quot;}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title custom-block-title-default">WARNING</p><p>所有的控制器方法必须为异步函数</p></div><h2 id="控制器继承" tabindex="-1">控制器继承 <a class="header-anchor" href="#控制器继承" aria-label="Permalink to “控制器继承”">​</a></h2><p>本项目对路由和控制器做了单独封装会根据Controller继承关系 递归合成@Controller装饰器的参数 从第一个prefix以/开头的祖级开始合并@Controller的第一个参数prefix和第二个参数routerOptions，如果prefix 以/开头，则重新计算，不合并父级的prefix和routerOptions 例如有以下基类：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { CodeEunm } from &#39;@/dict/code.enum.js&#39;;</span></span>
<span class="line"><span>import { ResponseService } from &#39;@/service/response.service.js&#39;;</span></span>
<span class="line"><span>import { Controller, Inject } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;/api&#39;)</span></span>
<span class="line"><span>export abstract class ApiController {</span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  protected readonly responseService: ResponseService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  success&lt;T extends Record&lt;string, any&gt;&gt;(data: T = {} as T, message = &#39;操作成功&#39;) {</span></span>
<span class="line"><span>    return this.responseService.success(data, message);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  error(message: string, code: Exclude&lt;CodeEunm, CodeEunm.Success&gt; = CodeEunm.Fail) {</span></span>
<span class="line"><span>    return this.responseService.error(message, code);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  successPage&lt;T = any&gt;(list: T[], total = 0, page = 1, size = 10, message = &#39;列表数据获取成功&#39;) {</span></span>
<span class="line"><span>    return this.responseService.successPage(list, total, page, size, message);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/app/admin/controller/base.controller.ts</span></span>
<span class="line"><span>import { ApiController } from &#39;@/controller/api.controller.js&#39;;</span></span>
<span class="line"><span>import { Controller } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import { AdminMiddleware } from &#39;../middleware/admin.middleware.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;admin&#39;, { middleware: [AdminMiddleware] })</span></span>
<span class="line"><span>export abstract class BaseController extends ApiController {}</span></span></code></pre></div><p>自定义controller</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/app/admin/controller/user.controller.ts</span></span>
<span class="line"><span>import { BaseController } from &#39;./base.controller.js&#39;;</span></span>
<span class="line"><span>@Controller(&#39;user&#39;)</span></span>
<span class="line"><span>export class UserController extends BaseController {</span></span>
<span class="line"><span>  //接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>  @Post(&#39;/add&#39;)</span></span>
<span class="line"><span>  async add() {</span></span>
<span class="line"><span>    return this.success({aa:1});</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当前@Controller 地址参数会被递归合并<code>/api/admin/user</code>,最终请求地址为<code>POST /api/admin/user/add</code>。并且userController会具有<code>AdminMiddleware</code>中间件。</p><h2 id="特别约定" tabindex="-1">特别约定 <a class="header-anchor" href="#特别约定" aria-label="Permalink to “特别约定”">​</a></h2><ul><li>所有的文件以小驼峰命名，所有的装饰器文件命名以<code>小驼峰名称.controller.ts</code>命名，类名以<code>大驼峰名称Controller</code>命名，</li><li>所有的装饰器放在对应模块的controller文件夹下，允许使用子文件夹自由组合嵌套。</li><li>个别防火墙，默认只放行GET、POST请求，而GET请求传参受浏览器URL限制，如果需要传递的参数过多就会无法传递。服务端经常会将访问的完整 URL 记录到日志文件中，有一些敏感数据通过 URL 传递会不安全。CRUD自动生成的请求除详情接口外都为POST。推荐尽量使用POST请求。</li><li>所有接口的Controller 需继承当前模块的<code>BaseController</code></li><li>所有接口的Controller返回值，需调用<code>return this.success(data:Object)</code>进行返回，以遵循特定格式，方便前端识别。如接口返回错误，直接<code>throw new BadRequestError(&#39;error&#39;)</code>抛出对应异常即可，项目已做统一封装处理，详情请参考[响应及异常封装]</li></ul>`,18)])])}const m=n(p,[["render",i]]);export{h as __pageData,m as default};
