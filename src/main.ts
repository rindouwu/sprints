import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './app/styles/style.css'
import App from './App.vue'
import router from '@/app/router'

createApp(App).use(router).use(createPinia()).mount('#app')