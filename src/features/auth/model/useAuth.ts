import { ref } from "vue";
import { login, register } from "../api/auth.ts";
import { useSessionStore } from "../../../entities/session";

export const useAuth = () => {
    const loading = ref(false)
    const session = useSessionStore()

    const signIn = async (email: string, password: string) => {
        loading.value = true
        try {
            const data = await login({ email, password })
            session.setAuth(data.accessToken)
            return data.user
        } finally {
            loading.value = false
        }
    }
    const signUp = async(email: string, password: string, name: string) => {
        loading.value = true
        try {
            const data = await register({ email, password, name })
            session.setAuth(data.accessToken)
            return data.user
        } finally {
            loading.value = false
        }
    }
    const signOut = () => {
        session.clearAuth()
    }

    return {
        loading,
        signIn,
        signUp,
        signOut,
    }
}