import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/dashboard',
      component: () => import('./views/Home'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          title: 'Dashboard',
          component: () => import('./views/Dashboard')
        }
      ]
    }
  ]
})
