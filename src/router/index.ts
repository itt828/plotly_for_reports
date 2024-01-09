import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '../pages/HomePage.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePageVue
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
