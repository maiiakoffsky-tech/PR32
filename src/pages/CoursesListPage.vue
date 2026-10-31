<template>
    <div class="page">
        <h1>Каталог курсов</h1>

        <div class="filters">
            <button :class="{ active: currentCategory === 'all' }" @click="setCategory('all')">Все</button>
            <button :class="{ active: currentCategory === 'language' }" @click="setCategory('language')">Языки</button>
            <button :class="{ active: currentCategory === 'special' }"
                @click="setCategory('special')">Спецкурсы</button>
        </div>

        <div v-if="loading" class="spinner-box">
            <div class="spinner"></div>
            <p>Загрузка...</p>
        </div>

        <div v-else-if="filteredCourses.length > 0" class="courses-grid">
            <div v-for="course in filteredCourses" :key="course.id" class="card">
                <h3>{{ course.title }}</h3>
                <p class="category">Категория: {{ course.category }}</p>
                <RouterLink :to="{ name: 'Course', params: { id: course.id } }" class="btn-more">Подробнее</RouterLink>
            </div>
        </div>

        <p v-else>Курсы не найдены</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses.js'

const route = useRoute()
const router = useRouter()

const currentCategory = ref(route.query.category || 'all')
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})

const filteredCourses = computed(() => {
    if (currentCategory.value === 'all') return courses
    return courses.filter(c => c.category === currentCategory.value)
})

const setCategory = (category) => {
    currentCategory.value = category
    router.push({ name: 'Courses', query: { category: category } })
}
</script>

<style scoped>
.page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
}

.filters {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.filters button {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
}

.filters button.active {
    background: #42b983;
    color: white;
    border-color: #42b983;
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.card {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
}

.btn-more {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 12px;
    background: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.spinner-box {
    text-align: center;
    padding: 50px;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #42b983;
    border-radius: 50%;
    margin: 0 auto 10px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>