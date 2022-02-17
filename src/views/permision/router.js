/* 用于区分其他模块 */
const namespace = 'admin'
/* 路由路径 */
const routePath = '/admin'
/* 模块主目录 */
const basePath = 'permision'
export default [
    {
        path: routePath,
        name: 'admin',
        component: 'layout/index',
        redirect: `${routePath}/index`,
        meta: { roles: ['admin'] },
        children: [
            {
                path: `${routePath}/index`,
                name: `${namespace}Index`,
                component: `views/${basePath}/admin`,
                meta: { icon: 'cluster', title: '管理员', roles: ['admin'] }
            }
        ]
    }
]
