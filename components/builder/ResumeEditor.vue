<script setup lang="ts">
import {
  ScrollArea,
  Accordion,
  Button,
  AccordionItem,
  AccordionContent,
} from "#components";
import { PlusCircle } from "lucide-vue-next";
import { PhDotsSixVertical } from "@phosphor-icons/vue";
import EditorWraper from './EditorWraper.vue';
import { SectionModel } from "~/lib/schema";
import { ResumeAccordionTrigger, SectionOptions, InlineEdit } from "./shared";
import { ref } from 'vue'
import {
  type SortableEvent,
  type UseDraggableReturn,
  VueDraggable
} from 'vue-draggable-plus'
import { arrayMoveImmutable } from 'array-move';

const resumeStore = useResumeStore();
const sections = computed(() => resumeStore.$state.resume.data.sections);

const el = ref<UseDraggableReturn>();
const onEnd = (e: SortableEvent) => {
  if (e.oldIndex !== e.newIndex) {
    const sortedList = arrayMoveImmutable(sections.value, e.oldIndex as number, e.newIndex as number);
    resumeStore.setValue("sections", sortedList);
  }
}

const onSetName = (value: string, id: string) => {
  const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === id);
  resumeStore.setValue(`sections[${index}].name`, value);
};

</script>

<template>
  <div class="flex bg-secondary-accent/30 shadow-2xl rounded-lg">
    <div class="container mx-auto p-4 max-w-3xl contentHeight">
      <ScrollArea class="h-full flex-1 pb-16 lg:pb-0">
        <div class="grid gap-y-6 @container/left">
          <Accordion type="multiple" collapsible class="w-full">
            <VueDraggable v-model="sections" ref="el" @end="onEnd">

              <AccordionItem v-for="section in sections" :value="section.id"
                class="container mx-auto p-2 max-w-3xl border-gray-200">
                <ResumeAccordionTrigger>
                  <div class="flex gap-x-4 place-items-center">
                    <InlineEdit v-model="section.name" @update:modelValue="onSetName($event, section.id)"/>
                  </div>

                  <template #header>
                    <SectionOptions :id="section.id" />
                  </template>
                </ResumeAccordionTrigger>
                <AccordionContent>
                  <EditorWraper :section="section" class="p-8" />
                </AccordionContent>
              </AccordionItem>
              
            </VueDraggable>
          </Accordion>

          <Button size="lg" variant="outline" @click.prevent="resumeStore.addSection">
            <PlusCircle />
            <span class="ml-2">Add a new section</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>