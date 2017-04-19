import Vue from 'vue'
import Router from 'vue-router'
import Book from '@/components/Book'
import BookDetail from '@/components/BookDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Book',
      component: Book
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
