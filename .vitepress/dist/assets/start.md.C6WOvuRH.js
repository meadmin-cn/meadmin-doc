import{_ as n,o as a,c as e,ai as p}from"./chunks/framework.C_v2XVcg.js";const u=JSON.parse('{"title":"快速开始","description":"","frontmatter":{},"headers":[],"relativePath":"start.md","filePath":"start.md"}'),l={name:"start.md"};function i(t,s,r,o,c,d){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to “快速开始”">​</a></h1><h2 id="依赖环境" tabindex="-1">依赖环境 <a class="header-anchor" href="#依赖环境" aria-label="Permalink to “依赖环境”">​</a></h2><ul><li>存储数据库：PostgreSQL</li><li>缓存数据库：Redis</li><li>语言：nodejs&gt;= 22.14.0</li><li>工具：pnpm</li></ul><div class="warning custom-block"><p class="custom-block-title custom-block-title-default">WARNING</p><p>开始本项目前，请务必准备好相关环境，服务器推荐使用<a href="https://www.bt.cn/u/M6tROn" target="_blank" rel="noreferrer">宝塔服务器面板</a>，一键全能部署及管理安装PostgreSQL、Redis</p></div><h2 id="快速启动" tabindex="-1">快速启动 <a class="header-anchor" href="#快速启动" aria-label="Permalink to “快速启动”">​</a></h2><h3 id="安装项目" tabindex="-1">安装项目 <a class="header-anchor" href="#安装项目" aria-label="Permalink to “安装项目”">​</a></h3><p>执行命令 下面命令 根据提示数据配置选项即可！</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>pnpm create meadminjs</span></span></code></pre></div><h3 id="调试项目" tabindex="-1">调试项目 <a class="header-anchor" href="#调试项目" aria-label="Permalink to “调试项目”">​</a></h3><ul><li>在项目根目录执行 <code>pnpm dev</code></li><li>后台访问 <a href="http://127.0.0.1:7001/admin" target="_blank" rel="noreferrer">http://127.0.0.1:7001/admin</a></li><li>前台访问 <a href="http://127.0.0.1:7001/" target="_blank" rel="noreferrer">http://127.0.0.1:7001/</a></li></ul><h3 id="默认账户" tabindex="-1">默认账户 <a class="header-anchor" href="#默认账户" aria-label="Permalink to “默认账户”">​</a></h3><h4 id="后台" tabindex="-1">后台 <a class="header-anchor" href="#后台" aria-label="Permalink to “后台”">​</a></h4><p>默认账户 admin 默认密码 meAdmin#202507!P</p><h4 id="前台" tabindex="-1">前台 <a class="header-anchor" href="#前台" aria-label="Permalink to “前台”">​</a></h4><p>默认账户 test 默认密码 123456789</p><h2 id="编写数据库实体文件" tabindex="-1">编写数据库实体文件 <a class="header-anchor" href="#编写数据库实体文件" aria-label="Permalink to “编写数据库实体文件”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//src/entities/exampleDemo.entity.ts</span></span>
<span class="line"><span>import { ApiPropertyRule } from &#39;@/decorators/index.js&#39;;</span></span>
<span class="line"><span>import { uuid } from &#39;@/helper/snowflake.js&#39;;</span></span>
<span class="line"><span>import { RuleType } from &#39;@/ruleType/index.js&#39;;</span></span>
<span class="line"><span>import { BelongsManyModel, BelongsToModel } from &#39;@/types/entity.js&#39;;</span></span>
<span class="line"><span>import { DataTypes, NonAttribute, Op } from &#39;@sequelize/core&#39;;</span></span>
<span class="line"><span>import { Attribute, BelongsTo, BelongsToMany, Default, DeletedAt, Index, PrimaryKey, Table } from &#39;@sequelize/core/decorators-legacy&#39;;</span></span>
<span class="line"><span>import { AdminBaseModel } from &#39;./abstract/adminBase.entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleBook } from &#39;./exampleBook.entity.js&#39;;</span></span>
<span class="line"><span>import { File } from &#39;./file.entity.js&#39;;</span></span>
<span class="line"><span>import { User } from &#39;./user.entity.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//rule规则使用添加接口的校验规则,建议字符串的默认值统一使用空串，否则RuleType.string需要显示声明allow(null)允许传入null</span></span>
<span class="line"><span>@Table({ tableName: &#39;example_demo&#39;, comment: &#39;示例_Demo&#39; })</span></span>
<span class="line"><span>//继承自DelParanoidModel则使用软删除。</span></span>
<span class="line"><span>export class ExampleDemo extends AdminBaseModel&lt;ExampleDemo&gt; {</span></span>
<span class="line"><span>  //自动生成的主键</span></span>
<span class="line"><span>  @Attribute({ type: DataTypes.STRING(20), allowNull: false })</span></span>
<span class="line"><span>  @PrimaryKey</span></span>
<span class="line"><span>  @Default(uuid)</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;ID&#39;, rule: RuleType.string() })</span></span>
<span class="line"><span>  id: string;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //唯一索引名称必须全库唯一，当两个null值时唯一索引会认为不是同一个值</span></span>
<span class="line"><span>  @Index({ unique: true, where: { deleted_at: { [Op.isNot]: null } } }) //局部唯一索引设置只有不删除的数据加索引</span></span>
<span class="line"><span>  @Attribute({ type: DataTypes.STRING(11), comment: &#39;手机号&#39; })</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;手机号&#39;, rule: RuleType.string().mobile().description(&#39;手机号&#39;).required() })</span></span>
<span class="line"><span>  mobile: string;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //以“名称:值1=说明1;值2=说明2”，格式声明的备注会自动创建字典和下拉列表，并且支持number、string两种类型</span></span>
<span class="line"><span>  @Attribute({</span></span>
<span class="line"><span>    comment: &#39;类型:0=书籍;1=电子产品;2=卡片&#39;,</span></span>
<span class="line"><span>    defaultValue: 0,</span></span>
<span class="line"><span>    allowNull: false,</span></span>
<span class="line"><span>    type: DataTypes.TINYINT.UNSIGNED,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;类型:0=书籍;1=电子产品;2=卡片&#39;, rule: RuleType.number().equal(0, 1, 2).required() })</span></span>
<span class="line"><span>  type: number;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //ApiPropertyRule对RuleType规则做了封面，对于非必填的number和string自动允许null值，如果不允许null请设置required()或者设置invalid(null)</span></span>
<span class="line"><span>  //前端会根据rule生成表达校验，包括必填、类型(string、number)、mobile、email、min、max。</span></span>
<span class="line"><span>  @Attribute({ type: DataTypes.STRING(20), comment: &#39;名称&#39;, allowNull: false, defaultValue: &#39;&#39; })</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;名称&#39;, rule: RuleType.string().max(20).min(1).required() })</span></span>
<span class="line"><span>  name: string;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //多对多关联 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to-many/</span></span>
<span class="line"><span>  @BelongsToMany(() =&gt; ExampleBook, {</span></span>
<span class="line"><span>    through: &#39;example_demo_books&#39;, //中间表名称 或者 对应的Model，</span></span>
<span class="line"><span>    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span>    // 如果需要在ExampleBook定义反向关联可以添加参数  inverse: {as: &#39;demos&#39;,}, 并在 ExampleBook中添加 /** Declared by {@link Person.likedToots} */  declare demo?: NonAttribute&lt;ExampleBook[]&gt;;</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @ApiPropertyRule({</span></span>
<span class="line"><span>    description: &#39;书籍&#39;,</span></span>
<span class="line"><span>    type: &#39;array&#39;,</span></span>
<span class="line"><span>    items: {</span></span>
<span class="line"><span>      type: () =&gt; ExampleBook,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    rule: RuleType.array().items(RuleType.object({ id: RuleType.string().required() })),</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  books?: NonAttribute&lt;ExampleBook[]&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //反向BelongsTo关联从属， 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to/</span></span>
<span class="line"><span>  @Attribute({ type: DataTypes.STRING(20), comment: &#39;关联前台用户id&#39; })</span></span>
<span class="line"><span>  userId: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;用户&#39;, type: () =&gt; User, rule: RuleType.object({ id: RuleType.string().required() }).pattern(RuleType.string(), RuleType.any()) })</span></span>
<span class="line"><span>  @BelongsTo(() =&gt; User, {</span></span>
<span class="line"><span>    foreignKey: &#39;userId&#39;, //外键名称</span></span>
<span class="line"><span>    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  user?: NonAttribute&lt;User&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //反向BelongsTo关联从属，File类型创建单文件</span></span>
<span class="line"><span>  @Attribute({ type: DataTypes.STRING(20), comment: &#39;头像附件id&#39; })</span></span>
<span class="line"><span>  avatarFileId: string;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;头像&#39;, type: () =&gt; File, rule: RuleType.object({ id: RuleType.string().required() }).pattern(RuleType.string(), RuleType.any()) })</span></span>
<span class="line"><span>  @BelongsTo(() =&gt; File, {</span></span>
<span class="line"><span>    foreignKey: &#39;avatarFileId&#39;, //外键名称</span></span>
<span class="line"><span>    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  avatar?: NonAttribute&lt;File&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //BelongsTo多对多关联从属，File类型创建多文件选择</span></span>
<span class="line"><span>  @BelongsToMany(() =&gt; File, {</span></span>
<span class="line"><span>    through: &#39;example_demo_files&#39;, //中间表名称 或者 对应的Model，</span></span>
<span class="line"><span>    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @ApiPropertyRule({</span></span>
<span class="line"><span>    description: &#39;附件&#39;,</span></span>
<span class="line"><span>    type: &#39;array&#39;,</span></span>
<span class="line"><span>    items: {</span></span>
<span class="line"><span>      type: () =&gt; File,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    rule: RuleType.array().items(RuleType.object({ id: RuleType.string().required() })),</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  files?: NonAttribute&lt;File[]&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @DeletedAt //设置为软删除</span></span>
<span class="line"><span>  @Attribute({ comment: &#39;删除时间&#39; })</span></span>
<span class="line"><span>  declare deletedAt: Date | null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//声明自动关联方法</span></span>
<span class="line"><span>export declare interface ExampleDemo extends BelongsManyModel&lt;&#39;books&#39;, &#39;book&#39;, &#39;books&#39;, ExampleBook&gt; {}</span></span>
<span class="line"><span>export declare interface ExampleDemo extends BelongsToModel&lt;&#39;user&#39;, User&gt; {}</span></span>
<span class="line"><span>export declare interface ExampleDemo extends BelongsToModel&lt;&#39;avatar&#39;, File&gt; {}</span></span>
<span class="line"><span>export declare interface ExampleDemo extends BelongsManyModel&lt;&#39;files&#39;, &#39;file&#39;, &#39;files&#39;, File&gt; {}</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title custom-block-title-default">DANGER</p><p>以下 meadmin 命令会读取数据库实体对应的 JS 文件，这些文件位于 dist/entities 目录中。 请注意：</p><ul><li>在调试模式下<code>pnpm dev</code> 新增实体(会监听文件改动自动生成 JS 文件)；</li><li>或新增实体后已执行了 <code>pnpm dev</code>。</li></ul><p>再运行下列命令。</p></div><h2 id="同步数据库结构" tabindex="-1">同步数据库结构 <a class="header-anchor" href="#同步数据库结构" aria-label="Permalink to “同步数据库结构”">​</a></h2><ul><li><code>pnpm exec meadmin sync *</code></li><li>或 <code>pnpm meadmin sync exampleDemo,systemAdmin,exampleBook,user,file</code> 定向同步exampleDemo文件（定向同步文件时，需将关联依赖全部罗列出来，一起同步）</li></ul><h2 id="一键生成crud" tabindex="-1">一键生成crud <a class="header-anchor" href="#一键生成crud" aria-label="Permalink to “一键生成crud”">​</a></h2><ul><li><code>pnpm meadmin crud exampleDemo --menu</code> --menu 参数代表数据库同步生成后台菜单</li></ul><p>运行后会生成以下文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>src/app/admin/dto/example/demoCreate.dto.ts 后端新增dto校验文件</span></span>
<span class="line"><span>src/app/admin/dto/example/demoUpdate.dto.ts 后端更新dto校验文件</span></span>
<span class="line"><span>src/app/admin/dto/example/demoQuery.dto.ts 后端查询入参dto校验文件</span></span>
<span class="line"><span>src/app/admin/service/example/demo.service.ts 后端service</span></span>
<span class="line"><span>src/app/admin/controller/example/demo.controller.ts 后端 controller</span></span>
<span class="line"><span>view/admin/src/api/example/demo.ts  前端 api接口定义 </span></span>
<span class="line"><span>view/admin/src/views/example/demo/lang/en.json 前端组件语言包 </span></span>
<span class="line"><span>view/admin/src/views/example/demo/dict.ts 前端字典</span></span>
<span class="line"><span>view/admin/src/views/example/demo/index.vue 前端字典列表组件</span></span>
<span class="line"><span>view/admin/src/views/example/demo/components/info.vue 前端字典详情组件</span></span>
<span class="line"><span>view/admin/src/views/example/demo/components/addOrUp.vue 前端字典新增/修改组件</span></span></code></pre></div>`,24)])])}const h=n(l,[["render",i]]);export{u as __pageData,h as default};
