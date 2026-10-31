<template>
  <div class="tab-content">
    <div v-if="course">
      <div v-for="(review, index) in course.reviews" :key="index" class="review">
        <p><strong>{{ review.author }}</strong> (Оценка: {{ review.rating }})</p>
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
