import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Home = () => import('./views/Home.vue')
const Form = () => import('./views/Form.vue')
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/form',
    name: 'form',
    component: Form
  }]
})
