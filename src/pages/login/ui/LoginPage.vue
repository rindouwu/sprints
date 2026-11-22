<script setup lang="ts">
import { useRouter } from "vue-router";
import {useAuth} from "../../../features/auth";
import {ref} from "vue";
import {ApiError} from "../../../shared/api";

const router = useRouter()
const { signIn, signUp, loading } = useAuth()

const isRegister = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')
const error = ref<string | null>(null)

const handleSubmit = async () => {
  error.value = null
  try {
    if(isRegister.value) {
      await signUp(email.value, password.value, name.value)
    } else {
      await signIn(email.value, password.value)
    }
    router.push('/')
  } catch (e) {
    if(e instanceof ApiError) {
      error.value = e.message
    } else {
      error.value = "Что-то пошло не так"
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-500 px-4">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow border border-gray-100">
      <h1 class="text-2xl font-semibold text-center">
        {{ isRegister ? 'Регистрация' : 'Вход' }}
      </h1>
      <form @submit.prevent="handleSubmit">
        <div v-if="isRegister">
          <label class="text-sm font-medium">Имя</label>
          <input
              v-model="name"
              type="text"
              required
              class="w-full border px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Email</label>
          <input
              v-model="email"
              type="email"
              required
              class="w-full border px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Пароль</label>
          <input
              v-model="password"
              type="password"
              required
              class="w-full border px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
        </div>

        <p v-if="error" class="text-sm font-semibold text-red-500">{{ error }}</p>
        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {{ loading ? 'Загрузка...' : (isRegister ? 'Зарегестрироваться' : 'Войти') }}
        </button>
      </form>

      <p class="text-sm text-center text-gray-600">
        {{ isRegister ? 'Уже есть аккаунт?' : 'Нету аккаунта?' }}
        <button
          type="button"
          class="text-blue-600 font-medium"
          @click="isRegister = !isRegister; error = null"
        >
          {{ isRegister ? 'Войти' : 'Зарегестрироваться' }}
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>