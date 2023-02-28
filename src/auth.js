import router from './router'
import store from './store/index'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
import { addCssByLink, clearTheme, isEmpty } from './utils'
import { systemDict } from './plugins/system-dict/index'

function initTheme () {
    const themeName = store.getters.themeName
    clearTheme()
    if (themeName && themeName !== 'normal') {
        const now = new Date().getTime()
        addCssByLink(`${window.baseUrl}/theme/${themeName}/index.css?t=${now}`, () => {
            document.body.classList.add(`${themeName}-theme`)
        })
    }
}

const checkPermissionByMock = async (to, from, next) => {
    const roles = store.getters.roles
    if (roles && roles.length) {
        if (to.matched.length) {
            next()
        } else {
            next('/404')
        }
    } else {
        const { roles = [] } = await store.dispatch('user/getUserInfoByMock')
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        router.addRoutes(accessRoutes)
        await systemDict.checkDictDone()
        initTheme()
        next({ ...to, replace: true })
    }
}

router.beforeEach((to, from, next) => {
    console.log('即将访问路由：' + (to.name || to.path))
    progress.start()
    if (isEmpty(history.state.current)) {
        Object.assign(history.state, { current: from.fullPath })
    }
    checkPermissionByMock(to, from, next).then(() => {})
})
router.afterEach(() => {
    progress.done()
})
