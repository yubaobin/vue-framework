import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Login = () => import('@/views/login.vue')
const Index = () => import('@/views/index.vue')

const table = () => import('@/views/table.vue')
Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    auth: false,
    component: Login
  }, {
    path: '/',
    component: Index,
    children: [{
      path: '/table',
      name: 'table',
      meta: {
        title: '表格',
        auth: false
      },
      component: table
    }]
  }]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
