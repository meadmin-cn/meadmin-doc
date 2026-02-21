# 其他

## 权限校验
后台`admin`接口权限校验，在`controller`使用`@AdminPermission`装饰器。
```
import { AdminPermission, ApiOperationResponse } from '@/decorators/index.js';
import { User } from '@/entities/user.entity.js';
import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserCreateDto } from '../dto/userCreate.dto.js';
import { UserService } from '../service/user.service.js';
import { BaseController } from './base.controller.js';

/**
 * 为了防止防火墙禁止PUT、DELETE请求，方便传参，除详情外统一使用post请求。
 * meadmin对controller做了装饰器继承封装，当以/开头时会使用当前controller前缀地址，不以/开头时会递归继承controller前缀地址
 */
@Controller('user')
export class UserController extends BaseController {
  @Inject()
  userService: UserService;

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Post('/add')
  @ApiOperationResponse({
    responseType: User,
    summary: '添加用户信息',
  })
  @AdminPermission('UserAdd')
  async add(@Body() createDto: UserCreateDto) {
    return this.success(await this.userService.create(createDto));
  }
}
```

前台`index`接口权限校验，在`controller`使用`@IndexPermission`装饰器。前台登录仅校验是否登录，未做过多的权限封装。
```
import { ApiOperationResponse, IndexPermission } from '@/decorators/index.js';
import { Controller, Get, Inject } from '@midwayjs/core';
import { User } from '../../../entities/user.entity.js';
import { UserService } from '../service/user.service.js';
import { BaseController } from './base.controller.js';

/**
 * 为了防止防火墙禁止PUT、DELETE请求，规避get请求缓存，统一使用post请求。
 * meadmin对controller做了装饰器继承封装，当以/开头时会使用当前controller前缀地址，不以/开头时会递归继承controller前缀地址
 */
@Controller('user')
export class UserController extends BaseController {
  @Inject()
  userService: UserService;

  //接口方法必须加async 方法的接口装饰器值必须/开头
  @Get('/info')
  @ApiOperationResponse({
    responseType: User,
    summary: '获取当前用户的信息',
  })
  @IndexPermission()
  async info() {
    const entity = await this.userService.findOne(this.ctx.userInfo.id);
    return this.success(entity);
  }
}

```

## 登录校验
后台`admin`接口放开登录校验可在`src/config/config.default.ts`中配置。
```
admin: {
    login: {
      secret: 'desec2ec3=ase$&e1#edad#$%%', //token加密平台标识
      expiresIn: 3600000 * 6, //token过期时间ms
      renewal: 60000 * 10, //续期时间ms
      cacheKey: 'admin', //token使用的缓存key对应cacheManager.clients
    },
    auth: {
      noLoginUrl: [`/api/admin/login/login`, `/api/admin/login/captcha`, new RegExp('/api/admin/file/get/.+')] as Array<string | RegExp>, //无需登录地址，支持字符串或正则
    },
  },
```
## 配置和环境变量
本项目配置文件在`src/config/config.default.ts`中，并根据运行环境加载对应的.env文件。

如`dev`命令`cross-env NODE_ENV=local  npx me-devBootstrap --cleanOutDir --watch --run @midwayjs/mock/app`会依次加载 `.env``.env.local`文件

`start` 命令`cross-env NODE_ENV=prod node ./bootstrap.js`会依次加载 `.env``.env.prod`文件
更多说明请参考[midway 文档](https://midwayjs.org/docs/env_config)。

`.env`环境变量中以`VIEW_ADMIN_`开头和以`VIEW_INDEX_`开头的环境变量可分别被 `admin`及`index`前台项目读取到。

## 多语言
本项目的多语言目录在`src/locales`中,配置方式如下：
```
//src/config/config.default.ts
i18n: {
  // 默认语言  "zh-cn"
  defaultLocale: 'zh-cn',
  // used to alter the behaviour of missing keys
  missingKeyFn: function (locale, value) {
    return value;
  },

  // 把你的翻译文本放到这里
  localeTable: {
    'zh-cn': {
      validate: {
        'string.mobile': '{{#label}} 必须是一个正确的手机号',
      },
    },
    'en': {
      default: await import('../locales/en.json', { with: { type: 'json' } }),
      validate: await import('@midwayjs/validate/locales/en_US.json', { with: { type: 'json' } }),
    },
  },

  missingKeyHandler: (message: string, options?: TranslateOptions) => (options?.args ? formatText(message, options.args) : message),
},
```
更多说明请参考[midway文档](https://midwayjs.org/docs/extensions/i18n)
## 日志
调试模式及部署模式，都将日志目录改为本地的 ${app.appDir}/logs/ 目录下
```
//src/config/config.default.ts
midwayLogger: {
    default: {
      transports: {
        file: {
          dir: resolve(import.meta.dirname, '../../logs'),
        },
        error: {
          dir: resolve(import.meta.dirname, '../../logs'),
        },
      },
    },
    // ...
  },
```
## 缓存
集成@midwayjs/redis@3和@midwayjs/cache-manager@3组件，实现基于redis的缓存支持
```
//src/config/config.default.ts
  redis: {
    clients: {
      cache: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
        db: 0,
      },
    },
  },
  cacheManager: {
    //缓存配置
    clients: {
      admin: {
        store: createRedisStore('cache'),
      },
      index: {
        store: createRedisStore('cache'),
      },
    },
  },
```
## 静态文件映射
集成 @midwayjs/static-file@3组件，public文件夹下的资源都可以使用/文件名直接访问
```
//src/config/config.default.ts
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: 'public',
      },
      viewAdmin: {
        prefix: '/html/admin/',
        dir: 'view/admin/dist',
      },
      viewIndex: {
        prefix: '/html/index/',
        dir: 'view/index/dist',
      },
    },
  },
```

## 更多
依赖注入、生命周期、Cookies 和 Session、内置服务、Web 路由表、现有装饰器索引、框架错误码、设计模式等更多特性请参考[midway文档](https://midwayjs.org/docs/container)




