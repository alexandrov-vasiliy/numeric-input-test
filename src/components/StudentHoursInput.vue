<template>
  <div class="flex items-center gap-2 group" :class="{'focused': isFocused}">
    <div class="rounded-full group-[.focused]:border-primary group-[.focused]:border">
      <div class="p-1 rounded-full w-20 h-20 ">
        <img v-if="student.image" :src="student.image" alt="student-avatar">
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label class="student-name font-koulen text-base text-dark group-[.focused]:text-primary" for="hours-old">{{ student.name }} is</label>
      <div class="flex gap-2 items-baseline">
        <input
          :value="formattedModelValue"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          :style="{width: inputWidth}"
          name="hours-old"
          id="hours-old"
          class="min-w-[72px] text-light-gray outline-none h-[44px] rounded-md p-2 border-[1.5px] border-light-gray group-[.focused]:border-primary-light group-[.focused]:text-dark"
          type="text"
          inputmode="numeric"
        />
        <span ref="textWidthElement" class="absolute invisible">{{ formattedModelValue }}</span>
        <div class="text-dark text-lg">hours old</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Student } from '@/interfaces/student'

interface Props {
  student: Student;
  modelValue: number | null;
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 9,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void;

}>()

const isFocused = ref(false)
const textWidthElement = ref<HTMLElement | null>(null)

const cleanValue = (value: string) => {
  return value.replace(/\D/g, '').slice(0, props.maxLength)
}

const formatValue = (value: string) => {
  if (value.length <= 0) return ''
  const limitedValue = cleanValue(value)
  return limitedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}


const formattedModelValue = computed(() => {
  return formatValue(props.modelValue?.toString() || '')
})

const onInput = (event: Event) => {
  const target = event.target
  if(target instanceof HTMLInputElement) {
    const cleaned = cleanValue(target.value)
    const formatted = formatValue(cleaned)
    target.value = formatted
    emit('update:modelValue', formatted === '' ? null : parseInt(cleaned))
  }
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
}

const inputWidth = computed(() => {
    return `${formattedModelValue.value.length + 1}ch`

})
</script>

<style scoped>

</style>