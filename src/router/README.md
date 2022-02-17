## 配置
> baseRouter配置的路由不会经过权限过滤，任何人都可以访问


> permissionRouter配置的路由会经过权限过滤，只有有权限的人才能访问

### `{ Route }` 对象
| 参数     | 说明                                      | 类型    | 默认值 |
| -------- | ----------------------------------------- | ------- | ------ |
| redirect | 重定向地址, 访问这个路由时,自定进行重定向 | string  | -      |
| name     | 路由名称, 建议设置,且不能重名            | string  | -      |
| meta     | 路由元信息（路由附带扩展信息）            | object  | {}     |
| component     | 组件            | string |  -  |
| hidden   |  如果使用layout的组件，用于判断是非在菜单中隐藏 | boolean | false

#### component
- baseRouter配置的component

```
component: () => import('path')
```

> path是相对项目中的路径(全路径)

- permissionRouter配置的component

> 这里组件配置的path是字符串，从src/目录下开始找
> 注意和baseRoute区分
```
component: path
```
> 如：
```
| src
| -- views
| -- -- component1.vue
```
> 要配置的路由组件是component1时，我们的component为 'views/component1'
```
component: 'views/component1'
```


### `{ Meta }` 路由元信息对象

| 参数                | 说明                                                         | 类型    | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------- | ------ |
| title               | 路由标题, 用于显示面包屑, 页面标题 *推荐设置                 | string  | -      |
| roles          | 与项目提供的权限拦截匹配的权限，如果不匹配，则会被禁止访问该路由页面 | array   | []     |
| icon          | 如果使用layout的组件，用于菜单的图标   | ''    |

> roles可在config.js 配置topLevel字段，改字段配置的角色相当于可以查看所有路由

### 例子
```
const baseRouter = [{
	...,
  path: '',
  name: 'dashboard',
  redirect: '/dashboard'
  component: () => import('@/views/dashboard/index.vue'),
  hidden: false,
  children: [{
    path: '/dashboard',
    name: 'dashboard',
    hidden: false,
    meta: { title: '首页', icon: 'home' },
    component: () => import('@/views/dashboard/index')
  }]
  ...,

}]
const permissionRouter = [{
	...,
  path: '/admin',
  name: 'admin',
  component: 'layout/index', // 字符串
  redirect: '/admin/index',
  meta: { roles: ['admin'] }, // 只有角色为admin（ userInfo中的roles包含['admin'] ) 才能访问
  children: [{
    path: 'index',
    name: 'adminIndex',
    component: 'views/admin', // 字符串
    meta: { icon: 'cluster', title: '管理员', roles: ['admin'] },
    permissionBtns: ['btn1', 'btn2']
  }]
  ...,

}]
export {
    baseRouter,
    permissionRouter
}
```

> 如果父路由添加了roles字段，并且父路由没有权限，那么子路由也没有权限

## 异步获取路由信息
推荐在vuex中的action获取路由信息
```
| src
| -- store
| -- -- modules
| -- -- -- permission.js
```

找到action的generateRoutes函数
```
...
const actions = {
	generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      // 可以发请求获取菜单 permission 的值
      // const permission = [{
      //   path: '/dashboard',
      //   name: 'Dashboard',
      //   component: '字符串', 通过字符串拼接组件获取
      //   meta: { title: '首页', icon: 'home', noCache: true }
      // }]
      fetch('getMenuApi').then(res => {
      	const permiseRoute = res.data
	      const accessedRoutes = filterRoutes(permiseRoute, roles)
	      commit('SET_ROUTES', accessedRoutes)
	      resolve(accessedRoutes)
      })
    })
  }
}
...
```
