<template>
    <div class="flex items-center space-x-2">
      <div v-if="!isEditing" @click="startEditing" class="cursor-pointer">
        {{ modelValue }}
      </div>
      <Input
        v-else
        v-model="editValue"
        @blur="finishEditing"
        @keyup.enter="finishEditing"
        @keyup.esc="cancelEditing"
        ref="inputRef"
        class="w-full"
      />
      <Button v-if="!isEditing" @click="startEditing" variant="ghost" size="sm">
        <Pencil class="h-4 w-4" />
      </Button>
      <Button v-else @click="finishEditing" variant="outline" size="sm">
        <Check class="h-4 w-4" />
      </Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { Pencil, Check } from 'lucide-vue-next'
  
  const props = defineProps<{
    modelValue: string
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
  
  const isEditing = ref(false)
  const editValue = ref(props.modelValue)
  const inputRef = ref<HTMLInputElement | null>(null)
  
  watch(() => props.modelValue, (newValue) => {
    editValue.value = newValue
  })
  
  const startEditing = () => {
    isEditing.value = true
    editValue.value = props.modelValue
  }
  
  const finishEditing = () => {
    isEditing.value = false
    emit('update:modelValue', editValue.value)
  }
  
  const cancelEditing = () => {
    isEditing.value = false
    editValue.value = props.modelValue
  }
  </script>