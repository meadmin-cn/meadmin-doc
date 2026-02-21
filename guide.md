# 介绍

nodejs + vue 全栈一站式中后台解决方案

如果只需要前端方案，可使用项目[meadmin-template](https://github.com/meadmin-cn/meadmin-template),前端项目对应文档:[https://www.meadmin.cn/meadmin-template-doc/](https://www.meadmin.cn/meadmin-template-doc/)

## 相关技术栈

### 数据库
- 存储数据库：PostgreSQL [学习链接](https://github.com/digoal/blog)
- 缓存数据库：Redis

### 后端
- 语言：nodejs>= 22.14.0
- 工具：pnpm [文档](https://pnpm.io/zh/motivation)
- 框架：midwayjs3.x [文档](https://midwayjs.org/docs/intro)
- 连接框架：sequelize7 [文档](https://sequelize.org/docs/v7/getting-started/)

### 前端

- 框架：vue3 [文档](https://cn.vuejs.org/guide/introduction.html)
- UI框架：element-plus [文档](https://element-plus.org/zh-CN/guide/design)
- 打包工具：vite7 [文档](https://v7.vite.dev/guide/)

## 特性

- 基于typescript 应用级JavaScript 的语言
- 基于sequelize7 、midwayjs3.x、vue3、vite7、pinia、elment-plus、vue-request@next
- 提供一键生成CRUD与菜单的自动化能力，大幅简化开发流程，显著提升项目构建效率
- 搭载完善的Auth权限控制，支持无限父子级分组与自由授权，管理员可跨组别，权限配置既灵活又严密。
- 提供开箱即用的前台服务端渲染能力
- 可配置主题 可配置主题色及主题模式
- 友好的国际化方案 前端支持按组件异步加载语言包。
- 自定义keepAlive缓存 可根据key进行vue keep-alive,解决不同路由统一组件不能独立刷新缓存问题
- 权限 内置完善的动态路由权限生成方案，按钮级权限。支持前端菜单和接口动态获取菜单两种模式
- 组件自动按需引入 自动按需引入components下的组件定义,支持自定义引入位置和模式，真正的按需引入。
- 便捷的类型自动生成 自动生成ts type 最大程度减少工作量
- 集成vxeTable 功能最完善的国人开源vue table组件

## 目录结构
#### 后端
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
### 前端
```
├── view 前端文件夹根目录
│   ├── admin 管理后台根目录
│   │   ├── dist 打包文件夹
│   │   ├── plugins vite插件
│   │   ├── public 公共静态资源目录
│   │   ├── src  主目录
│   │   │   ├── api 接口文件
│   │   │   ├── assets 资源文件
│   │   │   │   └── images 项目存放图片的文件夹
│   │   │   ├── components 公共组件（里面的组件会自动引入）
│   │   │   ├── config 配置文件夹
│   │   │   │   ├── index.ts 配置入口文件
│   │   │   │   ├── locale.ts 国际化配置
│   │   │   │   ├── login.ts  登录配置
│   │   │   │   └── theme.ts  主题配置
│   │   │   ├── dict  字典
│   │   │   ├── directives 指令（里面的指令会自动引入）
│   │   │   ├── event 事件
│   │   |   ├── hooks 公共hooks
│   │   │   ├── icons 图标
│   │   │   │   ├── svg  svg图标文件夹（放入此文件夹的svg会被自动注册图标组件）
│   │   │   │   └── index.ts 图标自动注册入口文件
│   │   │   ├── layout 布局文件
│   │   │   ├── locales  国际化
│   │   │   │   └── lang 全局语言包
│   │   │   ├── router  路由配置
│   │   │   │   └── guard 路由全局守卫
│   │   │   ├── store  pinia文件夹
│   │   |   ├── styles 样式文件 
│   │   │   ├── utils  工具类
│   │   │   ├── views  页面
│   │   │   ├── entry-client.ts 客户端渲染入口文件
│   │   │   ├── entry-server.ts 服务端渲染入口文件（管理后台，暂不支持服务端渲染）
│   │   │   └── main.ts 入口文件
│   │   ├── template自动生成模板
│   │   ├── types  类型文件
│   │   └── vite.config.ts vite配置文件
│   ├── index 前台根目录
│   │   ├── dist 打包文件夹
│   │   ├── mock mock文件夹
│   │   ├── plugins vite插件
│   │   ├── public 公共静态资源目录
│   │   ├── src  主目录
│   │   │   ├── api 接口文件
│   │   │   ├── assets 资源文件
│   │   │   │   └── images 项目存放图片的文件夹
│   │   │   ├── components 公共组件（里面的组件会自动引入）
│   │   │   ├── config 配置文件夹
│   │   │   │   ├── index.ts 配置入口文件
│   │   │   │   └── login.ts  登录配置
│   │   │   ├── dict  字典
│   │   │   ├── directives 指令（里面的指令会自动引入）
│   │   │   ├── event 事件
│   │   |   ├── hooks 公共hooks
│   │   │   ├── icons 图标
│   │   │   │   ├── svg  svg图标文件夹（放入此文件夹的svg会被自动注册图标组件）
│   │   │   │   └── index.ts 图标自动注册入口文件
│   │   │   ├── layout 布局文件
│   │   │   ├── router  路由配置
│   │   │   │   ├── guard 路由全局守卫
│   │   │   │   └── routes 动态路由文件夹
│   │   │   ├── store  pinia文件夹
│   │   |   ├── styles 样式文件 
│   │   │   ├── utils  工具类
│   │   │   ├── views  页面
│   │   │   ├── entry-client.ts 客户端渲染入口文件
│   │   │   ├── entry-server.ts 服务端渲染入口文件
│   │   │   └── main.ts 入口文件
│   │   ├── template自动生成模板
│   │   ├── types  类型文件
└── └── └── vite.config.ts vite配置文件
```
## 赞助

如果能帮到您欢迎打赏。赞助时务必备注github name 后期将更新到赞助列表中。

![](./payCode.jpg)