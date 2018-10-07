import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Home = () => import('./views/Home.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }]
})
