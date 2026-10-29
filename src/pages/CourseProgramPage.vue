<template>
    <div class="tab-content">
        <ol>
            <li c-for="(topic, index) in course.program" :key="index">{{ topic }}</li>
        </ol>
    </div>
</template>
<script setup>
import { inject } from 'vue'
const course = inject('courseData')
</script>
<style scoped>
.tab-content {
    padding: 20px;
    background-color: aquamarine;
    border-radius: 8px;
}
</style>