## Application 和 Context
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
::: info
- '@meadmin/core'的app返回的是项目的` Main Application`(src/configuration.ts 中第一个引入的 Application 即为主要的 Application) `@midwayjs/koa`
- '@meadmin/core'的app实在`onReady`生命周期赋值的，使用时请确保`onReady`生命周期已执行
- `Midway`具有如下生命周期：
1. 配置文件加载，我们可以在这里去修改配置（onConfigLoad）
2. 依赖注入容器准备完毕，可以在这个阶段做大部分的事情（onReady）
3. 服务启动完成，可以拿到 server（onServerReady）
4. 应用即将关闭，在这里清理资源（onStop）
更多生命周期说明请参考文档：[midway 生命周期](https://midwayjs.org/docs/lifecycle)
:::
