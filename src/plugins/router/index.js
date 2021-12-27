import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import NotFound from '@/pages/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
        path: '*',
        name: 'notFound',
        component: NotFound
    }
  ],
  mode: 'history'
})
