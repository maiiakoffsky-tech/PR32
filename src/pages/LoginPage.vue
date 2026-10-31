<template>
  <div class="page">
    <h1>Вход</h1>
    <form @submit.prevent="login" class="login-form">
      <input type="password" v-model="password" placeholder="Введите пароль (1234)">
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const password = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()

const login = () => {
  if (password.value === '1234') {
    localStorage.setItem('authToken', 'vhod')
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } else {
    error.value = 'Неверный пароль'
  }
}
</script>
