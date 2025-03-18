import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/index.vue'
import LoginView from '@/views/login/index.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
