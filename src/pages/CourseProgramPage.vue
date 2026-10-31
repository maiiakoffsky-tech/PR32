<template>
  <div class="tab-content">
    <ol v-if="course">
      <li v-for="(topic, index) in course.program" :key="index">{{ topic }}</li>
    </ol>
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
</style>