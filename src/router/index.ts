import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '../pages/HomePage.vue'
import ScatterPlotVue from '../pages/ScatterPlot.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePageVue },
  { path: '/scatter', component: ScatterPlotVue }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
