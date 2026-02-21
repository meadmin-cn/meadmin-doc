# 接口请求

接口请求函数`request`位于文件`@/utils/request.ts`中，基于[axios](https://www.axios-http.cn/)和[vue-request v2.x](https://next.cn.attojs.org/guide/introduction.html)二次封装,使用前请先阅读[axios](https://www.axios-http.cn/)和[vue-request v2.x](https://next.cn.attojs.org/guide/introduction.html)文档

核心代码如下：
``` ts
/**
 * 请求函数
 * @param axiosConfig  axios的配置项
 * @param options vue request配置项+自定义配置项参考 RequestOptions
 * @param returnAxios
 * @returns
 */
export function request<R, P extends unknown[] = [], T = boolean>(axiosConfig: (...args: P) => AxiosRequestConfig | Promise<AxiosRequestConfig>, options?: RequestOptions<R, P>, returnAxios?: T) {
  const axiosService = async (...args: P): Promise<R> => {
    try {
      //loading放到微任务中去执行以确保在自动调用请求时等待所有的宏任务中的生命周期函数执行完再创建loading实例 以规避currentInstance的相关警告
      !options?.noLoading && Promise.resolve(undefined).then(loading);
      const config = await axiosConfig(...args);
      if (options?.clearEmpty) {
        if (config.params) config.params = clearEmptyParam(config.params, options?.clearEmpty);
        if (config.data) config.data = clearEmptyParam(config.data, options?.clearEmpty);
      }
      const locale = useSettingStore().locale;
      if (locale) {
        config.params = Object.assign({ locale }, config.params);
      }
      const { data: res } = await service(config);
      if (!res || res.code === undefined) {
        throw Error(t('返回值解析失败'));
      }
      // 401：认证失败
      if (res.code === '401') {
        ElMessageBox.confirm(res.msg, '请登录', {
          confirmButtonText: '去 登 陆',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          closeOnHashChange: false,
        })
          .then(async () => {
            await useUserStore().logOut();
          })
          .catch(() => {});
        throw Error(res.msg);
      }
      // 没有权限
      if (res.code === '403') {
        ElMessageBox.confirm(res.msg, '无权限访问', {
          confirmButtonText: '切换账户',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          closeOnHashChange: false,
        })
          .then(async () => {
            await useUserStore().logOut();
          })
          .catch(() => {});
        throw Error(res.msg);
      }
      if (res.code !== '200') {
        throw Error(res.msg);
      }
      if (options?.success) {
        ElMessage.success({ message: res.msg });
      }
      !options?.noLoading && closeLoading();
      return options?.needAll ? res : res.data;
    } catch (e) {
      !options?.noLoading && closeLoading();
      !options?.noError &&
        ElMessage.error({
          message: e instanceof Error ? e.message : String(e),
        });
      throw e;
    }
  };

  return returnAxios ? axiosService : useRequest<R, P>(axiosService, options);
}
```

## 自定义返回值格式
`request`函数主要是封装`vue-request`使其发起请求使用`axios`，并且请求时加上了loading、对接口返回值进行了校验处理、出错时自动报错提示

接口处理格式已和后端api格式同步，如需要更改可自行修改以下代码
``` ts
  if (!res || res.code === undefined) {
    throw Error(t('返回值解析失败'));
  }
  // 401：认证失败
  if (res.code === '401') {
    ElMessageBox.confirm(res.msg, '请登录', {
      confirmButtonText: '去 登 陆',
      cancelButtonText: '取消',
      type: 'warning',
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
    })
      .then(async () => {
        await useUserStore().logOut();
      })
      .catch(() => {});
    throw Error(res.msg);
  }
  // 没有权限
  if (res.code === '403') {
    ElMessageBox.confirm(res.msg, '无权限访问', {
      confirmButtonText: '切换账户',
      cancelButtonText: '取消',
      type: 'warning',
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
    })
      .then(async () => {
        await useUserStore().logOut();
      })
      .catch(() => {});
    throw Error(res.msg);
  }
  if (res.code !== '200') {
    throw Error(res.msg);
  }
  if (options?.success) {
    ElMessage.success({ message: res.msg });
  }
  !options?.noLoading && closeLoading();
  return options?.needAll ? res : res.data;
```

## 入参说明
| 参数      | 类型 | 说明 | 是否必填 |
| ----------- | ----------- | ----------- | ----------- |
| axiosConfig | AxiosRequestConfig | 接口请求数据，完全遵循 [axios config](https://www.axios-http.cn/docs/req_config) 的规则 |是|
| options   | RequestOptions    | 基于[vue-request options](https://next.cn.attojs.org/api/#options)配置扩展了个别配置，下面会详细说名 |否|
| returnAxios | boolean | 返回axios，当传入true是返回axios不传或false时返回vue-reques对象 | 否 |

| RequestOptions | 类型 | 说明 | 是否必填 |
| ----------- | ----------- | ----------- | ----------- |
| needAll | boolean | 返回完整的返回值忽略格式化返回值（默认返回的是data字段） | 否 |
| noLoading | boolean | 不需要lodaing | 否 |
| noError | boolean | 不需要报错 | 否 |
| ... vue-request options | [vue-request options](https://next.cn.attojs.org/api/#options) | 更多字段参考[vue-request options](https://next.cn.attojs.org/api/#options) 文档| 否 |

## 使用示例

- 在接口文件夹`@/api`文件夹中新建接口文件`@/api/example.ts`

- 在`@/api/example.ts`加入接口声明代码
``` ts
import { PageParam, PageResult } from '@/api/api.model.js';
import { SystemAdminInfo } from '@/api/system/admin.js';
import request from '@/utils/request.js';

//示例_书籍
export type ExampleBook = {
  createdAdmin: SystemAdminInfo | null; //创建者
  updatedAdmin: SystemAdminInfo | null; //最后更新者
  id: string; //ID
  name: string; //名称
  createdAt: string; //创建时间
  updatedAt: string; //最后更新时间
};

//获取示例_书籍信息
export function getExampleBookApi() {
  return request<
    PageResult<ExampleBook>,
    [
      PageParam & {
        id?: string;
        name?: string;
      },
    ]
  >(
    (data) => ({
      url: 'example/demo/getExampleBook',
      method: 'post',
      data: data,
    }),
    { noLoading: true },
  );
}

```

- 在`vue`文件中使用
``` vue
<template>
  <div class="list" v-loading="loading">
    <template v-if="data">
      <div v-for="(item, index) in data" :key="index">
        {{ item }}
      </div>
    </template>

  </div>
</template>
<script setup lang="ts" name="request">
import { getExampleBookApi } from '@/api/example';
const { runAsync, loading, error, data } = getExampleBookApi();
runAsync({page:1,pageSize:10});//请求接口 建议使用runAsync请求而不是run,区别请参考文档https://next.cn.attojs.org/api/#runasync
</script>
```

## 自动请求示例

- 在`vue`文件中使用
``` vue
<template>
  <div class="list" v-loading="loading">
    <template v-if="data">
      <div v-for="(item, index) in data" :key="index">
        {{ item }}
      </div>
    </template>

  </div>
</template>
<script setup lang="ts" name="request">
import { listApi } from '@/api/example';
const { runAsync, loading, error, data } = listApi({ defaultParams: [{ page: 1, pageSize: 10 }], manual: false });//manual: false代表组件加载后自动请求接口
</script>
```
## `setup`外请求示例

`vue-request` 是专门为`setup`使用的一个类库，详情请参考[issues:149](https://github.com/AttoJS/vue-request/issues/149)。
在`setup`外使用时应该直接使用`axios`,`request`函数允许接收一个参数直接返回`axios`实例

- 在`@/api/routeMenu.ts`加入接口声明代码
  
```ts
import { request } from '@/utils/request';
import { RouteRecordRaw } from 'vue-router';

export function menuApi<T extends boolean = true>(
  options: RequestOptions<RouteRecordRaw[], []> = {},
  returnAxios: T = true as T,
) {
  return request(
    () => ({
      url: '/api/menu/list',
      method: 'get',
    }),
    options,
    returnAxios,
  );
}

```

- 在setup外使用

```ts
console.log(await menuApi()());
```