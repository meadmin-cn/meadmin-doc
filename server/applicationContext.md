# Application 和 Context
Midway 的应用会同时对外暴露不同协议，比如 Http，WebSocket 等等，这里每个协议对 Midway 来说都是由独立的组件提供的。

本项目应用的是 `@midwayjs/koa`，基于`koa`一个提供 Http 服务的组件。

每个使用的 Web 框架会提供自己独特的能力，这些独特的能力都会体现在各自的 上下文（Context）和 应用（Application）之上。

本项目封装了全局方法/属性便于获取`Context` `Application`

## Application
Application 是某一个组件中的应用对象，在不同的组件中，可能有着不同的实现。Application 对象上会包含一些统一的方法，这些方法统一来自于 IMidwayApplication 定义。
### 获取方式
本项目为了方便获取，为Application封装了全局变量，在`onReady`生命周期后可以调用到。示例：
```
import {app} from '@meadmin/core';
export function getConfig(){
   return  app.getConfig()

}
```
Application 具有以下方法
|方法名|说明|使用方法|
|  --  | -- |  --    |
|getAppDir| 用于获取项目根目录路径| app.getAppDir()|
|getBaseDir|用于获取项目 TypeScript 基础路径，默认开发中为 src 目录，编译后为 dist 目录。|app.getBaseDir()|
|getEnv|获取当前项目环境。|app.getEnv()|
|getApplicationContext|获取当前全局依赖注入容器。|app.getApplicationContext()|
|getConfig|获取配置。|app.getConfig()|
|getLogger|获取某个 Logger，不传参数，默认返回 appLogger。|app.getLogger()|
|getCoreLogger|获取 Core Logger。|app.getCoreLogger()|
|getProjectName|获取项目名，一般从 package.json 中获取。|app.getProjectName()|
|setAttr & getAttr|临时的全局数据存储|app.setAttr('abc', {a: 1,b: 2,});app.getAttr('abc');|
|getNamespace|通过 getNamespace API ，可以获取到当前 app 归属的组件的 框架的类型（即组件的 namespace）。|app.getNamespace();|

更多说明请参考[midway Application 和 Context文档](https://midwayjs.org/docs/req_res_app)
::: info
- '@meadmin/core'的app返回的是项目的` Main Application`(src/configuration.ts 中第一个引入的 Application 即为主要的 Application) `@midwayjs/koa`
- '@meadmin/core'的app是在`onReady`生命周期赋值的，使用时请确保`onReady`生命周期已执行
- `Midway`具有如下生命周期：
1. 配置文件加载，我们可以在这里去修改配置（onConfigLoad）
2. 依赖注入容器准备完毕，可以在这个阶段做大部分的事情（onReady）
3. 服务启动完成，可以拿到 server（onServerReady）
4. 应用即将关闭，在这里清理资源（onStop）
更多生命周期说明请参考文档：[midway 生命周期](https://midwayjs.org/docs/lifecycle)
:::

## Context
Context 是一个请求级别的对象，在每一次收到用户请求时，框架会实例化一个 Context 对象，

在 Http 场景中，这个对象封装了这次用户请求的信息，或者其他获取请求参数，设置响应信息的方法，在 WebSocket，Rabbitmq 等场景中，Context 也有各自的属性，以框架的定义为准。

下面的 API 是每个上下文实现通用的属性或者接口。
### 获取方式
本项目为了方便获取，为context封装了全局获取方法，在任何请求上下文中都可以可以调用到。获取到的context 为 项目的主请求组件`@midwayjs/koa`组件 的`content`。获取示例：
```
import { getContext } from '@meadmin/core';
export function getConfig(){
   ctx = getContext();
   //返回上下文的开始实际
   return ctx.startTime;
}
```
下面的 API 是每个上下文实现通用的属性或者接口。
|方法名|说明|使用方法|
|  --  | -- |  --    |
| requestContext | Midway 会为每个 Context 挂载一个 requestContext 属性，即请求作用域下的依赖注入容器，用来创建请求作用域下的对象。|const userService = await ctx.requestContext.getAsync(UserService); |
| logger | 请求作用域下的默认 logger 对象，包含上下文数据。| ctx.logger.info('xxxx');|
| startTime | 上下文执行开始的时间。| ctx.startTime |
| setAttr & getAttr | 和 app 上的方法相同，这些方法的数据是保存在请求链路中，随着请求销毁，你可以在其中放一些请求的临时数据。 |ctx.setAttr('abc', {a: 1,  b: 2,});ctx.getAttr('abc'); |
| ctx.getLogger('custom'); | 获取某个自定义 Logger 对应的上下文日志。| ctx.getLogger('custom') |
| getApp | 从 ctx 上获取当前框架类型的 app 对象。| ctx.getApp(); |  

更多说明请参考[midway Application 和 Context文档](https://midwayjs.org/docs/req_res_app)

::: info
`Context` 利用的`AsyncLocalStorage`在全局中间件绑定在了请求上下文中
:::
