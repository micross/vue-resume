<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    volunteerSchema,
    type SectionItem,
    defaultVolunteer,
    type URL,
    type Volunteer,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import { ref } from "vue";
import {UrlInput} from "../shared";
import TiptapEditor from '../shared/TiptapEditor.vue'


const formSchema = volunteerSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Volunteer>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultVolunteer,
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
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [organization, organizationAttrs] = defineField('organization');
const [position, positionAttrs] = defineField('position');
const [date, dateAttrs] = defineField('date');
const [location, locationAttrs] = defineField('location');
const [url, urlAttrs] = defineField('url');
const [summary, summaryAttrs] = defineField('summary');

</script>

<template>
    <form @change="onSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Label>Organization</Label>
                <Input v-model="organization" name="organization" v-bind="organizationAttrs" />
            </div>

            <div>
                <Label>Position</Label>
                <Input v-model="position" name="position" v-bind="positionAttrs" />
            </div>

            <div>
                <Label>Date</Label>
                <Input v-model="date" name="date" v-bind="dateAttrs" />
            </div>

            <div>
                <Label>Location</Label>
                <Input v-model="location" name="location" v-bind="locationAttrs" />
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