import {ref} from "vue";
import {login, register} from "../api/auth.ts";

export const useAuth = () => {
    const loading = ref(false)

    const signIn = async (email: string, password: string) => {
        try {
            const data = await login({ email, password })
            localStorage.setItem('accessToken', data.accessToken)
            return data.user
        } finally {
            loading.value = false
        }
    }
    const signUp = async(email: string, password: string, name: string) => {
        try {
            const data = await register({ email, password, name })
            localStorage.setItem('accessToken', data.accessToken)
            return data.user
        } finally {
            loading.value = false
        }
    }
    const signOut = () => localStorage.removeItem('accessToken')

    return {
        loading,
        signIn,
        signUp,
        signOut,
    }
}