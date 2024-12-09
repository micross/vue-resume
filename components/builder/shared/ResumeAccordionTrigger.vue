<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ChevronRightIcon } from '@radix-icons/vue'
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionHeader class="flex flex-1 items-center justify-between">
    <AccordionTrigger v-bind="delegatedProps" :class="cn(
      'flex flex-1 items-center justify-start gap-x-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90',
      props.class,
    )
      ">
      <slot name="icon">
        <ChevronRightIcon class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </slot>
      <slot />

    </AccordionTrigger>
    <slot name="header"></slot>
  </AccordionHeader>
</template>
