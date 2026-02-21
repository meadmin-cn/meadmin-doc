# 校验和Swagger文档
## 校验
我们经常要在方法调用时执行一些类型检查，参数转换的操作，本项目利用dto文件结合`Midway`的`@midwayjs/validate@3`组件，提供了一种简单的能力来快速检查参数的类型，这个能力来源于 `joi` 。

### 背景
最常用参数校验的地方是 控制器（Controller），同时你也可以在任意的 Class 中使用这个能力。

我们以控制器（Controller）中使用为例，还是那个 user。
普通情况下，我们从 body 上拿到所有 Post 结果，并进行一些校验。
```
// src/interface.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

// src/controller/home.ts
import { Controller, Get, Provide } from '@midwayjs/core';

@Controller('/api/user')
export class HomeController {
  @Post('/')
  async updateUser(@Body() user: User) {
    if (!user.id || typeof user.id !== 'number') {
      throw new Error('id error');
    }

    if (user.age <= 30) {
      throw new Error('age not match');
    }
    // xxx
  }
}
```
如果每个方法都需要这么校验，会非常的繁琐。

针对这种情况， 配合 `@Validate` 和 `@Rule` 装饰器，用来 快速定义校验的规则，帮助用户 减少这些重复的代码。
### 创建校验文件
本项目校验文件为dto 类,统一放在模块的`dto`文件夹
```
//src/app/admin/dto/loginParam.dto.ts
import { ApiPropertyRule } from '@/decorators/index.js';
import { RuleType } from '@midwayjs/validate';

export class LoginParamDto {
  @ApiPropertyRule({ description: '用户名', rule: RuleType.string().max(10).min(1).required() })
  username: string;
  @ApiPropertyRule({ description: '密码', rule: RuleType.string().required() })
  password: string;
  @ApiPropertyRule({ description: '验证码标识', rule: RuleType.string().required()})
  captchaId: string;
  @ApiPropertyRule({ description: '验证码', rule: RuleType.string().required() })
  captcha: string;
}

```
由于这个类属于一个 PlainObject ，也不需要被依赖注入管理，我们不需要提供 @Provide 装饰器。

这个 `LoginParamDto` Class 提供了三个属性和他们对应的校验规则。

- username 一个必填的字符串类型,长度在1-10之间

- password 一个必填的字符串类型

- captchaId 一个必填的字符串类型

- captcha 一个必填的字符串类型

不同于`midway`用`@Rule`装饰器修饰需要被校验的属性，本项目声明了`@ApiPropertyRule`装饰器，它封装了`swagger`的`@ApiProperty`装饰器和`validate`的`Rule`装饰器，它的参数为rule,接受一个 RuleType 对象提供的校验规则的链式方法。
`@ApiPropertyRule` 针对日常应用还做了以下处理
- 将 空串视为空而不是无效值,否则空串会被 stripUnknown 配置 视为无效值处理掉
- 如果不是必填值，允许null
- 自动将 `RuleType` 的 required规则赋值给`@ApiProperty`装饰器
- 自动将maximum、minimum、minLength、maxLength、enmu赋值给`RuleType`
- 自动将`description`添加为 `RuleType`的`label`用于多语言

### 使用校验文件
定义完类型之后，就可以直接在业务代码中使用了。

```
import { ApiOperationResponse } from '@/decorators/swagger.js';
import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LoginParamDto } from '../dto/loginParam.dto.js';
import { LoginResultDto } from '../dto/loginResult.dto.js';
import { LoginService } from '../service/login.serveice.js';
import { BaseController } from './base.controller.js';

@Controller('login')
export class LoginController extends BaseController {
  @Inject()
  loginService: LoginService;

  @Inject()
  ctx: Context;

  @Post('/login')
  @ApiOperationResponse({
    responseType: LoginResultDto,
    summary: '登录',
  })
  async login(@Body() param: LoginParamDto) {
    return this.success(await this.loginService.login(param.username, param.password, this.ctx));
  }
}
```
### 从原有 DTO 创建新 DTO
有时候，我们会希望从某个 DTO 中获取一部分属性，变成一个新的 DTO 类。

本项目 提供了 `PickDtoType` `OmitDtoType` `PartialType` `RequiredType` `IntersectionType` 五个方法根据现有的的 DTO 类型创建新的 DTO。请注意这些函数从`@/helper/dto.js`导出。

PickDto 用于从现有的 DTO 中获取一些属性，变成新的 DTO，而 OmitDto 用于将其中某些属性剔除，PartialType  将属性设置为可选，RequiredType 将属性设置为必填， IntersectionType 将两种类型合并为一种新类型,结合了两种类型的所有属性。比如：
```typescript
import { OmitDtoType } from '@/helper/dto.js';
import { InferAttributesLoose } from '@/types/entity.js';
import { File } from '../../../entities/file.entity.js';

//dto参数校验继承 entity必须使用 PickDtoType|OmitDtoType|PartialType|RequiredType|IntersectionType 之一 否则不会生效
export class FileCreateDto extends OmitDtoType(
  File as new () => InferAttributesLoose<File>, //只保留声明属性
  ['id', 'createdAt', 'updatedAt', 'url', 'createdAdminId', 'updatedAdminId'], //排除自动创建的属性
) {}
```
### 配置
配置文件在src/config/config.default.ts中，默认开启了以下配置
```
  validate: {
    validationOptions: {
      allowUnknown: false, // 全局生效 允许未定义的字段
      convert: true, // 当为true时，尝试将值转换为所需的类型（例如，将字符串转换为数字.
      stripUnknown: true, // 全局生效,移除多余的字段
    },
  },
```
更多说明请参考[midway](https://midwayjs.org/docs/extensions/validate)和[joi](https://joi.dev/api/)文档
## swagger文档
swagger 基于`@midwayjs/swagger@3 `只做了`@ApiPropertyRule`的封装，`@ApiPropertyRule`可接受`@ApiProperty`的全部参数

### 开启组件
在 configuration.ts 中增加组件。
```
import { Configuration } from '@midwayjs/core';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [
    // ...
    swagger
  ]
})
export class MainConfiguration {

}
```
可以配置启用的环境，比如下面的代码指的是 只在 local 环境下启用。本项目已默认在local和dev环境下开启
```
import { Configuration } from '@midwayjs/core';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [
    // ...
    {
      component: swagger,
      enabledEnvironment: ['local']
    }
  ]
})
export class MainConfiguration {

}
```
然后启动项目，访问地址：

UI: [http://127.0.0.1:7001/swagger-ui/index.html](http://127.0.0.1:7001/swagger-ui/index.html)

JSON: [http://127.0.0.1:7001/swagger-ui/index.json](http://127.0.0.1:7001/swagger-ui/index.json)
路径可以通过 swaggerPath 参数配置。

### 数据类型
自动类型提取
Swagger 组件会识别各个 @Controller 中每个路由方法的 @Body()、@Query()、@Param() 装饰器，提取路由方法参数和类型。

比如下面的代码：
```typescript
@Get('/')
async home(
  @Query('uid') uid: number,
  @Query('tid') tid: string,
  @Query('isBoolean') isBoolean: boolean,
) {
    // ...
}
```
会自动提取相关参数生成文档。
### Schema
本项目推荐使用dto文件参数使用对象，并使用定义好的类作为类型，这个时候 swagger 组件也能自动识别，同时也能和普通的类型进行组合识别。

比如下面的代码：
```
@Post('/:id', { summary: 'test'})
async create(@Body() LoginParamDto: LoginParamDto, @Param('id') id: number) {
  // ...
}
```
CreateCatDto 类型的定义如下，我们使用 ApiPropertyRule 将其中的每个属性都进行了定义。
```
import { ApiPropertyRule } from '@/decorators/index.js';
import { RuleType } from '@midwayjs/validate';

export class LoginParamDto {
  @ApiPropertyRule({ description: '用户名', rule: RuleType.string().max(10).min(1).required().empty('') })
  username: string;
  @ApiPropertyRule({ description: '密码', rule: RuleType.string().required().empty('') })
  password: string;
  @ApiPropertyRule({ description: '验证码标识', rule: RuleType.string().required().empty('') })
  captchaId: string;
  @ApiPropertyRule({ description: '验证码', rule: RuleType.string().required().empty('') })
  captcha: string;
}

```
详细的类型参考请查阅 [midway文档](https://midwayjs.org/docs/extensions/swagger)

### 循环依赖
当类之间具有循环依赖关系时，请使用惰性函数提供类型信息。

比如 type 字段的循环。
```
class Photo {
  // ...
  @ApiProperty({
    type: () => Album
  })
  album: Album;
}
class Album {
  // ...
  @ApiProperty({
    type: () => Photo
  })
  photo: Photo;
}
```

getSchemaPath 也可以使用。
```
export class CreateCatDto {
  // ...

  @ApiProperty({
    type: 'array',
    items: {
      $ref: () => getSchemaPath(Cat)
    }
  })
  relatedList: Cat[];
}
```
### 请求 Response
本项目封装了`@ApiOperationResponse({...})` 来自定义请求 Response,单条数据获取传入`responseType`参数，分页列表获取传入`responsePage`参数。
```
@Get('/:id')
@ApiOperationResponse({
  responseType: User,
  summary: '用户信息',
})
findOne(@Param('id') id: string, @Query('test') test: any): Cat {
  return this.catsService.findOne(+id);
}
```
```
//接口方法必须加async 方法的接口装饰器值必须/开头
@Post('/')
@ApiOperationResponse({
  responsePage: User,
  summary: '获取用户列表',
})
@AdminPermission('UserList')
async list(@Body() queryDto: UserQueryDto) {
  return this.success(await this.userService.list(queryDto));
}
```
