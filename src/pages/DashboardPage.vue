<template>
    <div class="page">
        <h1>Личный кабинет</h1>
        <p>Поздравляем, вы авторизованы</p>
        <button @click="logout" class="btn-logout">Сбежать</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
    localStorage.removeItem('authToken')
    router.push('/login')
}
</script>
