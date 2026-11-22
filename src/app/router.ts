import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/', name: 'feed', component: () => import('../pages/feed/ui/FeedPage.vue')
    },
    {
        path: '/login', name: 'login', component: () => import('../pages/login/ui/LoginPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router