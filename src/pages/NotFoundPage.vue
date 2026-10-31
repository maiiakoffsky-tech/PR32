<template>
    <div class="page">
        <h1>404 - Страница не найдена</h1>
        <p>Такой страницы не существует.</p>
        <RouterLink to="/courses" class="btn-home">Домой</RouterLink>
    </div>
</template>

<style scoped>
.page {
    text-align: center;
    padding: 50px;
    font-family: sans-serif;
}

.btn-home {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>