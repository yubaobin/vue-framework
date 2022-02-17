/*
 * 基础数据
 * */
const path = '/welcome'
const name = 'Welcome'
export default [
    {
        path: path,
        component: 'layout/index',
        hidden: true,
        meta: { title: '基础数据', icon: 'cluster' },
        children: [
            {
                path: '',
                name: `${name}Index`,
                component: 'views/welcome/index'
            }
        ]
    }
]
