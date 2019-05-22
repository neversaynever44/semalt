import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/dashboard',
      component: Home,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          title: 'Dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})
