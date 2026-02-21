# 最佳实践
本项目推荐最佳实践，在数据库实体`entity`文件中声明所有属性、校验规则、及api文档。dto继承自`entity`文件，做相应处理。
## `entity`文件
```typescript
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


## 校验文件
```
import { OmitDtoType } from '@/helper/dto.js';
import { InferAttributesLoose } from '@/types/entity.js';
import { ExampleDemo } from '../../../../entities/exampleDemo.entity.js';

//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效
export class ExampleDemoCreateDto extends OmitDtoType(
  ExampleDemo as new () => InferAttributesLoose<ExampleDemo>, //只保留声明属性
  ['id', 'createdAt', 'updatedAt', 'deletedAt', 'createdAdminId', 'updatedAdminId', 'createdAdmin', 'updatedAdmin'], //排除自动创建的字段
) {}

```
```
import { ApiPropertyRule } from '@/decorators/index.js';
import { PageDto } from '@/dto/page.dto.js';
import { IntersectionType, PartialType } from '@/helper/dto.js';
import { RuleType } from '@/ruleType/index.js';
import { InferAttributesLoose } from '@/types/entity.js';
import { ExampleDemo } from '../../../../entities/exampleDemo.entity.js';

//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效
export class ExampleDemoQueryDto extends IntersectionType(PageDto, PartialType(ExampleDemo as new () => InferAttributesLoose<ExampleDemo>)) {
  @ApiPropertyRule({ description: '创建时间(起)', rule: RuleType.date() })
  startCreatedAt?: Date;

  @ApiPropertyRule({ description: '创建时间(止)', rule: RuleType.date() })
  endCreatedAt?: Date;
  @ApiPropertyRule({ description: '最后更新时间(起)', rule: RuleType.date() })
  startUpdatedAt?: Date;

  @ApiPropertyRule({ description: '最后更新时间(止)', rule: RuleType.date() })
  endUpdatedAt?: Date;
}

```
```
import { OmitDtoType, PartialType } from '@/helper/dto.js';
import { InferAttributesLoose } from '@/types/entity.js';
import { ExampleDemo } from '../../../../entities/exampleDemo.entity.js';

//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效
export class ExampleDemoUpdateDto extends PartialType(
  OmitDtoType(
    ExampleDemo as new () => InferAttributesLoose<ExampleDemo>, //只保留声明属性
    ['id', 'createdAt', 'updatedAt', 'deletedAt', 'createdAdminId', 'updatedAdminId', 'createdAdmin', 'updatedAdmin'], //排除自动创建的字段
  ),
) {}

```
## 控制器
```
import { AdminPermission, ApiOperationResponse } from '@/decorators/index.js';
import { Body, Controller, Get, Inject, Param, Post } from '@midwayjs/core';
import { ExampleDemo } from '../../../../entities/exampleDemo.entity.js';
import { ExampleDemoCreateDto } from '../../dto/example/demoCreate.dto.js';
import { ExampleDemoQueryDto } from '../../dto/example/demoQuery.dto.js';
import { ExampleDemoUpdateDto } from '../../dto/example/demoUpdate.dto.js';
import { ExampleDemoService } from '../../service/example/demo.service.js';
import { BaseController } from '../base.controller.js';

/**
 * 为了防止防火墙禁止PUT、DELETE请求，方便传参，除详情外统一使用post请求。
 * meadmin对controller做了装饰器继承封装，当以/开头时会使用当前controller前缀地址，不以/开头时会递归继承controller前缀地址
 */
@Controller('example/demo')
export class ExampleDemoController extends BaseController {
  @Inject()
  exampleDemoService: ExampleDemoService;

  //查询belongsTo关联模型user用户
  //获取用户信息
  @Post('/getUser')
  @ApiOperationResponse({
    responseType: ExampleDemo,
    summary: '查询用户信息',
  })
  @AdminPermission('ExampleDemoList')
  async getUser(@Body('id') id: string, @Body('username') username: string, @Body('page') page = 1, @Body('pageSize') pageSize = 10) {
    return this.success(await this.exampleDemoService.getUser(page, pageSize, id, username));
  }

  //查询belongsToMany关联模型books示例_书籍
  //获取示例_书籍信息
  @Post('/getExampleBook')
  @ApiOperationResponse({
    responseType: ExampleDemo,
    summary: '查询示例_书籍信息',
  })
  @AdminPermission('ExampleDemoList')
  async getExampleBook(@Body('id') id: string, @Body('name') name: string, @Body('page') page = 1, @Body('pageSize') pageSize = 10) {
    return this.success(await this.exampleDemoService.getExampleBook(page, pageSize, id, name));
  }

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Post('/add')
  @ApiOperationResponse({
    responseType: ExampleDemo,
    summary: '添加示例_Demo信息',
  })
  @AdminPermission('ExampleDemoAdd')
  async add(@Body() createDto: ExampleDemoCreateDto) {
    return this.success(await this.exampleDemoService.create(createDto));
  }

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Post('/')
  @ApiOperationResponse({
    responsePage: ExampleDemo,
    summary: '获取示例_Demo列表',
  })
  @AdminPermission('ExampleDemoList')
  async list(@Body() queryDto: ExampleDemoQueryDto) {
    return this.success(await this.exampleDemoService.list(queryDto));
  }

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Get('/info/:id')
  @ApiOperationResponse({
    responseType: ExampleDemo,
    summary: '根据id获取示例_Demo详情',
  })
  @AdminPermission('ExampleDemoEdit')
  async findOne(@Param('id') id: string) {
    const entity = await this.exampleDemoService.findOne(id);
    return this.success(entity);
  }

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Post('/up/:id')
  @ApiOperationResponse({
    responseType: ExampleDemo,
    summary: '根据id更新示例_Demo详情',
  })
  @AdminPermission('ExampleDemoEdit')
  async update(@Param('id') id: string, @Body() updateDto: ExampleDemoUpdateDto) {
    return this.success(await this.exampleDemoService.update(id, updateDto));
  }

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Post('/del/:id')
  @ApiOperationResponse({
    summary: '根据id删除示例_Demo信息',
  })
  @AdminPermission('ExampleDemoDel')
  async delete(@Param('id') id: string) {
    await this.exampleDemoService.remove(id);
    return this.success();
  }
}

```

## service
```
import { InjectRepository, Transaction } from '@/decorators/index.js';
import { Inject, Provide } from '@midwayjs/core';
import { BadRequestError } from '@midwayjs/core/dist/error/http.js';
import { MidwayI18nService } from '@midwayjs/i18n';
import { Op } from '@sequelize/core';
import { ExampleBook } from '../../../../entities/exampleBook.entity.js';
import { ExampleDemo } from '../../../../entities/exampleDemo.entity.js';
import { User } from '../../../../entities/user.entity.js';
import { ExampleDemoCreateDto } from '../../dto/example/demoCreate.dto.js';
import { ExampleDemoQueryDto } from '../../dto/example/demoQuery.dto.js';
import { ExampleDemoUpdateDto } from '../../dto/example/demoUpdate.dto.js';

//示例_Demo
@Provide()
export class ExampleDemoService {
  @InjectRepository(ExampleDemo)
  exampleDemoRepository: typeof ExampleDemo;

  @Inject()
  i18nService: MidwayI18nService;

  //查询belongsTo关联模型user用户
  @InjectRepository(User)
  userRepository: typeof User;

  /**
   * 获取用户信息
   * @param queryDto
   * @returns
   */
  @Transaction()
  async getUser(page: number, pageSize: number, id: string, username: string = '') {
    const where = {};
    if (id) {
      where['id'] = id;
    }
    if (username) {
      where['username'] = { [Op.like]: '%' + username + '%' };
    }
    const { count, rows } = await this.userRepository.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return {
      list: rows,
      total: count,
      page: page,
      pageSize: pageSize,
    };
  }

  //查询belongsToMany关联模型books示例_书籍
  @InjectRepository(ExampleBook)
  exampleBookRepository: typeof ExampleBook;

  /**
   * 获取示例_书籍信息
   * @param queryDto
   * @returns
   */
  @Transaction()
  async getExampleBook(page: number, pageSize: number, id: string, name: string = '') {
    const where = {};
    if (id) {
      where['id'] = id;
    }
    if (name) {
      where['name'] = { [Op.like]: '%' + name + '%' };
    }
    const { count, rows } = await this.exampleBookRepository.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    return {
      list: rows,
      total: count,
      page: page,
      pageSize: pageSize,
    };
  }

  /**
   * 创建数据
   * @param createDto
   * @returns
   */
  @Transaction()
  async create(createDto: ExampleDemoCreateDto) {
    const entity = await this.exampleDemoRepository.create(createDto);

    if (createDto.user) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setUser(createDto.user.id);
    }

    if (createDto.avatar) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setAvatar(createDto.avatar.id);
    }

    if (createDto.books) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setBooks(createDto.books.map((v) => v.id));
    }

    if (createDto.files) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setFiles(createDto.files.map((v) => v.id));
    }

    return entity;
  }

  /**
   * 列表分页查询
   * @param queryDto 查询条件
   * @returns
   */
  @Transaction()
  async list(queryDto: ExampleDemoQueryDto) {
    const where = {};
    Object.keys(queryDto).forEach((key) => {
      if (['page', 'pageSize'].includes(key)) {
        return;
      }
      if ([null, undefined, ''].includes(queryDto[key])) {
        return;
      }
      if (key === 'startCreatedAt') {
        where['createdAt'] = where['createdAt'] ?? {};
        where['createdAt'][Op.gte] = queryDto[key];
        return;
      }
      if (key === 'endCreatedAt') {
        where['createdAt'] = where['createdAt'] ?? {};
        where['createdAt'][Op.lte] = queryDto[key];
        return;
      }
      if (key === 'startUpdatedAt') {
        where['updatedAt'] = where['updatedAt'] ?? {};
        where['updatedAt'][Op.gte] = queryDto[key];
        return;
      }
      if (key === 'endUpdatedAt') {
        where['updatedAt'] = where['updatedAt'] ?? {};
        where['updatedAt'][Op.lte] = queryDto[key];
        return;
      }
      where[key] = queryDto[key];
    });
    const { count, rows } = await this.exampleDemoRepository.findAndCountAll({
      where,
      offset: (queryDto.page - 1) * queryDto.pageSize,
      limit: queryDto.pageSize,
      include: [
        'createdAdmin',
        'updatedAdmin',
        'books',
        'user',
        {
          association: 'avatar',
          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)
        },
        {
          association: 'files',
          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return {
      list: rows,
      total: count,
      page: queryDto.page,
      pageSize: queryDto.pageSize,
    };
  }

  /**
   * 根据主键获取一条信息
   * @param id 主键
   * @returns
   */
  @Transaction()
  async findOne(id: string) {
    const entity = await this.exampleDemoRepository.findByPk(id, {
      include: [
        'createdAdmin',
        'updatedAdmin',
        'books',
        'user',
        {
          association: 'avatar',
          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)
        },
        {
          association: 'files',
          attributes: { exclude: [] }, //必须设置attributes，否则file的附件属性 url属性返回给前端时没有，已提交[BUG反馈](https://github.com/sequelize/sequelize/issues/18059)
        },
      ],
    });
    if (!entity) {
      throw new BadRequestError(this.i18nService.translate('没有对应的信息'));
    }
    return entity;
  }

  /**
   * 更新数据
   * @param id 主键
   * @param updateDto 数据对象
   * @returns
   */
  @Transaction()
  async update(id: string, updateDto: ExampleDemoUpdateDto) {
    const entity = await this.exampleDemoRepository.findByPk(id);
    if (!entity) {
      throw new BadRequestError(this.i18nService.translate('没有对应的信息'));
    }
    Object.assign(entity, updateDto);

    if (updateDto.user !== undefined) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setUser(updateDto.user?.id ?? null);
    }

    if (updateDto.avatar !== undefined) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setAvatar(updateDto.avatar?.id ?? null);
    }

    if (updateDto.books) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setBooks(updateDto.books.map((v) => v.id));
    }

    if (updateDto.files) {
      //关联模型用主键进行设置，用对象设置时必须确保对象为模型model的实例
      await entity.setFiles(updateDto.files.map((v) => v.id));
    }

    return await entity.save();
  }

  /**
   * 删除数据
   * @param id 主键
   * @returns
   */
  @Transaction()
  async remove(id: string) {
    const entity = await this.exampleDemoRepository.findByPk(id);
    if (!entity) {
      throw new BadRequestError(this.i18nService.translate('没有对应的信息'));
    }
    await entity.destroy();
  }
}

```