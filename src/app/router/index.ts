import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router