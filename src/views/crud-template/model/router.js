/*
 * 增删改查弹窗
 * */
export default function getRoute (parentPath, parentName) {
    const routePath = `${parentPath}/crud-model`
    const namespace = 'CrudModel'
    const basePath = 'crud-template/model'
    return [
        {
            path: `${routePath}`,
            name: `${parentName}${namespace}`,
            component: `views/${basePath}/index`,
            meta: { title: '增删改查(弹窗)' }
        }
    ]
}
