<template>
  <div class="tab-content">
    <div v-if="course">
      <div v-for="(review, index) in course.reviews" :key="index" class="review">
        <p><strong>{{ review.author }}</strong> (Оценка: {{ review.rating }}/5)</p>
        <p>{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { courses } from '../data/courses.js'

const props = defineProps({
  id: { type: String, required: true }
})

const course = computed(() => courses.find(c => c.id === Number(props.id)))
</script>

<style scoped>
.tab-content { padding: 20px; background-color: rgb(252, 227, 145); border-radius: 20px; }
.review { border-bottom: 1px solid #ddd; padding: 10px 0; }
</style>