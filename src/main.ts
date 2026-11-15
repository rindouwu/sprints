import { createApp } from 'vue'
import './app/styles/style.css'
import App from './App.vue'
import router from '@/app/router'

createApp(App).use(router).mount('#app')
