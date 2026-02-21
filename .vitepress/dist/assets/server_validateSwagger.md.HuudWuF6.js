import{_ as a,o as n,c as i,ai as p}from"./chunks/framework.BdTV7y8C.js";const k=JSON.parse('{"title":"校验和Swagger文档","description":"","frontmatter":{},"headers":[],"relativePath":"server/validateSwagger.md","filePath":"server/validateSwagger.md"}'),e={name:"server/validateSwagger.md"};function l(t,s,r,o,h,c){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="校验和swagger文档" tabindex="-1">校验和Swagger文档 <a class="header-anchor" href="#校验和swagger文档" aria-label="Permalink to “校验和Swagger文档”">​</a></h1><h2 id="校验" tabindex="-1">校验 <a class="header-anchor" href="#校验" aria-label="Permalink to “校验”">​</a></h2><p>我们经常要在方法调用时执行一些类型检查，参数转换的操作，本项目利用dto文件结合<code>Midway</code>的<code>@midwayjs/validate@3</code>组件，提供了一种简单的能力来快速检查参数的类型，这个能力来源于 <code>joi</code> 。</p><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to “背景”">​</a></h3><p>最常用参数校验的地方是 控制器（Controller），同时你也可以在任意的 Class 中使用这个能力。</p><p>我们以控制器（Controller）中使用为例，还是那个 user。 普通情况下，我们从 body 上拿到所有 Post 结果，并进行一些校验。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// src/interface.ts</span></span>
<span class="line"><span>export interface User {</span></span>
<span class="line"><span>  id: number;</span></span>
<span class="line"><span>  firstName: string;</span></span>
<span class="line"><span>  lastName: string;</span></span>
<span class="line"><span>  age: number;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// src/controller/home.ts</span></span>
<span class="line"><span>import { Controller, Get, Provide } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;/api/user&#39;)</span></span>
<span class="line"><span>export class HomeController {</span></span>
<span class="line"><span>  @Post(&#39;/&#39;)</span></span>
<span class="line"><span>  async updateUser(@Body() user: User) {</span></span>
<span class="line"><span>    if (!user.id || typeof user.id !== &#39;number&#39;) {</span></span>
<span class="line"><span>      throw new Error(&#39;id error&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (user.age &lt;= 30) {</span></span>
<span class="line"><span>      throw new Error(&#39;age not match&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // xxx</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果每个方法都需要这么校验，会非常的繁琐。</p><p>针对这种情况， 配合 <code>@Validate</code> 和 <code>@Rule</code> 装饰器，用来 快速定义校验的规则，帮助用户 减少这些重复的代码。</p><h3 id="创建校验文件" tabindex="-1">创建校验文件 <a class="header-anchor" href="#创建校验文件" aria-label="Permalink to “创建校验文件”">​</a></h3><p>本项目校验文件为dto 类,统一放在模块的<code>dto</code>文件夹</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/app/admin/dto/loginParam.dto.ts</span></span>
<span class="line"><span>import { ApiPropertyRule } from &#39;@/decorators/index.js&#39;;</span></span>
<span class="line"><span>import { RuleType } from &#39;@midwayjs/validate&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export class LoginParamDto {</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;用户名&#39;, rule: RuleType.string().max(10).min(1).required() })</span></span>
<span class="line"><span>  username: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;密码&#39;, rule: RuleType.string().required() })</span></span>
<span class="line"><span>  password: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;验证码标识&#39;, rule: RuleType.string().required()})</span></span>
<span class="line"><span>  captchaId: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;验证码&#39;, rule: RuleType.string().required() })</span></span>
<span class="line"><span>  captcha: string;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>由于这个类属于一个 PlainObject ，也不需要被依赖注入管理，我们不需要提供 @Provide 装饰器。</p><p>这个 <code>LoginParamDto</code> Class 提供了三个属性和他们对应的校验规则。</p><ul><li><p>username 一个必填的字符串类型,长度在1-10之间</p></li><li><p>password 一个必填的字符串类型</p></li><li><p>captchaId 一个必填的字符串类型</p></li><li><p>captcha 一个必填的字符串类型</p></li></ul><p>不同于<code>midway</code>用<code>@Rule</code>装饰器修饰需要被校验的属性，本项目声明了<code>@ApiPropertyRule</code>装饰器，它封装了<code>swagger</code>的<code>@ApiProperty</code>装饰器和<code>validate</code>的<code>Rule</code>装饰器，它的参数为rule,接受一个 RuleType 对象提供的校验规则的链式方法。 <code>@ApiPropertyRule</code> 针对日常应用还做了以下处理</p><ul><li>将 空串视为空而不是无效值,否则空串会被 stripUnknown 配置 视为无效值处理掉</li><li>如果不是必填值，允许null</li><li>自动将 <code>RuleType</code> 的 required规则赋值给<code>@ApiProperty</code>装饰器</li><li>自动将maximum、minimum、minLength、maxLength、enmu赋值给<code>RuleType</code></li><li>自动将<code>description</code>添加为 <code>RuleType</code>的<code>label</code>用于多语言</li></ul><h3 id="使用校验文件" tabindex="-1">使用校验文件 <a class="header-anchor" href="#使用校验文件" aria-label="Permalink to “使用校验文件”">​</a></h3><p>定义完类型之后，就可以直接在业务代码中使用了。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { ApiOperationResponse } from &#39;@/decorators/swagger.js&#39;;</span></span>
<span class="line"><span>import { Body, Controller, Inject, Post } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import { Context } from &#39;@midwayjs/koa&#39;;</span></span>
<span class="line"><span>import { LoginParamDto } from &#39;../dto/loginParam.dto.js&#39;;</span></span>
<span class="line"><span>import { LoginResultDto } from &#39;../dto/loginResult.dto.js&#39;;</span></span>
<span class="line"><span>import { LoginService } from &#39;../service/login.serveice.js&#39;;</span></span>
<span class="line"><span>import { BaseController } from &#39;./base.controller.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;login&#39;)</span></span>
<span class="line"><span>export class LoginController extends BaseController {</span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  loginService: LoginService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  ctx: Context;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Post(&#39;/login&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responseType: LoginResultDto,</span></span>
<span class="line"><span>    summary: &#39;登录&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  async login(@Body() param: LoginParamDto) {</span></span>
<span class="line"><span>    return this.success(await this.loginService.login(param.username, param.password, this.ctx));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="从原有-dto-创建新-dto" tabindex="-1">从原有 DTO 创建新 DTO <a class="header-anchor" href="#从原有-dto-创建新-dto" aria-label="Permalink to “从原有 DTO 创建新 DTO”">​</a></h3><p>有时候，我们会希望从某个 DTO 中获取一部分属性，变成一个新的 DTO 类。</p><p>本项目 提供了 <code>PickDtoType</code> <code>OmitDtoType</code> <code>PartialType</code> <code>RequiredType</code> <code>IntersectionType</code> 五个方法根据现有的的 DTO 类型创建新的 DTO。请注意这些函数从<code>@/helper/dto.js</code>导出。</p><p>PickDto 用于从现有的 DTO 中获取一些属性，变成新的 DTO，而 OmitDto 用于将其中某些属性剔除，PartialType 将属性设置为可选，RequiredType 将属性设置为必填， IntersectionType 将两种类型合并为一种新类型,结合了两种类型的所有属性。比如：</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { OmitDtoType } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/helper/dto.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { InferAttributesLoose } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/types/entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { File } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;../../../entities/file.entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FileCreateDto</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> OmitDtoType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  File </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> InferAttributesLoose</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">File</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//只保留声明属性</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;createdAt&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;updatedAt&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;url&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;createdAdminId&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;updatedAdminId&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//排除自动创建的属性</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {}</span></span></code></pre></div><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to “配置”">​</a></h3><p>配置文件在src/config/config.default.ts中，默认开启了以下配置</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  validate: {</span></span>
<span class="line"><span>    validationOptions: {</span></span>
<span class="line"><span>      allowUnknown: false, // 全局生效 允许未定义的字段</span></span>
<span class="line"><span>      convert: true, // 当为true时，尝试将值转换为所需的类型（例如，将字符串转换为数字.</span></span>
<span class="line"><span>      stripUnknown: true, // 全局生效,移除多余的字段</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span></code></pre></div><p>更多说明请参考<a href="https://midwayjs.org/docs/extensions/validate" target="_blank" rel="noreferrer">midway</a>和<a href="https://joi.dev/api/" target="_blank" rel="noreferrer">joi</a>文档</p><h2 id="swagger文档" tabindex="-1">swagger文档 <a class="header-anchor" href="#swagger文档" aria-label="Permalink to “swagger文档”">​</a></h2><p>swagger 基于<code>@midwayjs/swagger@3 </code>只做了<code>@ApiPropertyRule</code>的封装，<code>@ApiPropertyRule</code>可接受<code>@ApiProperty</code>的全部参数</p><h3 id="开启组件" tabindex="-1">开启组件 <a class="header-anchor" href="#开启组件" aria-label="Permalink to “开启组件”">​</a></h3><p>在 configuration.ts 中增加组件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { Configuration } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import * as swagger from &#39;@midwayjs/swagger&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Configuration({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    swagger</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class MainConfiguration {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以配置启用的环境，比如下面的代码指的是 只在 local 环境下启用。本项目已默认在local和dev环境下开启</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { Configuration } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import * as swagger from &#39;@midwayjs/swagger&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Configuration({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      component: swagger,</span></span>
<span class="line"><span>      enabledEnvironment: [&#39;local&#39;]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class MainConfiguration {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后启动项目，访问地址：</p><p>UI: <a href="http://127.0.0.1:7001/swagger-ui/index.html" target="_blank" rel="noreferrer">http://127.0.0.1:7001/swagger-ui/index.html</a></p><p>JSON: <a href="http://127.0.0.1:7001/swagger-ui/index.json" target="_blank" rel="noreferrer">http://127.0.0.1:7001/swagger-ui/index.json</a> 路径可以通过 swaggerPath 参数配置。</p><h3 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to “数据类型”">​</a></h3><p>自动类型提取 Swagger 组件会识别各个 @Controller 中每个路由方法的 @Body()、@Query()、@Param() 装饰器，提取路由方法参数和类型。</p><p>比如下面的代码：</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">async </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">home</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Query</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;uid&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) uid: number,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Query</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tid&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) tid: string,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Query</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;isBoolean&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) isBoolean: boolean,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>会自动提取相关参数生成文档。</p><h3 id="schema" tabindex="-1">Schema <a class="header-anchor" href="#schema" aria-label="Permalink to “Schema”">​</a></h3><p>本项目推荐使用dto文件参数使用对象，并使用定义好的类作为类型，这个时候 swagger 组件也能自动识别，同时也能和普通的类型进行组合识别。</p><p>比如下面的代码：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Post(&#39;/:id&#39;, { summary: &#39;test&#39;})</span></span>
<span class="line"><span>async create(@Body() LoginParamDto: LoginParamDto, @Param(&#39;id&#39;) id: number) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>CreateCatDto 类型的定义如下，我们使用 ApiPropertyRule 将其中的每个属性都进行了定义。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { ApiPropertyRule } from &#39;@/decorators/index.js&#39;;</span></span>
<span class="line"><span>import { RuleType } from &#39;@midwayjs/validate&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export class LoginParamDto {</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;用户名&#39;, rule: RuleType.string().max(10).min(1).required().empty(&#39;&#39;) })</span></span>
<span class="line"><span>  username: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;密码&#39;, rule: RuleType.string().required().empty(&#39;&#39;) })</span></span>
<span class="line"><span>  password: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;验证码标识&#39;, rule: RuleType.string().required().empty(&#39;&#39;) })</span></span>
<span class="line"><span>  captchaId: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;验证码&#39;, rule: RuleType.string().required().empty(&#39;&#39;) })</span></span>
<span class="line"><span>  captcha: string;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>详细的类型参考请查阅 <a href="https://midwayjs.org/docs/extensions/swagger" target="_blank" rel="noreferrer">midway文档</a></p><h3 id="循环依赖" tabindex="-1">循环依赖 <a class="header-anchor" href="#循环依赖" aria-label="Permalink to “循环依赖”">​</a></h3><p>当类之间具有循环依赖关系时，请使用惰性函数提供类型信息。</p><p>比如 type 字段的循环。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>class Photo {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>  @ApiProperty({</span></span>
<span class="line"><span>    type: () =&gt; Album</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  album: Album;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class Album {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>  @ApiProperty({</span></span>
<span class="line"><span>    type: () =&gt; Photo</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  photo: Photo;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>getSchemaPath 也可以使用。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>export class CreateCatDto {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @ApiProperty({</span></span>
<span class="line"><span>    type: &#39;array&#39;,</span></span>
<span class="line"><span>    items: {</span></span>
<span class="line"><span>      $ref: () =&gt; getSchemaPath(Cat)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  relatedList: Cat[];</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="请求-response" tabindex="-1">请求 Response <a class="header-anchor" href="#请求-response" aria-label="Permalink to “请求 Response”">​</a></h3><p>本项目封装了<code>@ApiOperationResponse({...})</code> 来自定义请求 Response,单条数据获取传入<code>responseType</code>参数，分页列表获取传入<code>responsePage</code>参数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Get(&#39;/:id&#39;)</span></span>
<span class="line"><span>@ApiOperationResponse({</span></span>
<span class="line"><span>  responseType: User,</span></span>
<span class="line"><span>  summary: &#39;用户信息&#39;,</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>findOne(@Param(&#39;id&#39;) id: string, @Query(&#39;test&#39;) test: any): Cat {</span></span>
<span class="line"><span>  return this.catsService.findOne(+id);</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>@Post(&#39;/&#39;)</span></span>
<span class="line"><span>@ApiOperationResponse({</span></span>
<span class="line"><span>  responsePage: User,</span></span>
<span class="line"><span>  summary: &#39;获取用户列表&#39;,</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>@AdminPermission(&#39;UserList&#39;)</span></span>
<span class="line"><span>async list(@Body() queryDto: UserQueryDto) {</span></span>
<span class="line"><span>  return this.success(await this.userService.list(queryDto));</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,61)])])}const g=a(e,[["render",l]]);export{k as __pageData,g as default};
