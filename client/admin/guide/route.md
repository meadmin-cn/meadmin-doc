# 路由菜单

这里的路由分为两种，constantRoutes 和 asyncRoutes。

constantRoutes： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

asyncRoutes： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。
## 静态路由(constantRoutes)

静态路由定义位于`@/router/routes/index.ts`文件下,主要包含一些无需登录的公共路由。

```
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: PageEnum.LOGIN,
    component: async () => await import('@/views/login/index.vue'),
    meta: {
      hideMenu: true,
      title: '登录',
    },
  },
  {
    path: PageEnum.HOME,
    meta: {
      hideMenu: true,
      title: '首页',
    },
    redirect: () => useRouteStore().firstMenu(),//重定向到第一个路由
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        name: 'redirect',
        path: '/redirect/:path(.*)',
        component: async () => await import('@/views/redirect.vue'),
      },
    ],
    meta: {
      hideMenu: true,
      title: '',
      noCache: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: async () => await import('@/views/404.vue'),
    meta: { hideMenu: true, title: '404' },
  },
];
```


## 动态路由(asyncRoutes)

- **动态定义通过api接口获取**
- **动态路由获取成功后会动态注册到vue-router中。**
- **动态路由注册时会自动注册到一级路由`/`的children下,这样菜单路由只有一级也可以渲染出layout框架**


路由功能基于[vue-router](https://router.vuejs.org/zh/introduction.html)开发,自定义配置放在了[meta](#meta配置说明)中,其余定义规则参考[vue-router#routerecordraw](https://router.vuejs.org/zh/api/#routerecordraw)。

将`settingConfig.menuMode`(位于`@/config/index.ts`文件中)设置为`MenuModeEnum.API`，将使用前端定义模式。

### 动态路由api获取模式

将`settingConfig.menuMode`(位于`@/config/index.ts`文件中)设置为`MenuModeEnum.API`，将使用api模式，此值已自动设置，请勿更改。

在api模式下，登录成功后或者已登录首次访问时，会通过调用接口获取菜单数组，动态注册到vue-router中。

### 创建菜单

在 菜单权限页面 直接创建 类型为 菜单， 组件路径为 相对于`src/views`文件夹无后缀的相对路径即可
![alt text](image.png)


### 配置说明
```
export interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 标题设置该路由在侧边栏和面包屑中展示的名字
    title: string;
    // 对应权限 多个之间为或的关系
    rule?: string[];
    // 是否是固定的tag
    affix?: boolean;
    // 图标
    icon?: string;
    // 在tag中隐藏
    hideTag?: boolean;
    // 外链
    isLink?: boolean;
    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    // asyncRoutes如果不设置会自动计算展示不隐藏的祖级（包括当前）
    activeMenu?: string;
    // 如果设置为true，则不会被 <keep-alive> 缓存
    noCache?: boolean;
    // 在菜单中隐藏
    hideMenu?: boolean;
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow?: boolean;
    // 是否需要面包屑 false不展示在面包屑,ture一直展示在面包屑,undefined当只有一个子元素面包屑时跳过展示
    breadcrumb?: boolean;
  }
```

### 外链

当为外链 时，路径 需填写外链地址。

### 菜单图标

菜单图标定义值为图标组件的name,自定义svg图标和使用elment-plus图标请参考[图标](/guide/icon.md)

### keepAlive缓存

页面缓存通过 组件[me-keep-alive](/guide/components/meKeepAlive.md)实现,通过路由的fullPath进行缓存过滤，所以无需对页面组件设置name,即可进行缓存，并且多路由共用同一页面组件时，可以进行独立刷新，互不影响。


 - 如果想全局禁用keppAlive，去`@/config/index.ts`配置`settingConfig.openKeepAlive`为`false`即可，配置详情参见[config](/guide/config.md#基础配置)。
 - 如需设置某个路由不缓存设置缓存值为`否`即可。
