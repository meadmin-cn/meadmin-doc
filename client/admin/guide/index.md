# 后台文档

## 简介 
后台前端模板，基于vue3、vite、 pinia、 elment-plus构建，如需仅使用纯前端模板可以去[Me-admin template](https://github.com/meadmin-cn/meadmin-template) clone，纯前端模板文档[https://www.meadmin.cn/meadmin-template-doc/](https://www.meadmin.cn/meadmin-template-doc/)。


## 前端特性
 - **基于vue3、vite、pinia、elment-plus、vue-request@next**
 - **基于typescript** 应用级JavaScript 的语言
 - **可配置主题** 可配置主题色及主题模式
 - **友好的国际化方案** 基于vue-i18n 支持按组件异步加载语言包。
 - **自定义keepAlive缓存** 可根据key进行vue keep-alive,解决不同路由统一组件不能独立刷新缓存问题
 - **权限** 内置完善的动态路由权限生成方案，按钮级权限。支持前端菜单和接口动态获取菜单两种模式
 - **组件自动按需引入** 自动按需引入components下的组件定义,支持自定义引入位置和模式，真正的按需引入。
 - **便捷的类型自动生成** 自动生成ts type 最大程度减少工作量
 - **集成vxeTable** 功能最完善的国人开源vue table组件

## vite插件推荐
 本项目中用到的vite插件，非常好用，如果能帮到您，请点个star
- [vite-plugin-autogeneration-import-file](https://github.com/yuntian001/vite-plugin-autogeneration-import-file) 自动生成文件，用于type文件和引入文件的自动生成
- [@yuntian001/vue-setup-extend](https://github.com/yuntian001/vue-setup-extend) 方便给vue `<script setup>` 标签语法设置自定义属性。
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 按需自动导入Vue、Vue Router、pinia等官方Api
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 按需自动导入组件
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) Vite插件加载SVG文件作为Vue组件，使用SVGO进行优化


## 浏览器兼容性
- 由于 Vue 3 不再支持 IE11，本项目不支持 IE 浏览器。
- 如果需要配置兼容性可参考[如何配置浏览器兼容性](/client/admin/other/question.md#如何配置浏览器兼容性)

| ![](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) |![](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png)|
| --- | --- | --- | --- |
| 88 | 78 | 87 | 13 |

