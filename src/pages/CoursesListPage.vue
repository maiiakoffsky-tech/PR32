<template>
    <div class="page">
        <h1>Каталог курсов</h1>
        <div class="filters">
            <button :class="{ active: currentCategory === 'all' }" @click="setCategory('all')">Все</button>
            <button :class="{ active: currentCategory === 'language' }" @click="setCategory('language')">Языки</button>
            <button :class="{ active: currentCategory === 'special' }" @click="setCategory('special')">Спецкурсы</button>
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
    }, 1500)
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