import { ref } from "vue";
import { defineStore } from "pinia";


export const useSessionStore = defineStore('session', () => {
    const isAuthenticated = ref(!!localStorage.getItem('accessToken'))
    
    const setAuth = (token: string) => {
        localStorage.setItem('accessToken', token)
        isAuthenticated.value = true
    }
    const clearAuth = () => {
        localStorage.removeItem('accessToken')
        isAuthenticated.value = false
    }

    return {
        isAuthenticated,
        setAuth,
        clearAuth,
    }
})