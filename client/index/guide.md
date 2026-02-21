# 前台文档
前台前端模板，与后台模板规则一致，只是去除了多语言和权限校验，增加了服务端渲染支持。
详细说明请参考[后台文档](/client/admin/guide/)
## 目录结构
根目录为`view/index`
```
├── dist 打包文件夹
│   ├── mock mock文件夹
│   ├── plugins vite插件
│   ├── public 公共静态资源目录
│   ├── src  主目录
│   │   ├── api 接口文件
│   │   ├── assets 资源文件
│   │   │   └── images 项目存放图片的文件夹
│   │   ├── components 公共组件（里面的组件会自动引入）
│   │   ├── config 配置文件夹
│   │   │   ├── index.ts 配置入口文件
│   │   │   └── login.ts  登录配置
│   │   ├── dict  字典
│   │   ├── directives 指令（里面的指令会自动引入）
│   │   ├── event 事件
│   |   ├── hooks 公共hooks
│   │   ├── icons 图标
│   │   │   ├── svg  svg图标文件夹（放入此文件夹的svg会被自动注册图标组件）
│   │   │   └── index.ts 图标自动注册入口文件
│   │   ├── layout 布局文件
│   │   ├── router  路由配置
│   │   │   ├── guard 路由全局守卫
│   │   │   └── routes 动态路由文件夹
│   │   ├── store  pinia文件夹
│   |   ├── styles 样式文件 
│   │   ├── utils  工具类
│   │   ├── views  页面
│   │   ├── entry-client.ts 客户端渲染入口文件
│   │   ├── entry-server.ts 服务端渲染入口文件
│   │   └── main.ts 入口文件
│   ├── template自动生成模板
│   ├── types  类型文件
└── └── vite.config.ts vite配置文件
```
## 注意事项
开发需寻遵循以下事项，以兼容服务端渲染特性

- 如需使用window对象需增加服务端渲染判断
```
if (!import.meta.env.SSR) {
  //下面代码仅在客户端执行
  window.addEventListener('resize', () => mitter.emit(event.RESIZE));
}

```

- request请求需在setup顶层创建，以规避服务端渲染“跨请求状态污染”
```
//login.vue
<script setup lang="ts" name="Login">
//...
import {  loginCaptchaApi } from '@/api/login';
const { data: captchaObj, runAsync: getCaptchRun } = loginCaptchaApi();
const getCaptch = async () => {
  await getCaptchRun();
  //...
};
await getCaptch();
//...
</script>

```
- 如在组件外发送请求需透传app给request方法，
```
//login.ts
export function loginApi<T extends boolean = true>(returnAxios: T = true as T, app?:App) {
  return request<LoginResult, [LoginParams], T>(
    (params) => ({
      url: 'login/login',
      method: 'post',
      data: params,
    }),
    {},
    returnAxios,
    app,
  );
}
```
```
 // userStore
  login: async function (app:App, params: LoginParams) {
    //...
    const res = await loginApi(true,app)(params);
    //...
  },
```
```
//login.vue
const _this = getCurrentInstance();
const submit = async () => {
  //...
  await userStore.login(_this!.appContext.app,loginParams);
};
//...
```
- 请求直接，在setp 顶层await否则服务端渲染期间无法获取到数据。

- 如需在组件外创建store，需传入pinia
```
//request.ts

export function request<R, P extends unknown[] = [], T = boolean>(
  axiosConfig: (...args: P) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  options?: RequestOptions<R, P>,
  returnAxios?: T,
  app?: App,
) {
//...
 store = app?.config.globalProperties.$pinia;
 const userStore = useUserStore(store);
//...
}

```
## 路由声明

前台项目路由声明在`src/routes`文件夹下，src/routes文件夹下的`.ts`会自动引入加载，不经过权限校验。
```
//src/router/routes/002-demo.ts
import Layout from '@/layout/default/index.vue';
import { concatObjectValue } from '@/utils/helper';
import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: '/demo',
    redirect: '/demo/1',
    component: Layout,
    children: concatObjectValue<RouteRecordRaw>(import.meta.glob('./demo/*.ts', { eager: true, import: 'routes' })),
    meta: { title: '演示菜单' },
  },
];

```