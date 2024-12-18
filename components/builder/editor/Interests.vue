<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    interestSchema,
    type SectionItem,
    defaultInterest,
    type Interest,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";


const formSchema = interestSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Interest>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultInterest,
    validationSchema: validationSchema,
});


const resumeStore = useResumeStore();


const onChange = (value: string) => {
    console.log(value)
    resumeStore.setValue(`sections.interests.items[${props.index}].summary`, value);
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [name, nameAttrs] = defineField('name');
const [keywords, keywordsAttrs] = defineField('keywords');

</script>

<template>
    <form @change="onSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Label>Name</Label>
                <Input v-model="name" name="name" v-bind="nameAttrs" />
            </div>

            <div>
                <Label>Keywords</Label>
                <BadgeInput v-model="keywords" name="keywords" v-bind="keywordsAttrs" />
            </div>

        </div> 
    </Form>
</template>