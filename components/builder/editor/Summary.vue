<script setup lang="ts">
import { useForm } from "vee-validate";
import {
    summarySchema,
    type SectionItem,
    type Summary,
    defaultSummary,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import TiptapEditor from '../shared/TiptapEditor.vue'
import { cn} from "~/lib/utils";

const formSchema = summarySchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Summary>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultSummary,
    validationSchema: validationSchema,
});


const resumeStore = useResumeStore();

const onChange = (value: string) => {
    console.log(value)
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}].content`, value);
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});


const [content, contentAttrs] = defineField('content');


</script>

<template>
  <section id="summary" class="grid gap-y-6">
    <TooltipProvider :class="cn(!props.item.visible && 'opacity-50')">
      <TiptapEditor v-model="content" @update:modelValue="onChange">
      </TiptapEditor>
    </TooltipProvider>
  </section>
</template>