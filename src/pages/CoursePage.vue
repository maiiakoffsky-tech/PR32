<template>
  <div class="page">
    <RouterLink to="/courses" style="color: #42b983; text-decoration: none;">Назад к курсам</RouterLink>
    <h1 v-if="course">{{ course.title }}</h1>
    <p v-if="course">Категория: {{ course.category }}</p>
    <div class="tabs" v-if="course">
      <RouterLink :to="`/courses/${course.id}/description`" class="tab">Описание</RouterLink>
      <RouterLink :to="`/courses/${course.id}/program`" class="tab">Программа</RouterLink>
      <RouterLink :to="`/courses/${course.id}/reviews`" class="tab">Отзывы</RouterLink>
    </div>
    <RouterView v-if="course" />
    <div v-else class="not-found">
      <h2>Курс не найден</h2>
      <RouterLink to="/courses">Вернуться к списку</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { courses } from '../data/courses.js'
const props = defineProps({
  id: { type: String, required: true }
})
const course = computed(() => {
  return courses.find(c => c.id === Number(props.id))
})
</script>

<style scoped>
.page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.tabs { display: flex; gap: 10px; margin: 20px 0; border-bottom: 1px solid #ddd; }
.tab { padding: 10px 15px; text-decoration: none; color: #666; border-bottom: 2px solid transparent; }
.tab.router-link-active { color: #42b983; border-bottom-color: #42b983; font-weight: bold; }
.not-found { text-align: center; padding: 40px; }
</style>