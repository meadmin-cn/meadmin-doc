# 权限

## 初始化权限

当登录成功或刷新页面后，会请求`userInfoApi`接口获取权限，相关代码在`@/store/modules/user.ts`中。
``` ts
// 初始化
 init: async function (tokenValue?: string) {
  const token = tokenValue ?? cookies.get(config.tokenName);
  if (token) {
    this.token = token;
    const res = await userInfoApi(true, !tokenValue)();
    this.user = res.info;
    initDynamicViewsModules();
    this.rules = res.btnRules;
    this.menus = listToTree(
      res.menus.map((item) => ({
        id: item.id,
        path: item.path,
        parentId: item.parentId,
        component: transitionComponent(item.component),
        meta: {
          // 标题设置该路由在侧边栏和面包屑中展示的名字
          title: item.title,
          // 对应权限 多个之间为或的关系
          rule: [item.rule],
          // 是否是固定的tag
          affix: statusToBoolean(item.affix),
          // 图标
          icon: item.icon,
          // 外链
          isLink: statusToBoolean(item.isLink),
          // 如果设置为true，则不会被 <keep-alive> 缓存
          noCache: !statusToBoolean(item.cache),
          // 在菜单中隐藏
          hideMenu: statusToBoolean(item.hideMenu),
          // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
          // 只有一个时，会将那个子路由当做根路由显示在侧边栏
          // 若你想不管路由下面的 children 声明的个数都显示你的根路由
          // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
          alwaysShow: statusToBoolean(item.alwaysShow),
          // 是否需要面包屑 false不展示在面包屑,ture一直展示在面包屑,undefined当只有一个子元素面包屑时跳过展示
          breadcrumb: statusToBoolean(item.breadcrumb),
        },
      })),
    );
    await useRouteStore().initRoutes(); //初始化路由
  } else {
    this.token = '';
  }
},
```

## 路由权限校验

初始化完权限后，注册有权限的路由，过滤规则参考[路由权限](../guide/route.md#路由权限)

## 按钮权限校验

权限校验函数为permission(rules?: string | string[])，当入参为数组时，匹配成功数组中的任意一个权限则返回true。

通过v-if指令和permission函数配合进行按钮权限校验(未进行封装指令的原因是，指令方式对服务端渲染不友好，建议使用v-if判断)。

- 通过全局函数$permission()校验权限
``` vue
    <el-button v-if="$permission('edit')">{{ $t('编辑') }}</el-button>

```
- 引入 permission()函数校验
  
``` vue
<template>
  <div class="permission">
    <el-button v-if="permission('show')">{{ $t('查看') }}</el-button>
  </div>
</template>
<script setup lang="ts" name="permission">
import { permission } from '@/utils/permission';
</script>
```

## 超管权限

当初始化权限时拿到的`rules`数组包含'*'时，代表具有所有权限，权限permission函数会必定返回`true`