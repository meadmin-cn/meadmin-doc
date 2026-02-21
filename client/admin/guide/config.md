# 配置
## 目录结构
前端项目`admin`根目录位于 `view/admin`，下边的目录相对于`view/admin`文件夹。
```
.
├── dist 打包文件夹
├── plugins vite插件
├── public 公共静态资源目录
├── src  主目录
│   ├── api 接口文件
│   ├── assets 资源文件
│   │   └── images 项目存放图片的文件夹
│   ├── components 公共组件（里面的组件会自动引入）
│   ├── config 配置文件夹
│   │   ├── index.ts 配置入口文件
│   │   ├── locale.ts 国际化配置
│   │   ├── login.ts  登录配置
│   │   └── theme.ts  主题配置
│   ├── directives 指令（里面的指令会自动引入）
│   ├── dict  字典
│   ├── event 事件
|   ├── hooks 公共hooks
│   ├── icons 图标
│   │   ├── svg  svg图标文件夹（放入此文件夹的svg会被自动注册图标组件）
│   │   └── index.ts 图标自动注册入口文件
│   ├── layout 布局文件
│   ├── locales  国际化
│   │   └── lang 全局语言包
│   ├── router  路由配置
│   │   ├── guard 路由全局守卫
│   │   └── routes 动态路由存放目录
|   ├── styles 样式文件 
│   ├── store  pinia文件夹
│   ├── utils  工具类
│   ├── views  页面
│   └── main.ts 入口文件
├── template自动生成模板
├── types  类型文件
└── vite.config.ts vite配置文件
```
## 基础配置

配置文件地址 `@/config/index.ts`
```ts
const settingConfig = {
  version: '1.0.3', //版本当版本改变时会清空localStorage和sessionStorage
  openKeepAlive: true, // 是否开启KeepAlive缓存
  menuMode: MenuModeEnum.STATIC, // 动态路由模式 MenuModeEnum.STATIC/MenuModeEnum.API
};
```

## 登录配置

登录后token会储存在在cookie中，可以在配置文件中配置token相关cookie设置

配置文件地址 `@/config/login.ts`
``` ts
export default {
  tokenName: 'auth-token', // cookie中存储的token key
  tokenExpires: 7, // token 过期时间
  tokenDomain: typeof window === 'undefined' ? '' : window.location.hostname, // token 存储cookie域名
};
```

## 主题配置

配置文件地址`@/config/theme.ts`
``` ts
import { SizeEnum } from '@/enums/configEnum';
export default {
  primaryColor: '#409eff', // 主题颜色
  menuBg: '#1d1e1f', // 菜单背景颜色
  menuWidth: '200px', // 菜单展开宽度
  menuCollapse: true, // 菜单是否折叠
  size: SizeEnum.DEFAULT, // 默认大小
  fixedHeader: true, // 固定header
  topBar: true, // 是否显示顶栏
  breadcrumb: true, // 面包屑
  showDark: true, // 开启暗黑模式切换
  showSize: true, // 开启大小切换
  tagBar: true, // 标签栏
  tagBarMenu: true, // 标签栏快捷菜单
  tagBarRefresh: true, // 标签栏刷新按钮
  showSetting: true, // 展示设置按钮
};
```

## 国际化配置

配置文件地址`@/config/locale.ts`

- 语言包异步导入配置
  
``` ts
export const loadMessageConfig = {
// 导入语言包配置
timeOut: 10000, // 导入语言包超时时间ms(对于单次导入而不是整体导入)0代表不超时
errorWarning: false, // 导入失败的警告（生产环境会被屏蔽）
componentLoad: true, // 组件语言包导入 不需要多语言或只使用全局语言包时设置为false以提升性能
};
```
- 语言列表
  
::: warning 注意
locale命名时需要和[element-plus](https://element-plus.gitee.io/zh-CN/guide/i18n.html#cdn-%E7%94%A8%E6%B3%95)的local命名一致，否则无法加载element-plus对应的语言包 
:::

``` ts
export const localeList = [
  {
    text: '简体中文',
    locale: 'zh-cn',
  },
  {
    text: '美国英语',
    locale: 'en',
  },
]
```

- 全局[VueI18n](https://vue-i18n.intlify.dev/api/general.html#i18noptions)初始参数(VueI18n版本基于v9.x)

::: warning 注意
legacy和globalInjection无需设置
程序内部强制把legacy设置为了false、globalInjection设置为了true。
:::

``` ts
const localeSetting: I18nOptions = {
  // Locale
  locale: localeList[0].locale,
  // Default locale
  fallbackLocale: localeList[0].locale,
  missingWarn: false, // 当本地化失败时，压制输出的警告
  fallbackWarn: false, // 抑制回落警告
  fallbackFormat: true, // 跳过为你的"base"语言编写模板;key是您的模板
};
```