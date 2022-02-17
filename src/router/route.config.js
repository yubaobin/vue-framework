/**
 * 路由配置文件
 */
// 欢迎
import welcomeRoute from '../views/welcome/router'
/* 权限展示的路有 */
import adminRouter from '../views/permision/router'
/* 字典值使用 */
import dictRouter from '../views/dict/router'
/* 增删改查例子 */
import crudRouter from '../views/crud-template/router'
/* 基础路由 */
const baseRouter = [
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '',
        component: () => import('@/layout/index.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: { title: '首页', icon: 'home' },
                component: () => import('@/views/dashboard/index')
            }
        ]
    }
]

/* 需要权限控制的路由 */
const permissionRouter = [...adminRouter, ...dictRouter, ...crudRouter, ...welcomeRoute]

export { baseRouter, permissionRouter }
