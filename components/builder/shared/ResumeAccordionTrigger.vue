<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '@radix-icons/vue'
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionHeader class="flex flex-1 items-center justify-between">
    <slot />
    <div class="flex gap-x-2">
      <slot name="header"></slot>

      <AccordionTrigger v-bind="delegatedProps" :class="cn(
        'flex items-center justify-end gap-x-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        props.class,
      )
        ">

        <slot name="icon">
          <ChevronDownIcon class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </slot>

      </AccordionTrigger>
    </div>
  </AccordionHeader>
</template>
