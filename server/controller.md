# 路由和控制器
在常见的 MVC 架构中，C 即代表控制器，控制器用于负责 解析用户的输入，处理后返回相应的结果。

更多内容请阅读[midway 路由和控制器](https://midwayjs.org/docs/controller)文档。

## 定义路由可控制器
用@Controller装饰器声明控制器类，@Get 、 @Post 、 @Put() 、 @Del() 、 @Patch() 、 @Options() 、 @Head() 和 @All()，表示各自的 HTTP 请求方法，声明路由方法。@All 装饰器比较特殊，表示能接受以上所有类型的 HTTP Method。midway 会自动扫描项目目录下的所有@Controller类进行路由注册。
```
import { Controller, Get } from '@midwayjs/core';

@Controller('/api/')
export class UserController {

  @Get('/home')
  async home(@Query('uid') uid: string) {
    return {content:"Hello Meadmin! "+uid};
  }

  @Post('/up')
  async update(@Body() user: User) {
    return {content:"Hello Meadmin! "+user.uid};
  }

  @Get('/:uid')
  async getUser(@Param('uid') uid: string): Promise<User> {
    return {content:"Hello Meadmin! "+uid};
  }  
}
```
@Controller装饰器有一个可选参数，用于进行路由前缀（分组），这样这个控制器下面的所有路由都会带上这个前缀,如上述所示例允许的请求为：
```
GET '/api/home?uid=123' //返回json对象{"content":"Hello Midwayjs! 123"}
POST '/api/home'   {"uid": "1", "name": "harry"}  //返回json对象{"content":"Hello Midwayjs! 1"}
GET '/api/1'    //返回json对象{"content":"Hello Midwayjs! 1"}
```
::: warning
所有的控制器方法必须为异步函数
:::
## 控制器继承
本项目对路由和控制器做了单独封装会根据Controller继承关系 递归合成@Controller装饰器的参数
从第一个prefix以/开头的祖级开始合并@Controller的第一个参数prefix和第二个参数routerOptions，如果prefix 以/开头，则重新计算，不合并父级的prefix和routerOptions
例如有以下基类：
```
import { CodeEunm } from '@/dict/code.enum.js';
import { ResponseService } from '@/service/response.service.js';
import { Controller, Inject } from '@midwayjs/core';

@Controller('/api')
export abstract class ApiController {
  @Inject()
  protected readonly responseService: ResponseService;

  success<T extends Record<string, any>>(data: T = {} as T, message = '操作成功') {
    return this.responseService.success(data, message);
  }

  error(message: string, code: Exclude<CodeEunm, CodeEunm.Success> = CodeEunm.Fail) {
    return this.responseService.error(message, code);
  }

  successPage<T = any>(list: T[], total = 0, page = 1, size = 10, message = '列表数据获取成功') {
    return this.responseService.successPage(list, total, page, size, message);
  }
}

```
```
//src/app/admin/controller/base.controller.ts
import { ApiController } from '@/controller/api.controller.js';
import { Controller } from '@midwayjs/core';
import { AdminMiddleware } from '../middleware/admin.middleware.js';

@Controller('admin', { middleware: [AdminMiddleware] })
export abstract class BaseController extends ApiController {}

```
自定义controller
```
//src/app/admin/controller/user.controller.ts
import { BaseController } from './base.controller.js';
@Controller('user')
export class UserController extends BaseController {
  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Post('/add')
  async add() {
    return this.success({aa:1});
  }
}
```
当前@Controller 地址参数会被递归合并`/api/admin/user`,最终请求地址为`POST /api/admin/user/add`。并且userController会具有`AdminMiddleware`中间件。

## 特别约定
- 所有的文件以小驼峰命名，所有的装饰器文件命名以`小驼峰名称.controller.ts`命名，类名以`大驼峰名称Controller`命名，
- 所有的装饰器放在对应模块的controller文件夹下，允许使用子文件夹自由组合嵌套。
- 个别防火墙，默认只放行GET、POST请求，而GET请求传参受浏览器URL限制，如果需要传递的参数过多就会无法传递。服务端经常会将访问的完整 URL 记录到日志文件中，有一些敏感数据通过 URL 传递会不安全。CRUD自动生成的请求除详情接口外都为POST。推荐尽量使用POST请求。
- 所有接口的Controller 需继承当前模块的`BaseController`
- 所有接口的Controller返回值，需调用`return this.success(data:Object)`进行返回，以遵循特定格式，方便前端识别。如接口返回错误，直接`throw new BadRequestError('error')`抛出对应异常即可，项目已做统一封装处理，详情请参考[响应及异常封装]