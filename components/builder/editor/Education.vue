<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    educationSchema,
    type SectionItem,
    defaultEducation,
    type URL,
    type Education,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import {UrlInput} from "../shared";
import TiptapEditor from '../shared/TiptapEditor.vue'


const formSchema = educationSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Education>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultEducation,
    validationSchema: validationSchema,
});


const resumeStore = useResumeStore();

const handleUrl = (value: URL) => {
    console.log(value)
    props.item.url = value
}

const onChange = (value: string) => {
    console.log(value)
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}].summary`, value);
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [institution, institutionAttrs] = defineField('institution');
const [study_type, study_typeAttrs] = defineField('study_type');
const [area, areaAttrs] = defineField('area');
const [score, scoreAttrs] = defineField('score');
const [date, dateAttrs] = defineField('date');
const [url, urlAttrs] = defineField('url');
const [summary, summaryAttrs] = defineField('summary');

</script>

<template>
    <form @change="onSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Label>Institution</Label>
                <Input v-model="institution" name="institution" v-bind="institutionAttrs" />
            </div>

            <div>
                <Label>Type of Study</Label>
                <Input v-model="study_type" name="study_type" v-bind="study_typeAttrs" />
            </div>


            <div>
                <Label>Area of Study</Label>
                <Input v-model="area" name="area" v-bind="areaAttrs" />
            </div>

            <div>
                <Label>Score</Label>
                <Input v-model="score" name="score" v-bind="scoreAttrs" />
            </div>

            <div>
                <Label>Date</Label>
                <Input v-model="date" name="date" v-bind="dateAttrs" />
            </div>

            <div class="sm:col-span-2">
                <Label>Website</Label>
                <UrlInput v-model="url"  placeholder="https://linkedin.com/in/johndoe"
                :onUpdate="handleUrl" v-bind="urlAttrs" />
            </div>

            <div class="sm:col-span-2">
                <Label>Summary</Label>
                <TiptapEditor v-model="summary" v-bind="summaryAttrs" @update:modelValue="onChange" />
            </div>

        </div> 
    </Form>
</template>