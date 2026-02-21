## 文件上传

本项目封装了文件上传组件，支持分片上传、秒传，直接使用即可。

多文件上传
```
  <me-upload v-model="files"></me-upload>
```

单文件上传
```
   <me-upload :limit="1" :model-value="info.avatar ? [info.avatar] : []" @update:model-value="(files) => (info.avatar = files.length ? files[0] : null)"></me-upload>
```
支持的props
```
showSelect:boolean 是否展示文件选择按钮，默认true
//其余 element-plus upload组件的所有属性

```
[ element-plus upload组件 文档](https://element-plus.org/zh-CN/component/upload#%E5%B1%9E%E6%80%A7)