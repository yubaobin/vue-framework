import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Login = () => import('./views/login.vue')
const Index = () => import('./views/index.vue')

const Example = () => import('./views/example.vue')
Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    component: Index,
    children: [{
      path: '',
      name: 'index',
      component: Example
    }]
  }]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  next()
})

export default router
