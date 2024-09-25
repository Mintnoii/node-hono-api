# mint-admin

## 项目依赖

- UI 框架: [Naive UI](https://www.naiveui.com/)
- 图标库: [xicons](https://xicons.org/)
- 路由: [Vue Router](https://next.router.vuejs.org/)
- 样式: [UnoCSS](https://unocss.com/)

### 插件

- 路由生成：[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)
- 布局：[Vite-Plugin-Vue-Layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)

## 文档

参考 [基于 vite3 的 monorepo 前端工程搭建](https://juejin.cn/post/7238401671045939257)

## **一、技术栈选择**

### **1.代码库管理方式-Monorepo：** **将多个项目存放在同一个代码库中**

![](https://image.cubox.pro/cardImg/2023122623040233414/52636.jpg?imageMogr2/quality/90/format/gif/ignore-error/1)

▪ 选择理由 1：多个应用（可以按业务线产品粒度划分）在同一个 repo 管理，便于统一管理代码规范、共享工作流

▪ 选择理由 2：解决跨项目/应用之间物理层面的代码复用，不用通过发布/安装 npm 包解决共享问题

### **2.依赖管理-PNPM：** **消除依赖提升、规范拓扑结构**

▪ 选择理由 1：通过软/硬链接方式，最大程度节省磁盘空间

▪ 选择理由 2：解决幽灵依赖问题，管理更清晰

### **3.构建工具-Vite：基于 ESM 和 Rollup 的构建工具**

▪ 选择理由：省去本地开发时的编译过程，提升本地开发效率

### **4.前端框架-Vue3：Composition API**

▪ 选择理由：除了组件复用之外，还可以复用一些共同的逻辑状态，比如请求接口 loading 与结果的逻辑

### **5.模拟接口返回数据-Mockjs**

▪ 选择理由：前后端统一了数据结构后，即可分离开发，降低前端开发依赖，缩短开发周期

## **二、目录结构设计：重点关注 src 部分**

### **基于 domain 领域模式：根据业务模块集中管理**

```python
    mesh-fe
    ├── .husky                  #git提交代码触发
    │   ├── commit-msg
    │   └── pre-commit
    ├── mesh-server             #依赖的node服务
    │   ├── mock
    │   │   └── data-service   #mock接口返回结果
    │   └── package.json
    ├── README.md
    ├── package.json
    ├── pnpm-workspace.yaml     #PNPM工作空间
    ├── .eslintignore           #排除eslint检查
    ├── .eslintrc.js            #eslint配置
    ├── .gitignore
    ├── .stylelintignore        #排除stylelint检查
    ├── stylelint.config.js     #style样式规范
    ├── commitlint.config.js    #git提交信息规范
    ├── prettier.config.js      #格式化配置
    ├── index.html              #入口页面
    └── mesh-client             #不同的web应用package
        ├── vite-vue3
            ├── src                    #按业务领域划分
                ├── assets              #静态资源相关
                ├── components          #公共组件
                ├── domain              #领域
                │   ├── config.ts
                │   ├── service.ts
                │   ├── store.ts
                │   ├── type.ts
                ├── hooks               #逻辑复用
                ├── layout              #router中使用的父布局组件
                ├── router              #路由配置
                ├── utils
                │   ├── index.ts
                │   └── request.js     #Axios接口请求封装
                ├── views               #主要页面
                ├── main.ts             #js入口
                └── App.vue
```

## **三、搭建部分细节**

### **1.Monorepo+PNPM 集中管理多个应用（workspace）**

▪ 根目录创建 pnpm-workspace.yaml，mesh-client 文件夹下每个应用都是一个 package，之间可以相互添加本地依赖：pnpm install

```bash
packages:
  # all packages in direct subdirs of packages/
  - 'mesh-client/*'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

▪`pnpm install #安装所有package中的依赖`

▪`pnpm install -w axios #将axios库安装到根目录`

▪`pnpm --filter | -F <name> <command> #执行某个package下的命令`

▪ 与 NPM 安装的一些区别：

▪ 所有依赖都会安装到根目录 node_modules/.pnpm 下；

▪package 中 packages.json 中下不会显示幽灵依赖（比如 tslib@types/webpack-dev），需要显式安装，否则报错

▪ 安装的包首先会从当前 workspace 中查找，如果有存在则 node_modules 创建软连接指向本地 workspace

▪"mock": "workspace:\^1.0.0"

### **2.Vue3 请求接口相关封装**

▪request.ts 封装：主要是对接口请求和返回做拦截处理，重写 get/post 方法支持泛型

```typescript
import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 1000 * 60 * 5, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

const toLogin = (sso: string) => {
  const cur = window.location.href
  const url = `${sso}${encodeURIComponent(cur)}`
  window.location.href = url
}

// 服务器状态码错误处理
const handleError = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // todo
        toLogin(import.meta.env.VITE_APP_SSO)
        break
      // case 404:
      //   router.push('/404')
      //   break
      // case 500:
      //   router.push('/500')
      //   break
      default:
        break
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  const token = ''
  if (token) {
    config.headers!['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, handleError)

// response interceptor
service.interceptors.response.use((response: AxiosResponse<ResponseData>) => {
  const { code } = response.data
  if (code === '10000') {
    toLogin(import.meta.env.VITE_APP_SSO)
  } else if (code !== '00000') {
    // 抛出错误信息，页面处理
    return Promise.reject(response.data)
  }
  // 返回正确数据
  return Promise.resolve(response)
  // return response
}, handleError)

// 后端返回数据结构泛型，根据实际项目调整
interface ResponseData<T = unknown> {
  code: string
  message: string
  result: T
}

export const httpGet = async <T, D = any>(url: string, config?: AxiosRequestConfig<D>) => {
  return service.get<ResponseData<T>>(url, config).then((res) => res.data)
}

export const httpPost = async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
  return service.post<ResponseData<T>>(url, data, config).then((res) => res.data)
}

export { service as axios }

export type { ResponseData }
```

▪useRequest.ts 封装：基于 vue3 Composition API，将请求参数、状态以及结果等逻辑封装复用

```typescript
import { ref } from 'vue'
import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ResponseData } from '@/utils/request'
export const useRequest = <T, P = any>(api: (...args: P[]) => Promise<ResponseData<T>>, defaultParams?: P) => {
  const params = ref<P>() as Ref<P>
  if (defaultParams) {
    params.value = {
      ...defaultParams
    }
  }
  const loading = ref(false)
  const result = ref<T>()
  const fetchResource = async (...args: P[]) => {
    loading.value = true
    return api(...args)
      .then((res) => {
        if (!res?.result) return
        result.value = res.result
      })
      .catch((err) => {
        result.value = undefined
        ElMessage({
          message: typeof err === 'string' ? err : err?.message || 'error',
          type: 'error',
          offset: 80
        })
      })
      .finally(() => {
        loading.value = false
      })
  }
  return {
    params,
    loading,
    result,
    fetchResource
  }
}
```

▪API 接口层

```typescript
import { httpGet } from '@/utils/request'

const API = {
  getLoginUserInfo: '/userInfo/getLoginUserInfo'
}
type UserInfo = {
  userName: string
  realName: string
}
export const getLoginUserInfoAPI = () => httpGet<UserInfo>(API.getLoginUserInfo)
```

▪ 页面使用：接口返回结果 userInfo，可以自动推断出 UserInfo 类型，

```typescript
// 方式一：推荐
const { loading, result: userInfo, fetchResource: getLoginUserInfo } = useRequest(getLoginUserInfoAPI)

// 方式二：不推荐，每次使用接口时都需要重复定义type
type UserInfo = {
  userName: string
  realName: string
}
const { loading, result: userInfo, fetchResource: getLoginUserInfo } = useRequest<UserInfo>(getLoginUserInfoAPI)

onMounted(async () => {
  await getLoginUserInfo()
  if (!userInfo.value) return
  const user = useUserStore()
  user.$patch({
    userName: userInfo.value.userName,
    realName: userInfo.value.realName
  })
})
```

### **3.Mockjs 模拟后端接口返回数据**

```typescript
import Mock from 'mockjs'
const BASE_URL = '/api'
Mock.mock(`${BASE_URL}/user/list`, {
  code: '00000',
  message: '成功',
  'result|10-20': [
    {
      uuid: '@guid',
      name: '@name',
      tag: '@title',
      age: '@integer(18, 35)',
      modifiedTime: '@datetime',
      status: '@cword("01")'
    }
  ]
})
```

## **四、统一规范**

### **1.ESLint**

### **2.StyleLint**

### **3.Prettier**

### **4.CommitLint**

## 五、**附录**：技术栈图谱

![](https://image.cubox.pro/cardImg/2023122623040384795/46390.jpg?imageMogr2/quality/90/format/gif/ignore-error/1)
