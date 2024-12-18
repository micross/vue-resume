<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    type SectionItem,
    type URL,
    type Basics,
    defaultBasics,
    basicsSchema,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import { UrlInput } from "../shared";
import { PictureSection } from "../picture";
import { CustomFieldsSection } from "../shared";

type FormValues = v.InferOutput<typeof basicsSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Basics>>()

const validationSchema = toTypedSchema(basicsSchema)

const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultBasics,
    validationSchema: validationSchema,
});


const resumeStore = useResumeStore();

const handleUrl = (value: URL) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}].url`, value);
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [name, nameAttrs] = defineField('name');
const [phone, phoneAttrs] = defineField('phone');
const [email, emailAttrs] = defineField('email');
const [url, urlAttrs] = defineField('url');
const [headline, headlineAttrs] = defineField('headline');
const [location, locationAttrs] = defineField('location');

</script>

<template>
    <form @change="onSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Label>Full Name</Label>
                <Input v-model="name" name="name" v-bind="nameAttrs" />
            </div>

            <div>
                <Label>Phone</Label>
                <Input v-model="phone" name="phone" v-bind="phoneAttrs" />
            </div>

            <div>
                <Label>Email</Label>
                <Input v-model="email" name="email" v-bind="emailAttrs" />
            </div>

            <div>
                <Label>Website</Label>
                <UrlInput v-model="url" placeholder="https://linkedin.com/in/johndoe" @update:modelValue="handleUrl"
                    v-bind="urlAttrs" />
            </div>

            <PictureSection :basics="props.item" :sectionId="props.sectionId" />

            <div>
                <Label>Headline</Label>
                <Input v-model="headline" name="headline" v-bind="headlineAttrs" />
            </div>

            <div>
                <Label>Location</Label>
                <Input v-model="location" name="location" v-bind="locationAttrs" />
            </div>

            <div class="sm:col-span-2">
                <CustomFieldsSection :basics="props.item" :sectionId="props.sectionId" :index="props.index" />
            </div>

        </div>
    </Form>
</template>