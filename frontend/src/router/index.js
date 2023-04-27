import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Fleet from '../views/Fleet.vue'
import Employees from '../views/Employees.vue'
import LogInUp from '../views/LogInUp.vue'

const routes = [
  {
    path: '/',
    name: 'loginup',
    component: LogInUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/colaboradores',
    name: 'colaboradores',
    component: Employees
  },
  {
    path: '/frota',
    name: 'frota',
    component: Fleet
  },
  {
    path: '/estoque',
    name: 'Estoque',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Stock" */ '../views/Stock.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
