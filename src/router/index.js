import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config'
import { baseRouter } from './route.config'
Vue.use(Router)

const createRouter = () =>
    new Router({
        mode: config.routeMode,
        base: config.routeMode === 'history' ? process.env.BASE_URL : '',
        scrollBehavior: () => ({ y: 0 }),
        routes: [...baseRouter]
    })

const router = createRouter()

// 重置路由
export const resetRouter = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
