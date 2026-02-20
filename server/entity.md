# 数据库
数据库使用postgresql,连接框架使用seqlize@7,相关配置在`src/database.ts`中，`src/database.ts`加载了env环境变量，如需配置数据库连接方式可直接更改`.env`文件的相关配置。注意:本项目自行封装使用的seqlize@7，未使用`@midwayjs/sequelize@3`组件。

相关使用方式如下：

## 模型定义

### 1、创建 Model（Entity）

我们通过模型和数据库关联，在应用中的模型就是数据库表，在 Sequelize 中，模型是和实体绑定的，每一个实体（Entity) 文件，即是 Model，也是实体（Entity）。
所有的实体存储在`src/entities`文件夹和数据库表想对应。
在示例中，需要一个实体，我们这里拿 ExampleBook 举例。在`src/entities`文件夹添加实体文件 `exampleBook.entity.ts` ，一个简单的实体如下。

```typescript
// src/entities/exampleBook.entity.ts
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { DataTypes } from '@sequelize/core';
import { Attribute, Default, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';

@Table({ tableName: 'example_book', comment: '示例_书籍' })
export class ExampleBook extends AdminBaseModel<ExampleBook> {
  //自动生成的主键
  @Attribute({ type: DataTypes.STRING(20), allowNull: false })
  @PrimaryKey
  @Default(uuid)
  id: string;

  @Attribute({ type: DataTypes.STRING(20), comment: '名称', allowNull: false, defaultValue: '' })
  name: string;
}

```

- 管理后台的表需继承AdminBaseModel，会自动创建 和维护`createdAdminId`、`updatedAdminId`、`createdAt`、`updatedAt`，相关内容是在Hooks钩子中维护的，如执行自定义sql需手动维护相关值。
- 前台表需继承IndexBaseModel，会自动创建 和维护`createdAdminId`、`updatedAdminId`、`createdAt`、`updatedAt`，相关内容是在Hooks钩子中维护的，如执行自定义sql需手动维护相关值。
- @Table 装饰器可以在不传递任何参数的情况下使用，本项目约定，数据库表名使用下划线方式命名，`seqlize`默认会使用复数形式命名表名，本项目推荐手动传入tableName、comment定义表名和备注。更多参数请查看[seqlize 文档](https://sequelize.org/docs/v7/models/naming-strategies/) 。 

### 2、 主键

@PrimaryKey 定义主键，`postgresql`不支持自增主键，如想实现需通过自增序列实现，但迁移时比较麻烦。本项目推荐使用自定义函数`uuid`维护string类型主键，方式为`@Default(uuid)``@Attribute({ type: DataTypes.STRING(20), allowNull: false })`。

```typescript
// src/entities/exampleBook.entity.ts
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { DataTypes } from '@sequelize/core';
import { Attribute, Default, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';

@Table({ tableName: 'example_book', comment: '示例_书籍' })
export class ExampleBook extends AdminBaseModel<ExampleBook> {
  //自动生成的主键
  @Attribute({ type: DataTypes.STRING(20), allowNull: false })
  @PrimaryKey
  @Default(uuid)
  id: string;
}

```
### 3、时间列
主要指代的是 `@CreatedAt`, `@UpdatedAt`, `@DeletedAt` 单个装饰器标注的列。
比如：
```typescript
import { InferCreationAttributes, InferAttributes, Model, CreationOptional } from '@sequelize/core';
import { CreatedAt, UpdatedAt, DeletedAt, Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'example_book', comment: '示例_书籍' })
export class ExampleBook extends Model<InferAttributes<ExampleBook>, InferCreationAttributes<ExampleBook>> {
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date | null;
}
```
|装饰器|	描述|
| --   | --   |
|@CreatedAt|	会设置 自动维护的创建时间字段|
|@UpdatedAt|	会设置 自动维护的更新时间字段|
|@DeletedAt|	会设置 自动维护的删除时间字段，值为非null的记录会被识别为逻辑删除|

如果继承`AdminBaseModel`或`IndexBaseModel`会自动继承`createdAt`和`updatedAt`字段，无需手动维护。`deletedAt`按需求自行维护。

### 4、普通列
`@Column` 装饰器用于标注普通列，需要在参数中传入类型和备注。
```typescript
// src/entities/exampleBook.entity.ts
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { DataTypes } from '@sequelize/core';
import { Attribute, Default, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';

@Table({ tableName: 'example_book', comment: '示例_书籍' })
export class ExampleBook extends AdminBaseModel<ExampleBook> {
  //自动生成的主键
  @Attribute({ type: DataTypes.STRING(20), allowNull: false })
  @PrimaryKey
  @Default(uuid)
  id: string;

  @Attribute({ type: DataTypes.STRING(20), comment: '名称', allowNull: false, defaultValue: '' })
  name: string;
}

```
更多类型请，参考[seqlize 文档](https://sequelize.org/docs/v7/models/data-types/)

## 数据源配置
我们支持多库数据源配置 在`src/config/database.ts`中配置
```typescript
import { importModels, Options } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { appLogger } from '../logger.js';
export default async () => ({
  dataSource: {
    default: {
      dialect: PostgresDialect,
      host: process.env.DATABASE_HOST ?? '127.0.0.1',
      port: process.env.DATABASE_PORT ?? 5342,
      database: process.env.DATABASE_DB ?? 'meadmin',
      user: process.env.DATABASE_USER ?? 'root',
      password: process.env.DATABASE_PASSWORD ?? 'root',
      client_encoding: 'utf8',
      models: await importModels((import.meta.dirname + '/../**/*.entity.js').replace(/\\/g, '/')), // 支持如下的扫描形式，或实体形式[User,Admin]
      options: `-c search_path=${process.env.DATABASE_SCHEMA}`, //设置模式查询顺序
      define: {
        underscored: true, //强制表名和列名转换为snake_case
        freezeTableName: true, //强制模型名称不变换（取消表名的单词复数转换和snake_case转换)
        timestamps: false, // 禁用createAt和updateAt的自动声明
        noPrimaryKey: true, //禁止自动创建主键id
        schema: process.env.DATABASE_SCHEMA ?? 'public',
        timezone: 'Asia/Shanghai',
      },
      logging(sql, timing, seqlize?) {
        appLogger.info('[sql]耗时 %d ms，%s', timing, sql, seqlize?.bind);
      },
      benchmark: true, //开启日志打印sql耗时参数传递
    } as Options<PostgresDialect>,
  },
  // 第二个数据源
  default2: {
    // ...
  },
});
```
使用时
```typescript
import { InjectRepository, Transaction } from '@/decorators/index.js';
import { Provide } from '@midwayjs/core';
import { BadRequestError } from '@midwayjs/core/dist/error/http.js';
import { User } from '../../../entities/user.entity.js';

//用户
@Provide()
export class UserService {
  @InjectRepository(User)//声明entity,默认加载default数据源相当于@InjectRepository(User,'default')
  userRepository: typeof User;
 
  /**
   * 根据主键获取一条信息
   * @param id 主键
   * @returns
   */
  @Transaction()
  async findOne(id: string) {
    const entity = await this.userRepository.findByPk(id, {
      include: [
        'createdUser'
      ],
    });
    if (!entity) {
      throw new BadRequestError('没有对应的信息');
    }
    return entity;
  }

  
}
```
## 模型关联
可以通过 `@HasMany` 、`@HasOne` 、`@BelongsTo`、`@BelongsToMany` 装饰器在模型中直接描述关系。
### 1、一对多或一对一从属
```typescript
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { BelongsToModel } from '@/types/entity.js';
import { DataTypes, NonAttribute } from '@sequelize/core';
import { Attribute, BelongsTo, Default, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';
import { User } from './user.entity.js';

@Table({ tableName: 'example_demo', comment: '示例_Demo' })
//继承自DelParanoidModel则使用软删除。
export class ExampleDemo extends AdminBaseModel<ExampleDemo> {
  //自动生成的主键
  @Attribute({ type: DataTypes.STRING(20), allowNull: false })
  @PrimaryKey
  @Default(uuid)
  @ApiPropertyRule({ description: 'ID', rule: RuleType.string() })
  id: string;

   //ApiPropertyRule对RuleType规则做了封面，对于非必填的number和string自动允许null值，如果不允许null请设置required()或者设置invalid(null)
  //前端会根据rule生成表达校验，包括必填、类型(string、number)、mobile、email、min、max。
  @Attribute({ type: DataTypes.STRING(20), comment: '名称', allowNull: false, defaultValue: '' })
  name: string;

  //反向BelongsTo关联从属， 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to/
  @Attribute({ type: DataTypes.STRING(20), comment: '关联前台用户id' })
  userId: string;
 
  @BelongsTo(() => User, {
    foreignKey: 'userId', //外键名称
    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决
  })
  user?: NonAttribute<User>;
}
//声明自动关联方法
export declare interface ExampleDemo extends BelongsToModel<'user', User> {}
```
`sequelize-typescript` 会在内部进行关联，会自动查询出相关的依赖。
```typescript
 const entity = await this.userRepository.findByPk(id, {
      include: ['user'],
    });
```
### 多对多

```typescript
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { BelongsManyModel } from '@/types/entity.js';
import { DataTypes, NonAttribute } from '@sequelize/core';
import { Attribute, BelongsToMany, Default, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';
import { ExampleBook } from './exampleBook.entity.js';

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
}
//声明自动关联方法
export declare interface ExampleDemo extends BelongsManyModel<'books', 'book', 'books', ExampleBook> {}

```
BelongsToMany 关联会自动在目标模型上创建逆关联，目标模型也是一个 BelongsToMany 关联。您可以通过使用反向选项自定义反关联：

```typescript
import { ApiPropertyRule } from '@/decorators/index.js';
import { uuid } from '@/helper/snowflake.js';
import { RuleType } from '@/ruleType/index.js';
import { BelongsManyModel } from '@/types/entity.js';
import { DataTypes, NonAttribute } from '@sequelize/core';
import { Attribute, BelongsToMany, Default, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';
import { AdminBaseModel } from './abstract/adminBase.entity.js';
import { ExampleBook } from './exampleBook.entity.js';

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


  //ApiPropertyRule对RuleType规则做了封面，对于非必填的number和string自动允许null值，如果不允许null请设置required()或者设置invalid(null)
  //前端会根据rule生成表达校验，包括必填、类型(string、number)、mobile、email、min、max。
  @Attribute({ type: DataTypes.STRING(20), comment: '名称', allowNull: false, defaultValue: '' })
  @ApiPropertyRule({ description: '名称', rule: RuleType.string().max(20).min(1).required() })
  name: string;

  //多对多关联 文档 可参考https://sequelize.org/docs/v7/associations/belongs-to-many/
  @BelongsToMany(() => ExampleBook, {
    through: 'example_demo_books', //中间表名称 或者 对应的Model，
    foreignKeyConstraints: false, //数据库不创建外键，外键应用层解决
    inverse: {as: 'demos',},
    // 如果需要在ExampleBook定义反向关联可以添加参数  inverse: {as: 'demos',}, 并在 ExampleBook中添加 /** Declared by {@link Person.likedToots} */  declare demo?: NonAttribute<ExampleBook[]>;
  })
  books?: NonAttribute<ExampleBook[]>;
}
//声明自动关联方法
export declare interface ExampleDemo extends BelongsManyModel<'books', 'book', 'books', ExampleBook> {}

```
```typescript
import { NonAttribute } from "@sequelize/core";
import { AdminBaseModel } from "./abstract/adminBase.entity.js";
import { ExampleDemo } from "./exampleDemo.entity.js";

export class ExampleBook extends AdminBaseModel<ExampleBook> {
  /** Declared by {@link ExampleDemo.books} */
  declare demos?: NonAttribute<ExampleDemo[]>;
}
```
`sequelize-typescript` 会在内部进行关联，会自动查询出相关的依赖。
```typescript
 const entity = await this.exampleDemoRepository.findByPk(id, {
      include: ['books'],
    });
```
更多文档请参考[seqlize 文档](https://sequelize.org/docs/v7/associations/belongs-to-many/)
### 3、模型循环依赖
如果你使用了 `@BelongsTo` 装饰器定义双向依赖时，很容易触发一个模型循环依赖的错误，比如：
```typescript
ReferenceError: Cannot access 'User' before initialization 
```
这是因为“emitDecoratorMetadata”在类初始化时会添加对另一个类的引用。
既然是循环导入，这样做必然会导致你遇到的错误。

解决办法是只在一侧声明关联。反面可以用 `inverse` property 性质声明
你还需要将用户导入标记为导入类型：

```typescript
//joke.js
import { DataTypes, Model,InferAttributes,InferCreationAttributes,CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo } from '@sequelize/core/decorators-legacy';
import type { User } from './user.js';//注意使用type引用
  
export class Joke extends Model<InferAttributes<Joke>, InferCreationAttributes<Joke>> 
{
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare content: string;

-   @BelongsTo(() => User, 'userId')
    user!: User;
    
    // This is the foreign key
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare userId: number;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
```
```typescript
//user.js
import { DataTypes,Model,InferAttributes,InferCreationAttributes,CreationOptional, NonAttribute } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany } from '@sequelize/core/decorators-legacy';
import { Joke } from './joke.js';
  
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> 
{
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    declare email: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    @HasMany(() => Joke, { foreignKey: 'userId', inverse: 'user' })
    declare jokes?: NonAttribute<Joke[]>;
}

```
相关参考[github](https://github.com/sequelize/sequelize/issues/17444)





