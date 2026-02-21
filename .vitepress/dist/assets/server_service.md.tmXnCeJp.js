import{_ as a,o as n,c as e,ai as i,am as p}from"./chunks/framework.BdTV7y8C.js";const v=JSON.parse('{"title":"Service服务","description":"","frontmatter":{},"headers":[],"relativePath":"server/service.md","filePath":"server/service.md"}'),l={name:"server/service.md"};function r(t,s,c,o,d,h){return n(),e("div",null,[...s[0]||(s[0]=[i('<h1 id="service服务" tabindex="-1">Service服务 <a class="header-anchor" href="#service服务" aria-label="Permalink to “Service服务”">​</a></h1><p>在业务中，只有控制器（Controller）的代码是不够的，一般来说会有一些业务逻辑被抽象到一个特定的逻辑单元中，我们一般称为服务（Service）。 <img src="'+p+`" alt="alt text"> 提供这个抽象有以下几个好处：</p><ul><li>保持 Controller 中的逻辑更加简洁。</li><li>保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。</li><li>将逻辑和展现分离，更容易编写测试用例。</li></ul><p>本项目对service没有做特别封装，除了文件命名及目录位置外规则和midway一致，更多内容请阅读<a href="https://midwayjs.org/docs/service" target="_blank" rel="noreferrer">midway 服务和注入</a>文档。</p><h2 id="创建服务" tabindex="-1">创建服务 <a class="header-anchor" href="#创建服务" aria-label="Permalink to “创建服务”">​</a></h2><p>普通的服务就是一个 Class，比如我们之前创建了一个接受 user 请求的 Controller，我们来新增一个处理这些数据的服务。 对于服务的文件，我们一般会存放到 对应模块的<code>service</code> 目录中。我们来添加一个 user 服务。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>├── src</span></span>
<span class="line"><span>│   ├── app</span></span>
<span class="line"><span>│   │   ├──admin</span></span>
<span class="line"><span>│   │   │   ├── controller</span></span>
<span class="line"><span>│   │   │   │   ├── user.controller.ts</span></span>
<span class="line"><span>│   │   │   └── service</span></span>
<span class="line"><span>│   │   │       └── user.service.ts</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>└── tsconfig.json</span></span></code></pre></div><p>内容为：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// src/app/admin/service/user.service.ts</span></span>
<span class="line"><span>import { Provide } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Provide()</span></span>
<span class="line"><span>export class UserService {</span></span>
<span class="line"><span>  async getUser(id: string) {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      id,</span></span>
<span class="line"><span>      name: &#39;Harry&#39;,</span></span>
<span class="line"><span>      age: 18,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>除了一个 @Provide 装饰器外，整个服务的结构和普通的 Class 一模一样，这样就行了。</p><h2 id="使用服务" tabindex="-1">使用服务 <a class="header-anchor" href="#使用服务" aria-label="Permalink to “使用服务”">​</a></h2><p>在 Controller 处，我们需要来调用这个服务。传统的代码写法，我们需要初始化这个 Class（new），然后将实例放在需要调用的地方。在 Midway 中，你不需要这么做，只需要编写我们提供的 <strong>&quot;依赖注入&quot;</strong> 的代码写法。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/app/admin/controller/user.controller.ts</span></span>
<span class="line"><span>import { Inject, Controller, Get, Provide, Query } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import { BaseController } from &#39;./base.controller.js&#39;;</span></span>
<span class="line"><span>import { UserService } from &#39;../service/user.service.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;user&#39;)</span></span>
<span class="line"><span>export class UserController extends BaseController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  userService: UserService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Get(&#39;/info/:id&#39;)</span></span>
<span class="line"><span>  async getUser(@Param(&#39;id&#39;) id: string) {</span></span>
<span class="line"><span>    const user = await this.userService.getUser(uid);</span></span>
<span class="line"><span>   return this.success(user);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用服务的过程分为几部分：</p><ul><li>使用 @Provide 装饰器暴露你的服务</li><li>在调用的代码处，使用 @Inject 装饰器注入你的服务</li><li>调用注入服务，执行对应的方法</li></ul><h2 id="注入行为描述" tabindex="-1">注入行为描述 <a class="header-anchor" href="#注入行为描述" aria-label="Permalink to “注入行为描述”">​</a></h2><p>Midway 的核心 “依赖注入” 容器会自动关联你的控制器（Controller） 和服务（Service），在运行过程中会自动初始化所有的代码，你无需手动初始化这些 Class。</p><p>@Provide 装饰器的作用：</p><ul><li>这个 Class，被依赖注入容器托管，会自动被实例化（new）</li><li>这个 Class，可以被其他在容器中的 Class 注入 而对应的 @Inject 装饰器，作用为：</li><li>在依赖注入容器中，找到对应的属性名，并赋值为对应的实例化对象</li></ul><p>@Provide 和 @Inject 装饰器是成对出现的，两者通过冒号后的类名进行关联。</p><p>事实上，控制器（Controller） 上也有这个装饰器，只是在Midway中，Controller 包含了 Provide 的功能。如果你不确定什么时候可以隐藏，可以都写上。 上边的controller代码等价于</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Provide()</span></span>
<span class="line"><span>@Controller(&#39;user&#39;)</span></span>
<span class="line"><span>export class UserController extends BaseController {</span></span></code></pre></div><h2 id="在其余地方使用service" tabindex="-1">在其余地方使用service <a class="header-anchor" href="#在其余地方使用service" aria-label="Permalink to “在其余地方使用service”">​</a></h2><p>根据上边的介绍，我们可以知道在任何<code>@Provide</code>修饰的地方都可以用<code>@Inject</code>调用服务，下边我们举个<code>service</code>服务互相调用的例子</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/app/admin/service/login.service.ts</span></span>
<span class="line"><span>import { Inject, Controller, Get, Provide, Query } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import { UserService } from &#39;../service/user.service.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Provide()</span></span>
<span class="line"><span>export class LoginService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  userService: UserService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  async hasUser(id: string) {</span></span>
<span class="line"><span>    return (await this.userService.getUser(uid))?true:false;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>依赖注入 是 Midway 的核心特性，通过装饰器的轻量特性，让依赖注入变的优雅，从而让开发过程变的便捷有趣。如果想更深一步了解，可以阅读<a href="https://midwayjs.org/docs/container" target="_blank" rel="noreferrer">midway 依赖注入</a>文档。</p>`,26)])])}const u=a(l,[["render",r]]);export{v as __pageData,u as default};
