import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import BookDetail from '@/components/BookDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/detail/:index',
      name: 'BookDetail',
      component: BookDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
