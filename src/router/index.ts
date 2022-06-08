import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import workHours from './workHours'
declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    title?: string
  }
}
const originRoutes: RouteRecordRaw[] = [
  {
    path: '/homePage',
    name: 'HomePage',
    alias: '/',
    meta: {
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "base" */ '@/views/HomePage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "notice" */ '@/views/NotFound.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...originRoutes, ...workHours]
})

export default router
