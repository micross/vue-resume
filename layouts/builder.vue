<script setup lang="ts">
import { useResumeStore } from '~/stores/resume';

const route = useRoute()
const id = route.params.id! as string;

const resume = await queryClient.fetchQuery({
  queryKey: ["resume", { id }],
  queryFn: () => findResumeById({ id }),
});

useResumeStore().$state.resume = resume.value;
</script>

<template>
    <TooltipProvider>
      <slot />
    </TooltipProvider>
</template>