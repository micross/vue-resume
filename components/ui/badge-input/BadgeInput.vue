<script setup lang="ts">
import type { Input } from '#components';
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{
    modelValue: string[]
    setPendingKeyword?: (value: string) => void
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void
}>()

const inputRef = ref<InstanceType<typeof Input> | null>(null)
const label = ref('')

const processInput = () => {
    const newLabels = label.value
        .split(',')
        .map((str) => str.trim())
        .filter(Boolean)
        .filter((str) => !props.modelValue.includes(str))
    emit('update:modelValue', [...new Set([...props.modelValue, ...newLabels])])
    label.value = ''
}

watch(label, (newLabel) => {
    if (newLabel.includes(',')) {
        processInput()
    }
    if (props.setPendingKeyword) {
        props.setPendingKeyword(newLabel)
    }
})

const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        processInput()
    }
}

const onInput = (event: Event) => {
    label.value = (event.target as HTMLInputElement).value
}

defineExpose({ inputRef })
</script>

<template>
    <Input v-bind="$attrs" :value="label" @keydown="onKeyDown" @input="onInput" ref="inputRef" />
</template>