import{_ as a,o as n,c as i,ai as p}from"./chunks/framework.BdTV7y8C.js";const c=JSON.parse('{"title":"最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"server/best.md","filePath":"server/best.md"}'),e={name:"server/best.md"};function l(t,s,h,k,r,E){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to “最佳实践”">​</a></h1><p>本项目推荐最佳实践，在数据库实体<code>entity</code>文件中声明所有属性、校验规则、及api文档。dto继承自<code>entity</code>文件，做相应处理。</p><h2 id="entity文件" tabindex="-1"><code>entity</code>文件 <a class="header-anchor" href="#entity文件" aria-label="Permalink to “entity文件”">​</a></h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ApiPropertyRule } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/decorators/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { uuid } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/helper/snowflake.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { RuleType } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/ruleType/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { BelongsManyModel, BelongsToModel } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/types/entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { DataTypes, NonAttribute, Op } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@sequelize/core&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Attribute, BelongsTo, BelongsToMany, Default, DeletedAt, Index, PrimaryKey, Table } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@sequelize/core/decorators-legacy&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { AdminBaseModel } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./abstract/adminBase.entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ExampleBook } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./exampleBook.entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { File } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./file.entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { User } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./user.entity.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//rule规则使用添加接口的校验规则,建议字符串的默认值统一使用空串，否则RuleType.string需要显示声明allow(null)允许传入null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ tableName: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;example_demo&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;示例_Demo&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//继承自DelParanoidModel则使用软删除。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ExampleDemo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AdminBaseModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ExampleDemo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //自动生成的主键</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ type: DataTypes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">STRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), allowNull: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @PrimaryKey</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(uuid)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ID&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //唯一索引名称必须全库唯一，当两个null值时唯一索引会认为不是同一个值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ unique: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, where: { deleted_at: { [Op.isNot]: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } } }) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//局部唯一索引设置只有不删除的数据加索引</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ type: DataTypes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">STRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">11</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;手机号&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;手机号&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mobile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;手机号&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  mobile</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //以“名称:值1=说明1;值2=说明2”，格式声明的备注会自动创建字典和下拉列表，并且支持number、string两种类型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;类型:0=书籍;1=电子产品;2=卡片&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    defaultValue: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    allowNull: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: DataTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TINYINT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">UNSIGNED</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;类型:0=书籍;1=电子产品;2=卡片&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">equal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //ApiPropertyRule对RuleType规则做了封面，对于非必填的number和string自动允许null值，如果不允许null请设置required()或者设置invalid(null)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //前端会根据rule生成表达校验，包括必填、类型(string、number)、mobile、email、min、max。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ type: DataTypes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">STRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;名称&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, allowNull: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, defaultValue: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;名称&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //多对多关联 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to-many/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BelongsToMany</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ExampleBook, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    through: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;example_demo_books&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//中间表名称 或者 对应的Model，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    foreignKeyConstraints: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 如果需要在ExampleBook定义反向关联可以添加参数  inverse: {as: &#39;demos&#39;,}, 并在 ExampleBook中添加 /** Declared by {@link Person.likedToots} */  declare demo?: NonAttribute&lt;ExampleBook[]&gt;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;书籍&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;array&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    items: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ExampleBook,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ id: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() })),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  books</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NonAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ExampleBook</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[]&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //反向BelongsTo关联从属， 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ type: DataTypes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">STRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;关联前台用户id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  userId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;用户&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> User, rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ id: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() }).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pattern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BelongsTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> User, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    foreignKey: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;userId&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//外键名称</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    foreignKeyConstraints: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NonAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //反向BelongsTo关联从属，File类型创建单文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ type: DataTypes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">STRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;头像附件id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  avatarFileId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;头像&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> File, rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ id: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() }).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pattern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BelongsTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> File, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    foreignKey: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;avatarFileId&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//外键名称</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    foreignKeyConstraints: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  avatar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NonAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">File</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //BelongsTo多对多关联从属，File类型创建多文件选择</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BelongsToMany</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> File, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    through: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;example_demo_files&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//中间表名称 或者 对应的Model，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    foreignKeyConstraints: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//数据库不创建外键，外键应用层解决</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ApiPropertyRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;附件&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;array&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    items: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> File,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rule: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ id: RuleType.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">required</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() })),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  files</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NonAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">File</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[]&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @DeletedAt </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//设置为软删除</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;删除时间&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  declare</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> deletedAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//声明自动关联方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ExampleDemo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BelongsManyModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;books&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;book&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;books&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ExampleBook</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ExampleDemo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BelongsToModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;user&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ExampleDemo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BelongsToModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;avatar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">File</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ExampleDemo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BelongsManyModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;files&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;file&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;files&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">File</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {}</span></span></code></pre></div><h2 id="校验文件" tabindex="-1">校验文件 <a class="header-anchor" href="#校验文件" aria-label="Permalink to “校验文件”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { OmitDtoType } from &#39;@/helper/dto.js&#39;;</span></span>
<span class="line"><span>import { InferAttributesLoose } from &#39;@/types/entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemo } from &#39;../../../../entities/exampleDemo.entity.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效</span></span>
<span class="line"><span>export class ExampleDemoCreateDto extends OmitDtoType(</span></span>
<span class="line"><span>  ExampleDemo as new () =&gt; InferAttributesLoose&lt;ExampleDemo&gt;, //只保留声明属性</span></span>
<span class="line"><span>  [&#39;id&#39;, &#39;createdAt&#39;, &#39;updatedAt&#39;, &#39;deletedAt&#39;, &#39;createdAdminId&#39;, &#39;updatedAdminId&#39;, &#39;createdAdmin&#39;, &#39;updatedAdmin&#39;], //排除自动创建的字段</span></span>
<span class="line"><span>) {}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { ApiPropertyRule } from &#39;@/decorators/index.js&#39;;</span></span>
<span class="line"><span>import { PageDto } from &#39;@/dto/page.dto.js&#39;;</span></span>
<span class="line"><span>import { IntersectionType, PartialType } from &#39;@/helper/dto.js&#39;;</span></span>
<span class="line"><span>import { RuleType } from &#39;@/ruleType/index.js&#39;;</span></span>
<span class="line"><span>import { InferAttributesLoose } from &#39;@/types/entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemo } from &#39;../../../../entities/exampleDemo.entity.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效</span></span>
<span class="line"><span>export class ExampleDemoQueryDto extends IntersectionType(PageDto, PartialType(ExampleDemo as new () =&gt; InferAttributesLoose&lt;ExampleDemo&gt;)) {</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;创建时间(起)&#39;, rule: RuleType.date() })</span></span>
<span class="line"><span>  startCreatedAt?: Date;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;创建时间(止)&#39;, rule: RuleType.date() })</span></span>
<span class="line"><span>  endCreatedAt?: Date;</span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;最后更新时间(起)&#39;, rule: RuleType.date() })</span></span>
<span class="line"><span>  startUpdatedAt?: Date;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @ApiPropertyRule({ description: &#39;最后更新时间(止)&#39;, rule: RuleType.date() })</span></span>
<span class="line"><span>  endUpdatedAt?: Date;</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { OmitDtoType, PartialType } from &#39;@/helper/dto.js&#39;;</span></span>
<span class="line"><span>import { InferAttributesLoose } from &#39;@/types/entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemo } from &#39;../../../../entities/exampleDemo.entity.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效</span></span>
<span class="line"><span>export class ExampleDemoUpdateDto extends PartialType(</span></span>
<span class="line"><span>  OmitDtoType(</span></span>
<span class="line"><span>    ExampleDemo as new () =&gt; InferAttributesLoose&lt;ExampleDemo&gt;, //只保留声明属性</span></span>
<span class="line"><span>    [&#39;id&#39;, &#39;createdAt&#39;, &#39;updatedAt&#39;, &#39;deletedAt&#39;, &#39;createdAdminId&#39;, &#39;updatedAdminId&#39;, &#39;createdAdmin&#39;, &#39;updatedAdmin&#39;], //排除自动创建的字段</span></span>
<span class="line"><span>  ),</span></span>
<span class="line"><span>) {}</span></span></code></pre></div><h2 id="控制器" tabindex="-1">控制器 <a class="header-anchor" href="#控制器" aria-label="Permalink to “控制器”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { AdminPermission, ApiOperationResponse } from &#39;@/decorators/index.js&#39;;</span></span>
<span class="line"><span>import { Body, Controller, Get, Inject, Param, Post } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import { ExampleDemo } from &#39;../../../../entities/exampleDemo.entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoCreateDto } from &#39;../../dto/example/demoCreate.dto.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoQueryDto } from &#39;../../dto/example/demoQuery.dto.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoUpdateDto } from &#39;../../dto/example/demoUpdate.dto.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoService } from &#39;../../service/example/demo.service.js&#39;;</span></span>
<span class="line"><span>import { BaseController } from &#39;../base.controller.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 为了防止防火墙禁止PUT、DELETE请求，方便传参，除详情外统一使用post请求。</span></span>
<span class="line"><span> * meadmin对controller做了装饰器继承封装，当以/开头时会使用当前controller前缀地址，不以/开头时会递归继承controller前缀地址</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Controller(&#39;example/demo&#39;)</span></span>
<span class="line"><span>export class ExampleDemoController extends BaseController {</span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  exampleDemoService: ExampleDemoService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //查询belongsTo关联模型user用户</span></span>
<span class="line"><span>  //获取用户信息</span></span>
<span class="line"><span>  @Post(&#39;/getUser&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responseType: ExampleDemo,</span></span>
<span class="line"><span>    summary: &#39;查询用户信息&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoList&#39;)</span></span>
<span class="line"><span>  async getUser(@Body(&#39;id&#39;) id: string, @Body(&#39;username&#39;) username: string, @Body(&#39;page&#39;) page = 1, @Body(&#39;pageSize&#39;) pageSize = 10) {</span></span>
<span class="line"><span>    return this.success(await this.exampleDemoService.getUser(page, pageSize, id, username));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //查询belongsToMany关联模型books示例_书籍</span></span>
<span class="line"><span>  //获取示例_书籍信息</span></span>
<span class="line"><span>  @Post(&#39;/getExampleBook&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responseType: ExampleDemo,</span></span>
<span class="line"><span>    summary: &#39;查询示例_书籍信息&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoList&#39;)</span></span>
<span class="line"><span>  async getExampleBook(@Body(&#39;id&#39;) id: string, @Body(&#39;name&#39;) name: string, @Body(&#39;page&#39;) page = 1, @Body(&#39;pageSize&#39;) pageSize = 10) {</span></span>
<span class="line"><span>    return this.success(await this.exampleDemoService.getExampleBook(page, pageSize, id, name));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>  @Post(&#39;/add&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responseType: ExampleDemo,</span></span>
<span class="line"><span>    summary: &#39;添加示例_Demo信息&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoAdd&#39;)</span></span>
<span class="line"><span>  async add(@Body() createDto: ExampleDemoCreateDto) {</span></span>
<span class="line"><span>    return this.success(await this.exampleDemoService.create(createDto));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>  @Post(&#39;/&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responsePage: ExampleDemo,</span></span>
<span class="line"><span>    summary: &#39;获取示例_Demo列表&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoList&#39;)</span></span>
<span class="line"><span>  async list(@Body() queryDto: ExampleDemoQueryDto) {</span></span>
<span class="line"><span>    return this.success(await this.exampleDemoService.list(queryDto));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>  @Get(&#39;/info/:id&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responseType: ExampleDemo,</span></span>
<span class="line"><span>    summary: &#39;根据id获取示例_Demo详情&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoEdit&#39;)</span></span>
<span class="line"><span>  async findOne(@Param(&#39;id&#39;) id: string) {</span></span>
<span class="line"><span>    const entity = await this.exampleDemoService.findOne(id);</span></span>
<span class="line"><span>    return this.success(entity);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>  @Post(&#39;/up/:id&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    responseType: ExampleDemo,</span></span>
<span class="line"><span>    summary: &#39;根据id更新示例_Demo详情&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoEdit&#39;)</span></span>
<span class="line"><span>  async update(@Param(&#39;id&#39;) id: string, @Body() updateDto: ExampleDemoUpdateDto) {</span></span>
<span class="line"><span>    return this.success(await this.exampleDemoService.update(id, updateDto));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //接口方法必须加async 方法的接口装饰器值必须/开头</span></span>
<span class="line"><span>  @Post(&#39;/del/:id&#39;)</span></span>
<span class="line"><span>  @ApiOperationResponse({</span></span>
<span class="line"><span>    summary: &#39;根据id删除示例_Demo信息&#39;,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  @AdminPermission(&#39;ExampleDemoDel&#39;)</span></span>
<span class="line"><span>  async delete(@Param(&#39;id&#39;) id: string) {</span></span>
<span class="line"><span>    await this.exampleDemoService.remove(id);</span></span>
<span class="line"><span>    return this.success();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="service" tabindex="-1">service <a class="header-anchor" href="#service" aria-label="Permalink to “service”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { InjectRepository, Transaction } from &#39;@/decorators/index.js&#39;;</span></span>
<span class="line"><span>import { Inject, Provide } from &#39;@midwayjs/core&#39;;</span></span>
<span class="line"><span>import { BadRequestError } from &#39;@midwayjs/core/dist/error/http.js&#39;;</span></span>
<span class="line"><span>import { MidwayI18nService } from &#39;@midwayjs/i18n&#39;;</span></span>
<span class="line"><span>import { Op } from &#39;@sequelize/core&#39;;</span></span>
<span class="line"><span>import { ExampleBook } from &#39;../../../../entities/exampleBook.entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemo } from &#39;../../../../entities/exampleDemo.entity.js&#39;;</span></span>
<span class="line"><span>import { User } from &#39;../../../../entities/user.entity.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoCreateDto } from &#39;../../dto/example/demoCreate.dto.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoQueryDto } from &#39;../../dto/example/demoQuery.dto.js&#39;;</span></span>
<span class="line"><span>import { ExampleDemoUpdateDto } from &#39;../../dto/example/demoUpdate.dto.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//示例_Demo</span></span>
<span class="line"><span>@Provide()</span></span>
<span class="line"><span>export class ExampleDemoService {</span></span>
<span class="line"><span>  @InjectRepository(ExampleDemo)</span></span>
<span class="line"><span>  exampleDemoRepository: typeof ExampleDemo;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Inject()</span></span>
<span class="line"><span>  i18nService: MidwayI18nService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //查询belongsTo关联模型user用户</span></span>
<span class="line"><span>  @InjectRepository(User)</span></span>
<span class="line"><span>  userRepository: typeof User;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 获取用户信息</span></span>
<span class="line"><span>   * @param queryDto</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async getUser(page: number, pageSize: number, id: string, username: string = &#39;&#39;) {</span></span>
<span class="line"><span>    const where = {};</span></span>
<span class="line"><span>    if (id) {</span></span>
<span class="line"><span>      where[&#39;id&#39;] = id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (username) {</span></span>
<span class="line"><span>      where[&#39;username&#39;] = { [Op.like]: &#39;%&#39; + username + &#39;%&#39; };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    const { count, rows } = await this.userRepository.findAndCountAll({</span></span>
<span class="line"><span>      where,</span></span>
<span class="line"><span>      offset: (page - 1) * pageSize,</span></span>
<span class="line"><span>      limit: pageSize,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      list: rows,</span></span>
<span class="line"><span>      total: count,</span></span>
<span class="line"><span>      page: page,</span></span>
<span class="line"><span>      pageSize: pageSize,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //查询belongsToMany关联模型books示例_书籍</span></span>
<span class="line"><span>  @InjectRepository(ExampleBook)</span></span>
<span class="line"><span>  exampleBookRepository: typeof ExampleBook;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 获取示例_书籍信息</span></span>
<span class="line"><span>   * @param queryDto</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async getExampleBook(page: number, pageSize: number, id: string, name: string = &#39;&#39;) {</span></span>
<span class="line"><span>    const where = {};</span></span>
<span class="line"><span>    if (id) {</span></span>
<span class="line"><span>      where[&#39;id&#39;] = id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (name) {</span></span>
<span class="line"><span>      where[&#39;name&#39;] = { [Op.like]: &#39;%&#39; + name + &#39;%&#39; };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    const { count, rows } = await this.exampleBookRepository.findAndCountAll({</span></span>
<span class="line"><span>      where,</span></span>
<span class="line"><span>      offset: (page - 1) * pageSize,</span></span>
<span class="line"><span>      limit: pageSize,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      list: rows,</span></span>
<span class="line"><span>      total: count,</span></span>
<span class="line"><span>      page: page,</span></span>
<span class="line"><span>      pageSize: pageSize,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 创建数据</span></span>
<span class="line"><span>   * @param createDto</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async create(createDto: ExampleDemoCreateDto) {</span></span>
<span class="line"><span>    const entity = await this.exampleDemoRepository.create(createDto);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (createDto.user) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setUser(createDto.user.id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (createDto.avatar) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setAvatar(createDto.avatar.id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (createDto.books) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setBooks(createDto.books.map((v) =&gt; v.id));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (createDto.files) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setFiles(createDto.files.map((v) =&gt; v.id));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return entity;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 列表分页查询</span></span>
<span class="line"><span>   * @param queryDto 查询条件</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async list(queryDto: ExampleDemoQueryDto) {</span></span>
<span class="line"><span>    const where = {};</span></span>
<span class="line"><span>    Object.keys(queryDto).forEach((key) =&gt; {</span></span>
<span class="line"><span>      if ([&#39;page&#39;, &#39;pageSize&#39;].includes(key)) {</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if ([null, undefined, &#39;&#39;].includes(queryDto[key])) {</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (key === &#39;startCreatedAt&#39;) {</span></span>
<span class="line"><span>        where[&#39;createdAt&#39;] = where[&#39;createdAt&#39;] ?? {};</span></span>
<span class="line"><span>        where[&#39;createdAt&#39;][Op.gte] = queryDto[key];</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (key === &#39;endCreatedAt&#39;) {</span></span>
<span class="line"><span>        where[&#39;createdAt&#39;] = where[&#39;createdAt&#39;] ?? {};</span></span>
<span class="line"><span>        where[&#39;createdAt&#39;][Op.lte] = queryDto[key];</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (key === &#39;startUpdatedAt&#39;) {</span></span>
<span class="line"><span>        where[&#39;updatedAt&#39;] = where[&#39;updatedAt&#39;] ?? {};</span></span>
<span class="line"><span>        where[&#39;updatedAt&#39;][Op.gte] = queryDto[key];</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (key === &#39;endUpdatedAt&#39;) {</span></span>
<span class="line"><span>        where[&#39;updatedAt&#39;] = where[&#39;updatedAt&#39;] ?? {};</span></span>
<span class="line"><span>        where[&#39;updatedAt&#39;][Op.lte] = queryDto[key];</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      where[key] = queryDto[key];</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    const { count, rows } = await this.exampleDemoRepository.findAndCountAll({</span></span>
<span class="line"><span>      where,</span></span>
<span class="line"><span>      offset: (queryDto.page - 1) * queryDto.pageSize,</span></span>
<span class="line"><span>      limit: queryDto.pageSize,</span></span>
<span class="line"><span>      include: [</span></span>
<span class="line"><span>        &#39;createdAdmin&#39;,</span></span>
<span class="line"><span>        &#39;updatedAdmin&#39;,</span></span>
<span class="line"><span>        &#39;books&#39;,</span></span>
<span class="line"><span>        &#39;user&#39;,</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          association: &#39;avatar&#39;,</span></span>
<span class="line"><span>          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          association: &#39;files&#39;,</span></span>
<span class="line"><span>          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>      order: [[&#39;createdAt&#39;, &#39;DESC&#39;]],</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      list: rows,</span></span>
<span class="line"><span>      total: count,</span></span>
<span class="line"><span>      page: queryDto.page,</span></span>
<span class="line"><span>      pageSize: queryDto.pageSize,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 根据主键获取一条信息</span></span>
<span class="line"><span>   * @param id 主键</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async findOne(id: string) {</span></span>
<span class="line"><span>    const entity = await this.exampleDemoRepository.findByPk(id, {</span></span>
<span class="line"><span>      include: [</span></span>
<span class="line"><span>        &#39;createdAdmin&#39;,</span></span>
<span class="line"><span>        &#39;updatedAdmin&#39;,</span></span>
<span class="line"><span>        &#39;books&#39;,</span></span>
<span class="line"><span>        &#39;user&#39;,</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          association: &#39;avatar&#39;,</span></span>
<span class="line"><span>          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          association: &#39;files&#39;,</span></span>
<span class="line"><span>          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    if (!entity) {</span></span>
<span class="line"><span>      throw new BadRequestError(this.i18nService.translate(&#39;没有对应的信息&#39;));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return entity;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 更新数据</span></span>
<span class="line"><span>   * @param id 主键</span></span>
<span class="line"><span>   * @param updateDto 数据对象</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async update(id: string, updateDto: ExampleDemoUpdateDto) {</span></span>
<span class="line"><span>    const entity = await this.exampleDemoRepository.findByPk(id);</span></span>
<span class="line"><span>    if (!entity) {</span></span>
<span class="line"><span>      throw new BadRequestError(this.i18nService.translate(&#39;没有对应的信息&#39;));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Object.assign(entity, updateDto);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (updateDto.user !== undefined) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setUser(updateDto.user?.id ?? null);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (updateDto.avatar !== undefined) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setAvatar(updateDto.avatar?.id ?? null);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (updateDto.books) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setBooks(updateDto.books.map((v) =&gt; v.id));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (updateDto.files) {</span></span>
<span class="line"><span>      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例</span></span>
<span class="line"><span>      await entity.setFiles(updateDto.files.map((v) =&gt; v.id));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return await entity.save();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 删除数据</span></span>
<span class="line"><span>   * @param id 主键</span></span>
<span class="line"><span>   * @returns</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  @Transaction()</span></span>
<span class="line"><span>  async remove(id: string) {</span></span>
<span class="line"><span>    const entity = await this.exampleDemoRepository.findByPk(id);</span></span>
<span class="line"><span>    if (!entity) {</span></span>
<span class="line"><span>      throw new BadRequestError(this.i18nService.translate(&#39;没有对应的信息&#39;));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    await entity.destroy();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,12)])])}const y=a(e,[["render",l]]);export{c as __pageData,y as default};
