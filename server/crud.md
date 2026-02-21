# 一键crud
本项目支持根据数据库实体文件 一键生成crud
## 示例
- `pnpm meadmin crud exampleDemo --menu`  --menu 参数代表数据库同步生成后台菜单

运行后会生成以下文件
```
src/app/admin/dto/example/demoCreate.dto.ts 后端新增dto校验文件
src/app/admin/dto/example/demoUpdate.dto.ts 后端更新dto校验文件
src/app/admin/dto/example/demoQuery.dto.ts 后端查询入参dto校验文件
src/app/admin/service/example/demo.service.ts 后端service
src/app/admin/controller/example/demo.controller.ts 后端 controller
view/admin/src/api/example/demo.ts  前端 api接口定义 
view/admin/src/views/example/demo/lang/en.json 前端组件语言包 
view/admin/src/views/example/demo/dict.ts 前端字典
view/admin/src/views/example/demo/index.vue 前端字典列表组件
view/admin/src/views/example/demo/components/info.vue 前端字典详情组件
view/admin/src/views/example/demo/components/addOrUp.vue 前端字典新增/修改组件
```
## 参数说明
`pnpm meadmin [-m <char> 环境变量] crud entity实体文件 参数`

```
  --model <char>            model名称会放到app/{model}下对应的文件夹 (default: "admin")
  -f, --force               强制覆盖
  -n, --name <char>         使用的数据库配置defaultDataSourceName
  -d, --dbConfig <char>     数据库配置文件地址默认为当前目录下dist/config/database.js (default: "G:\\my\\meadmin\\dist\\config\\database.js")        
  --del                     删除crud创建的文件
  --path <char>             生成的路径，默认根据驼峰转多级路径
  -c, --controller <char>   生成的controller路径，默认使用path
  --menu                    生成菜单
  --cov, --coverage <char>  生成代码发覆盖范围：b后端代码、a前端api接口代码、v前端view 代码、p后台权限校验，默认值bavp (default: "bavp")
```
例如 `pnpm meadmin -m dev crud exampleDemo --menu` 加载`dev`环境变量根据`dist/entities/exampleDemo.entity.js`生成对应的文件并创建菜单。

## 规则
自动生成具有以下规则
- 根据`swagger`规则自动创建 必填、min、max、mobile、email校验规则
- 以“名称:值1=说明1;值2=说明2”，格式声明的备注会自动创建字典和下拉列表，并且支持number、string两种类型
- 根据枚举值自动创建 select下拉选项
- `BelongsToMany`及 `BelongsTo`关联自动创建远程下拉搜索
- 以`At`结尾自动创建时间范围筛选
- 关联`File`实体自动应用文件上传组件