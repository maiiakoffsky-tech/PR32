<template>
    <div class="page">
        <h1>Личный кабинет</h1>
        <p>Поздлравляем, вы авторизованы</p>
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

<style scoped>
.page {
    text-align: center;
    padding: 50px;
    font-family: sans-serif;
}

.btn-logout {
    padding: 10px 20px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}
</style>