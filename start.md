# 快速开始

## 依赖环境

- 存储数据库：PostgreSQL
- 缓存数据库：Redis
- 语言：nodejs>= 22.14.0
- 工具：pnpm 

::: warning
开始本项目前，请务必准备好相关环境，服务器推荐使用[宝塔服务器面板]( https://www.bt.cn/u/M6tROn)，一键全能部署及管理安装PostgreSQL、Redis
:::

## 快速启动

### 安装项目
执行命令 下面命令 根据提示数据配置选项即可！
```
pnpm create meadminjs
```

### 调试项目

- 在项目根目录执行 `pnpm dev`
- 后台访问 [http://127.0.0.1:7001/admin](http://127.0.0.1:7001/admin)
- 前台访问 [http://127.0.0.1:7001/](http://127.0.0.1:7001/)

### 默认账户

#### 后台
默认账户 admin
默认密码 meAdmin#202507!P

#### 前台
默认账户 test
默认密码 123456789


## 编写数据库实体文件

```
//src/entities/exampleDemo.entity.ts
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { BelongsManyModel, BelongsToModel } from '@/types/entity.js';
import { DataTypes, NonAttribute, Op } from '@sequelize/core';
import { Attribute, BelongsTo, BelongsToMany, Default, DeletedAt, Index, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';
import { ExampleBook } from './exampleBook.entity.js';
import { File } from './file.entity.js';
import { User } from './user.entity.js';

//rule规则使用添加接口的校验规则,建议字符串的默认值统一使用空串，否则RuleType.string需要显示声明allow(null)允许传入null
@Table({ tableName: 'example_demo', comment: '示例_Demo' })
//继承自DelParanoidModel则使用软删除。
export class ExampleDemo extends AdminBaseModel<ExampleDemo> {
  //自动生成的主键
  @Attribute({ type: DataTypes.STRING(20), allowNull: false })
  @PrimaryKey
  @Default(uuid)
  @ApiPropertyRule({ description: 'ID', rule: RuleType.string() })
  id: string;

  //唯一索引名称必须全库唯一，当两个null值时唯一索引会认为不是同一个值
  @Index({ unique: true, where: { deleted_at: { [Op.isNot]: null } } }) //局部唯一索引设置只有不删除的数据加索引
  @Attribute({ type: DataTypes.STRING(11), comment: '手机号' })
  @ApiPropertyRule({ description: '手机号', rule: RuleType.string().mobile().description('手机号').required() })
  mobile: string;

  //以“名称:值1=说明1;值2=说明2”，格式声明的备注会自动创建字典和下拉列表，并且支持number、string两种类型
  @Attribute({
    comment: '类型:0=书籍;1=电子产品;2=卡片',
    defaultValue: 0,
    allowNull: false,
    type: DataTypes.TINYINT.UNSIGNED,
  })
  @ApiPropertyRule({ description: '类型:0=书籍;1=电子产品;2=卡片', rule: RuleType.number().equal(0, 1, 2).required() })
  type: number;

  //ApiPropertyRule对RuleType规则做了封面，对于非必填的number和string自动允许null值，如果不允许null请设置required()或者设置invalid(null)
  //前端会根据rule生成表达校验，包括必填、类型(string、number)、mobile、email、min、max。
  @Attribute({ type: DataTypes.STRING(20), comment: '名称', allowNull: false, defaultValue: '' })
  @ApiPropertyRule({ description: '名称', rule: RuleType.string().max(20).min(1).required() })
  name: string;

  //多对多关联 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to-many/
  @BelongsToMany(() => ExampleBook, {
    through: 'example_demo_books', //中间表名称 或者 对应的Model，
    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决
    // 如果需要在ExampleBook定义反向关联可以添加参数  inverse: {as: 'demos',}, 并在 ExampleBook中添加 /** Declared by {@link Person.likedToots} */  declare demo?: NonAttribute<ExampleBook[]>;
  })
  @ApiPropertyRule({
    description: '书籍',
    type: 'array',
    items: {
      type: () => ExampleBook,
    },
    rule: RuleType.array().items(RuleType.object({ id: RuleType.string().required() })),
  })
  books?: NonAttribute<ExampleBook[]>;

  //反向BelongsTo关联从属， 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to/
  @Attribute({ type: DataTypes.STRING(20), comment: '关联前台用户id' })
  userId: string;
  @ApiPropertyRule({ description: '用户', type: () => User, rule: RuleType.object({ id: RuleType.string().required() }).pattern(RuleType.string(), RuleType.any()) })
  @BelongsTo(() => User, {
    foreignKey: 'userId', //外键名称
    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决
  })
  user?: NonAttribute<User>;

  //反向BelongsTo关联从属，File类型创建单文件
  @Attribute({ type: DataTypes.STRING(20), comment: '头像附件id' })
  avatarFileId: string;
  @ApiPropertyRule({ description: '头像', type: () => File, rule: RuleType.object({ id: RuleType.string().required() }).pattern(RuleType.string(), RuleType.any()) })
  @BelongsTo(() => File, {
    foreignKey: 'avatarFileId', //外键名称
    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决
  })
  avatar?: NonAttribute<File>;

  //BelongsTo多对多关联从属，File类型创建多文件选择
  @BelongsToMany(() => File, {
    through: 'example_demo_files', //中间表名称 或者 对应的Model，
    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决
  })
  @ApiPropertyRule({
    description: '附件',
    type: 'array',
    items: {
      type: () => File,
    },
    rule: RuleType.array().items(RuleType.object({ id: RuleType.string().required() })),
  })
  files?: NonAttribute<File[]>;

  @DeletedAt //设置为软删除
  @Attribute({ comment: '删除时间' })
  declare deletedAt: Date | null;
}
//声明自动关联方法
export declare interface ExampleDemo extends BelongsManyModel<'books', 'book', 'books', ExampleBook> {}
export declare interface ExampleDemo extends BelongsToModel<'user', User> {}
export declare interface ExampleDemo extends BelongsToModel<'avatar', File> {}
export declare interface ExampleDemo extends BelongsManyModel<'files', 'file', 'files', File> {}

```
::: danger
以下 meadmin 命令会读取数据库实体对应的 JS 文件，这些文件位于 dist/entities 目录中。
请注意：

- 在调试模式下`pnpm dev` 新增实体(会监听文件改动自动生成 JS 文件)；
- 或新增实体后已执行了 `pnpm dev`。

再运行下列命令。
:::


## 同步数据库结构

- `pnpm exec meadmin sync *`
- 或 `pnpm meadmin sync exampleDemo,systemAdmin,exampleBook,user,file` 定向同步exampleDemo文件（定向同步文件时，需将关联依赖全部罗列出来，一起同步）


## 一键生成crud

- `pnpm meadmin crud exampleDemo --menu`  --menu 参数代表数据库同步生成后台菜单

运行后会生成以下文件
```
src/app/admin/dto/example/demoCreate.dto.ts 后端新增dto校验文件
src/app/admin/dto/example/demoUpdate.dto.ts 后端更新dto校验文件
src/app/admin/dto/example/demoQuery.dto.ts 后端查询入参dto校验文件
src/app/admin/service/example/demo.service.ts 后端service
src/app/admin/controller/example/demo.controller.ts 后端 controller
view/admin/src/api/example/demo.ts  前端 api接口定义 
view/admin/src/views/example/demo/lang/en.json 前端组件语言包 
view/admin/src/views/example/demo/dict.ts 前端字典
view/admin/src/views/example/demo/index.vue 前端字典列表组件
view/admin/src/views/example/demo/components/info.vue 前端字典详情组件
view/admin/src/views/example/demo/components/addOrUp.vue 前端字典新增/修改组件
```