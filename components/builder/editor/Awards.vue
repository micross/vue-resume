<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    type SectionItem,
    type URL,
    awardSchema,
    defaultAward,
    type Award,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import {UrlInput, TiptapEditor} from "../shared";


const formSchema = awardSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Award>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultAward,
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
    console.log(values.summary)
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    console.log(index)
    console.log(props.sectionId)
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [title, titleAttrs] = defineField('title');
const [awarder, awarderAttrs] = defineField('awarder');
const [date, dateAttrs] = defineField('date');
const [url, urlAttrs] = defineField('url');
const [summary, summaryAttrs] = defineField('summary');

</script>

<template>
    <form @change="onSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Label>Title</Label>
                <Input v-model="title" name="title" v-bind="titleAttrs" />
            </div>

            <div>
                <Label>Awarder</Label>
                <Input v-model="awarder" name="awarder" v-bind="awarderAttrs" />
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