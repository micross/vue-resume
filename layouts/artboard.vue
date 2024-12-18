<script setup lang="ts">
import { rgbToHsl } from '~/lib/utils';
import { useResumeStore } from '~/stores/resume';

const route = useRoute()
const id = route.params.id! as string;

const resume = await queryClient.fetchQuery({
  queryKey: ["resume", { id }],
  queryFn: () => findResumeById({ id }),
});

useResumeStore().$state.resume = resume.value;
const metadata = resume.value.data.metadata;

const family = ref(metadata.typography.font.family);
const variants = ref(metadata.typography.font.variants.join(","));
const subset = ref(metadata.typography.font.subset);
const fontSize = ref(`${metadata.typography.font.size}px`);
const lineHeight = ref(metadata.typography.line_height);
const margin = ref(`${metadata.page.margin}px`);

const foreground = ref(rgbToHsl(metadata.theme.text));
const primary = ref(rgbToHsl(metadata.theme.primary));
const background = ref(rgbToHsl(metadata.theme.background));

</script>

<template>
    <div>
      <slot />
    </div>
</template>

<style scoped>
* {
    line-height: v-bind(lineHeight);
    font-size: v-bind(fontSize);
    --margin: v-bind(margin);
    --font-size: v-bind(fontSize);
    --line-height: v-bind(lineHeight);
    --foreground: v-bind(foreground);
    --primary: v-bind(primary);
    --background: v-bind(background);
    font-family: v-bind(family);
    font-variant: v-bind(variants);
}
</style>