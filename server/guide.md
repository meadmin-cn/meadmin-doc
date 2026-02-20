# 介绍
后端使用Midway框架，Midway 是阿里巴巴 - 淘宝前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器，搭配各种上层模块，组合出适用于不同场景的解决方案。
如需对后端进行更多了解，可阅读[midway文档](https://midwayjs.org/docs/intro)

## 目录结构
```
├──.husky git hooks钩子文件夹
├──.vscode vscode推荐配置文件夹
├── dist 后端打包文件夹
├──logs 日志文件夹
├──public 静态资源文件
│   ├── admin 后台静态资源
│   ├── index 前台静态资源
├── src  后端主目录
│   ├── app 后端模块根目录
│   │   ├──admin 后台接口模块
│   │   │   ├── controller 模块控制器文件夹
│   │   │   ├── dto 模块出入参dto类文件夹
│   │   │   ├── middleware 模块中间件夹
│   │   │   └── service 模块service文件夹
│   │   ├──index 前台接口模块
│   │   │   ├── controller 模块控制器文件夹
│   │   │   ├── dto 模块出入参dto类文件夹
│   │   │   ├── middleware 模块中间件夹
│   │   │   └── service 模块service文件夹
│   │   └──home.controller.ts 页面渲染控制器
│   ├── config 配置文件夹
│   ├── controller 公共控制器文件夹
│   ├── decorators 装饰器文件夹
│   ├── dict 字典文件夹
│   ├── dto 出入参dto基类文件夹
│   ├── entities 数据库实体类文件夹
│   ├── fileManage 文件夹管理助手类
│   ├── filter 异常类文件夹
│   ├── helper 助手函数文件夹
│   ├── locales 后端多语言文件包
│   ├── response 反参基类
|   ├── ruleType 后端自定义校验规则
|   ├── service 全局公共service
|   ├── types 类型扩展
|   ├── configuration.ts 启动文件
│   └── logger.ts logger初始化文件
├── uploadFile 本地上传目录
├── view 前端文件夹
├── .env env环境变量，VIEW_ADMIN_开头的可被 前端admin项目获取到，VIEW_INDEX_开头的可被前端 index项目获取到
├── .env.prod 启动后env环境变量
├── .eslintrc.json eslint配置文件
├── .gitignore git 忽略文件
├── .npmrc pnpm配置文件
├── .prettierignore prettier忽略文件
├── .prettierrc.cjs prettier配置文件
├── bootstrap.js 部署后bootstrap启动文件
├── meadmin.sql 初始化sql文件
├── pnpm-workspace.yaml pnpm workspace 配置
└── tsconfig.json typescript配置文件
```


## 基本概念

后端基于 Node.js 监听端口，对外主要提供 API 接口及页面访问。

后端架构主要划分为以下几层：router、controller、service、dto、entity。

- router：定义路由映射，将不同请求指向对应 controller 类中的方法。访问相应地址时会自动触发对应的 controller 逻辑。

- controller：作为请求入口，负责入参校验、调用 service、返回响应，并集成 Swagger 生成接口文档。其中可能封装少量控制逻辑，但核心业务处理一般交由 service。

- service：封装核心业务逻辑，根据场景组织代码。通过 entity 数据模型进行数据库操作，并实现复杂业务处理。

- entity：对应数据库表的模型实体，所有数据库操作均通过 entity 完成。

- dto：定义接口的请求参数与响应结果格式。每个接口都有对应的 DTO 类，controller 在接收到请求时会自动基于 DTO 完成参数校验。


## 改动及封装
本项目对midway做了以下封装，详情请参考相关章节。

### controller装饰器会继承prefix和routerOptions。
 根据 controller 继承关系 递归合成Controller装饰器的参数
 从第一个prefix以/开头的祖级开始合并controller的prefix和routerOptions，如果prefix 以/开头，则不合并prefix和routerOptions
### 强制文件目录结构
Midway 对目录没有特别的限制，但当前项目，将一部分常用的文件进行归类，放到一些默认的文件夹中。文件夹详情请参考[目录结构](#目录结构)。日常开发需要关注的主要有：`src/app/*/controller`文件、`src/app/*/service`文件、`src/app/*/dto`文件、`src/app/*/middleware`中间件文件、`src/entities`数据库实体类文件。
### 模块
本项目增加了模块的概念，在`src/app/`下每一个文件夹代表一个模块，将相关逻辑归类存放。
### 应用
应用基于koa 使用`@midwayjs/koa`组件
### 参数校验
已集成，源于`joi`的`@midwayjs/validate@3`参数校验组件，并自定义了`mobile`等校验规则
### 多语言
已集成`@midwayjs/i18n@3`多语言组件，多语言文件夹为`locales/en.json`，并且翻译失败使用当前key做为返回值
### 数据库访问
已集成sequelize7，自定义封装的sequelize访问service，相关源码在`src/service/dataSourceManager.service.ts`,对应配置文件在`src/config/database.ts`
### 静态文件映射
集成 `@midwayjs/static-file@3`组件，`public`文件夹下的资源都可以使用`/文件名`直接访问
### 模板引擎
集成 `@medamin/midway-vite-view`组件，实现vite+vue模板渲染支持
### 缓存
集成`@midwayjs/redis@3`和`@midwayjs/cache-manager@3`组件，实现基于redis的缓存支持
### 日志
调试模式及部署模式，都将日志目录改为本地的 ${app.appDir}/logs/ 目录下
