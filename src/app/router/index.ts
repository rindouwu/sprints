import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/HomePage.vue')
    },
    {
        path: '/books/:id',
        name: 'book-detail',
        component: () => import('@/pages/book-detail/BookDetailPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router