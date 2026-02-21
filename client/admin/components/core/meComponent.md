# MeComponent
MeComponent基于 `component` 结合`keepAlive``transition``doneProgress``suspense`，而封装自定义组件。

## 组件props

| props      | 类型 |说明|必填|
| ----------- | ----------- | ----------- | ----------- |
| is       | 当 is 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。或者，is 也可以直接绑定到组件的定义 | 会透传给`compnent`组件 |是|
| keepAlive      | `MeKeepAlive` `props` Object | 传给`MeKeepAlive` 的props对象，不传此值代表不开启KeepAlive缓存 |否|
| componentKey    | string | 自定义组件的`key` |否|
| transition |`TransitionProps` `props` Object| 传给`Transition` 的props对象，不传此值代表不开启Transition动画 |否|
| doneProgress| boolean | 是否需要执行nProgress.done() | 否|
| suspense| SuspenseProps| 异步组件 | 否|
## 示例

```vue
<router-view v-slot="{ Component }">
      <me-component :is="Component" done-progress></me-component>
</router-view>
```
