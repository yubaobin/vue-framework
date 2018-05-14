import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import About from '@/pages/about'
import Demo from '@/pages/demo'
import store from '@/store'

Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(from.name && to.path == '/') {
    store.dispatch('animSwitch', { animtype: 'right' });
  }else {
    store.dispatch('animSwitch', { animtype: 'left' });
  }
  next()
})

export default router
