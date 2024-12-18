<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    skillSchema,
    type SectionItem,
    defaultSkill,
    type Skill,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import BadgeInput from "~/components/ui/badge-input/BadgeInput.vue";


const formSchema = skillSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Skill>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultSkill,
    validationSchema: validationSchema,
});


const resumeStore = useResumeStore();

const onChange = (value: string) => {
    console.log(value)
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}].summary`, value);
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const removeKeyword = (field: any, item: string) => {
    field.onChange(field.value.filter((v: string) => item !== v))
}

const [name, nameAttrs] = defineField('name');
const [description, descriptionAttrs] = defineField('description');
const [level, levelAttrs] = defineField('level');
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
                <Label>Description</Label>
                <Input v-model="description" name="description" v-bind="descriptionAttrs" />
            </div>

            <div>
                <Label>Level</Label>
                <Input v-model="level" name="level" v-bind="levelAttrs" />
            </div>

            <div>
                <Label>Keywords</Label>
                <BadgeInput v-model="keywords" name="keywords" v-bind="keywordsAttrs" />

                <div class="flex flex-wrap items-center gap-x-2 gap-y-3">
                    <TransitionGroup name="list" tag="div" class="flex flex-wrap items-center gap-x-2 gap-y-3">
                        <div v-for="(item, index) in keywords" :key="item" class="list-item">
                            <Badge class="cursor-pointer" @click="removeKeyword(keywords, item)">
                                <span class="mr-1">{{ item }}</span>
                                <X :size="12" weight="bold" />
                            </Badge>
                        </div>
                    </TransitionGroup>
                </div>

            </div>

        </div>
    </Form>
</template>