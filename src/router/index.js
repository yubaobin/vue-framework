import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Login = () => import('@/views/login.vue')
const Index = () => import('@/views/index.vue')
const NotFoundComponent = () => import('@/views/error/404')

const table = () => import('@/views/common/table.vue')
const table2 = () => import('@/views/common/table2.vue')
const form = () => import('@/views/common/form.vue')

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '*',
    component: NotFoundComponent
  }, {
    path: '/login',
    name: 'login',
    auth: false,
    component: Login
  }, {
    path: '/',
    component: Index,
    children: [{
      path: '/table1',
      name: 'table1',
      meta: {
        title: '表格1',
        auth: false
      },
      component: table
    }, {
      path: '/table2',
      name: 'table2',
      meta: {
        title: '表格2',
        auth: false
      },
      component: table2
    }, {
      path: '/form1',
      name: 'form',
      meta: {
        title: '表单',
        auth: false
      },
      component: form
    }]
  }]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
