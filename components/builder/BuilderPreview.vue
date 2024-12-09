<script setup lang="ts">
import { useResumeStore } from "~/stores/resume";
import { pageSizeMap, rgbToHsl, type Template } from "~/lib/utils";
import { getTemplate } from "~/components/template";
import { Page } from "#components";
import type { SectionKey } from "~/lib/schema";
import { ScrollArea } from "~/components/ui/scroll-area";
import { MM_TO_PX } from "~/components/page";

const resumeStore = useResumeStore();
const template = computed(() => resumeStore.resume.data.metadata.template as Template);

let RTemplate = ref(getTemplate(template.value));

watch(template, () => { 
  RTemplate.value = getTemplate(template.value)
});
const format = computed(() => resumeStore.resume.data.metadata.page.format);

const style = {
  height: `calc(100vh - 64px)`,
  width: `${pageSizeMap[format.value].width * MM_TO_PX + 42}px`,
  gridTemplateColumns: `repeat(0, 1fr)`,
}

const convert = (a: string[][]) => a as SectionKey[][];

const metadata = ref(resumeStore.resume.data.metadata);

const family = ref(metadata.value.typography.font.family);
const variants = ref(metadata.value.typography.font.variants.join(","));
const subset = ref(metadata.value.typography.font.subset);
const fontSize = ref(`${metadata.value.typography.font.size}px`);
const lineHeight = ref(metadata.value.typography.line_height);
const margin = ref(`${metadata.value.page.margin}px`);

const foreground = ref(rgbToHsl(metadata.value.theme.text));
const primary = ref(rgbToHsl(metadata.value.theme.primary));
const background = ref(rgbToHsl(metadata.value.theme.background));

</script>

<template>
  <ScrollArea class="contentHeight flex-1 pb-16 lg:pb-0 shadow-2xl">
    <div class="w-full grid items-start justify-center space-x-12 pointer-events-none">
      <div class="grid items-start justify-center space-x-12 pointer-events-none" :style="style">
        <Page mode="builder">
          <RTemplate/>
        </Page>
      </div>
    </div>
  </ScrollArea>
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