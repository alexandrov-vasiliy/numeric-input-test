<template>
  <div class="max-w-lg mx-auto py-20">
    <StudentHoursInput :student="student" v-model="student.age"/>
    {{student.age}}
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import StudentHoursInput from '@/components/StudentHoursInput.vue'
import type { Student } from '@/interfaces/student'

const student = reactive<Student>({
  name: 'Hugh',
  age: null,
  image: '/images/avatar.png',
})
</script>

<style></style>
