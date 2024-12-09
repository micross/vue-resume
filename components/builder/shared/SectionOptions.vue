<script setup lang="ts">
import {
  PhArrowCounterClockwise,
  PhBroom,
  PhEye,
  PhEyeSlash,
  PhList,
  PhPencilSimple,
  PhTrashSimple,
} from "@phosphor-icons/vue";
import _ from "lodash";
import get from "lodash.get";
import { Plus, Columns } from "lucide-vue-next";
import {
  type SectionKey,
  defaultSections,
  type SectionWithItem,
  type ID,
  SectionModel,
} from "~/lib/schema";

type Props = { id: ID };

const props = defineProps<Props>()

const resumeStore = useResumeStore();

const originalName = _.find(defaultSections, { 'id': props.id }) as SectionWithItem;

const section = _.find(resumeStore.$state.resume.data.sections, { 'id': props.id }) as SectionWithItem;
//console.log(section)

const hasItems = computed(() => "items" in section);
const isCustomSection = computed(() => section.model === SectionModel.CUSTOM);

const onCreate = () => {
  // open("create", { id });
};

const toggleSeperateLinks = (checked: boolean) => {
  const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.id);
  resumeStore.setValue(`sections[${index}].separate_links`, checked);
};

const toggleVisibility = () => {
  const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.id);
  resumeStore.setValue(`sections[${index}].visible`, !section.visible);
};

const onResetName = () => {
  const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.id);
  resumeStore.setValue(`sections[${index}].name`, originalName);
};

const onChangeColumns = (value: string) => {
  const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.id);
  resumeStore.setValue(`sections[${index}].columns`, Number(value));
};

const onResetItems = () => {
  const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.id);
  resumeStore.setValue(`sections[${index}].items`, []);
};

const onRemove = () => {
  resumeStore.removeSection(props.id);
};

</script>

<template>
  <div class="flex gap-x-2">
    <PhEye v-if="section.visible" @click="toggleVisibility" />
    <PhEyeSlash v-else  @click="toggleVisibility" />

    <PhTrashSimple v-if="isCustomSection" @click="onRemove" />


  </div>

</template>