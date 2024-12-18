<script setup lang="ts">
import {
  Button
} from "#components";
import { createId } from "@paralleldrive/cuid2";
import { X, Plus } from "lucide-vue-next";
import { cn } from "~/lib/utils";
import type { Basics, CustomField as ICustomField, SectionWithItem } from "~/lib/schema";
import { CustomFieldInput } from ".";
import _ from "lodash";

type Props = {
  className?: string;
  basics: Basics;
  sectionId: string;
  index: number;
};

const props = defineProps<Props>()

const resumeStore = useResumeStore();
const sectionindex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
const basics = resumeStore.$state.resume.data.sections[sectionindex].items[props.index] as Basics

const onAddCustomField = () => {
  resumeStore.setValue(`sections[${sectionindex}].items[${props.index}].custom_fields`, [
    ...basics.custom_fields,
    { id: createId(), icon: "", name: "", value: "" },
  ]);
};

const onChangeCustomField = (field: ICustomField) => {
  const index = basics.custom_fields.findIndex((item) => item.id === field.id);
  const newCustomFields = JSON.parse(JSON.stringify(basics.custom_fields));
  newCustomFields[index] = field;
  console.log(newCustomFields)
  console.log(JSON.stringify(newCustomFields))
  console.log(`sections[${sectionindex}].items[${props.index}].custom_fields`)

  resumeStore.setValue(`sections[${sectionindex}].items[${props.index}].custom_fields`, newCustomFields);
};

const onReorderCustomFields = (values: ICustomField[]) => {
  resumeStore.setValue(`sections[${sectionindex}].items[${props.index}].custom_fields`, values);
};

const onRemoveCustomField = (id: string) => {
  resumeStore.setValue(
    `sections[${sectionindex}].items[${props.index}].custom_fields`,
    basics.custom_fields.filter((field) => field.id !== id)
  );
};

</script>

<template>
  <div :class="cn('space-y-4', className)">

    <CustomFieldInput v-for="(field, index) of basics.custom_fields" :key="field.id" :field="field"
      :onChange="onChangeCustomField" :onRemove="onRemoveCustomField" />

    <Button variant="default" @click.prevent="onAddCustomField">
      <Plus class="mr-2" />
      <span>Add a custom field</span>
    </Button>
  </div>
</template>