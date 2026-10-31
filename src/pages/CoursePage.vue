<template>
  <div class="page">
    <RouterLink to="/courses" class="btn-back">Назад к курсам</RouterLink>
    
    <div v-if="course">
      <h1>{{ course.title }}</h1>
      <p class="category">Категория: {{ course.category }}</p>

      <div class="tabs">
        <RouterLink :to="`/courses/${course.id}/description`" class="tab">Описание</RouterLink>
        <RouterLink :to="`/courses/${course.id}/program`" class="tab">Программа</RouterLink>
        <RouterLink :to="`/courses/${course.id}/reviews`" class="tab">Отзывы</RouterLink>
      </div>
      <RouterView />
      <div class="buy-section">
        <button v-if="isBought" class="btn-bought" disabled>Куплено</button>
        <button v-else @click="buyCourse" class="btn-buy">Купить курс</button>
      </div>
    </div>

    <div v-else>
      <h2>Курс не найден</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses.js'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  id: { type: String, required: true }
})
//Покупка
const isAuth = ref(localStorage.getItem('authToken') === 'vhod')
const purchased = ref(JSON.parse(localStorage.getItem('purchasedCourses')) || [])
const course = computed(() => {
  return courses.find(c => c.id === Number(props.id))
})

const isBought = computed(() => {
  return purchased.value.includes(Number(props.id))
})

const buyCourse = () => {
  if (!isAuth.value) {
    router.push({ 
      name: 'Login', 
      query: { redirect: route.fullPath }
    })
    return
  }
  if (!purchased.value.includes(Number(props.id))) {
    purchased.value.push(Number(props.id)) // Vue видит это изменение
    localStorage.setItem('purchasedCourses', JSON.stringify(purchased.value))
  }
}
</script>