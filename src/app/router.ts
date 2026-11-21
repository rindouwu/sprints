import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/', name: 'feed', component: () => import('../pages/feed/ui/FeedPage.vue')
    },
    {
        path: '/video/:id', name: 'video', component: () => import('../pages/video/ui/VideoPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router