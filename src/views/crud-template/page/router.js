/*
 * 增删改查页面
 * */
export default function getRoute (parentPath, parentName) {
    const routePath = parentPath + '/crud-page'
    const namespace = 'CrudPage'
    const basePath = 'crud-template/page'
    return [
        {
            path: `${routePath}`,
            name: `${parentName}${namespace}`,
            component: 'layout/child-layout',
            redirect: `${routePath}/index`,
            meta: { title: '增删改查(页面)' },
            children: [
                {
                    path: `${routePath}/index`,
                    name: `${parentName}${namespace}Index`,
                    component: `views/${basePath}/index`,
                    meta: { title: '增删改查(页面)', breadcrumb: false }
                },
                {
                    path: `${routePath}/addOrEdit/:id`,
                    name: `${parentName}${namespace}AddOrEditModel`,
                    hidden: true,
                    component: `views/${basePath}/add-or-edit-model`,
                    meta: {
                        title: '新增',
                        activeMenu: `${routePath}/index`
                    }
                },
                {
                    path: `${routePath}/viewDetail/:id`,
                    name: `${parentName}${namespace}DetailModel`,
                    hidden: true,
                    component: `views/${basePath}/detail-model`,
                    meta: {
                        title: '详情',
                        activeMenu: `${routePath}/index`
                    }
                }
            ]
        }
    ]
}
