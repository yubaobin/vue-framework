// 增删改查（弹窗）
import crudModelRoute from './model/router'
// 增删改查（页面）
import crudPageRoute from './page/router'
/* 用于区分其他模块 */
const namespace = 'CrudTemplate'
/* 模块主目录 */
const routePath = '/crud-template'

const crudModelRouter = crudModelRoute(routePath, namespace)
const crudPageRouter = crudPageRoute(routePath, namespace)
export default [
    {
        path: routePath,
        component: 'layout/index',
        redirect: `${routePath}/${crudModelRouter[0].path}`,
        meta: {
            roles: ['admin'],
            title: '增删改查',
            icon: 'cluster',
            breadcrumb: false
        },
        children: [...crudModelRouter, ...crudPageRouter]
    }
]
