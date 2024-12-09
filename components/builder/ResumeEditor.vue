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
import ProfileEditorWraper from "./profiles/ProfileEditorWraper.vue";
import ExperienceEditorWraper from "./experience/ExperienceEditorWraper.vue";
import EducationEditorWraper from "./education/EducationEditorWraper.vue";
import SkillEditorWraper from "./skill/SkillEditorWraper.vue";
import LanguageEditorWraper from "./languages/LanguageEditorWraper.vue";
import { AwardsEditorWraper } from "./awards";
import { CertificationEditorWraper } from "./certifications";
import { InterestEditorWraper } from "./interests";
import { ProjectEditorWraper } from "./projects";
import { PublicationEditorWraper } from "./publications";
import { VolunteerEditorWraper } from "./volunteer";
import { ReferenceEditorWraper } from "./references";
import { SummaryEditorWraper } from "./summary";
import { CustomSectionEditorWraper } from "./custom";
import { SectionModel } from "~/lib/schema";
import { ResumeAccordionTrigger, SectionOptions } from "./shared";
import { BasicsEditorWraper } from "./basics";
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

</script>

<template>
  <div class="flex bg-secondary-accent/30 shadow-2xl rounded-lg">
    <div class="container mx-auto p-4 max-w-3xl contentHeight">
      <ScrollArea class="h-full flex-1 pb-16 lg:pb-0">
        <div class="grid gap-y-6 @container/left">
          <Accordion type="single" collapsible class="w-full">

            <VueDraggable v-model="sections" ref="el" @end="onEnd">
              <div v-for="section in sections">

                <AccordionItem v-if="section.model == SectionModel.BASICS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <BasicsEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.SUMMARY" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <SummaryEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.PROFILES" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <ProfileEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.EXPERIENCE" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <ExperienceEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.EDUCATION" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <EducationEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.SKILLS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <SkillEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.LANGUAGES" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <LanguageEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.AWARDS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <AwardsEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.CERTIFICATIONS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <CertificationEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.INTERESTS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <InterestEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.PROJECTS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <ProjectEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.PUBLICATIONS" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <PublicationEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.VOLUNTEER" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <VolunteerEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.REFERENCES" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <ReferenceEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem v-if="section.model == SectionModel.CUSTOM" :value="section.id"
                  class="container mx-auto p-2 max-w-3xl border-gray-200">
                  <ResumeAccordionTrigger>
                    {{ section.name }}
                    <template #header>
                      <SectionOptions :id="section.id" />
                    </template>
                  </ResumeAccordionTrigger>
                  <AccordionContent>
                    <CustomSectionEditorWraper :section="section" class="p-8" />
                  </AccordionContent>
                </AccordionItem>
              </div>
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