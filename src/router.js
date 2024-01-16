import { createRouter, createWebHistory } from 'vue-router'
import Authentication from './views/Authentication.vue'

const routes = [
  {
    path: '/authentication',
    name: 'Login',
    component: Authentication
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router