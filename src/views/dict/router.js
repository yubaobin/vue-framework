/* 用于区分其他模块 */
const namespace = 'DemoDict'
/* 路由路径 */
const routePath = '/demo-dict'
/* 模块主目录 */
const basePath = 'dict'
export default [
    {
        path: routePath,
        name: 'admin',
        component: 'layout/index',
        redirect: `${routePath}/index`,
        children: [
            {
                path: `${routePath}/index`,
                name: `${namespace}Index`,
                component: `views/${basePath}/index`,
                meta: { icon: 'cluster', title: '字典值使用' }
            }
        ]
    }
]
