<script setup lang="ts">
import {
    Input,
} from "#components";
import { useForm } from "vee-validate";
import {
    languageSchema,
    type SectionItem,
    defaultLanguage,
    type URL,
    type Language,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";


const formSchema = languageSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Language>>()
const validationSchema = toTypedSchema(formSchema)
const { errors, defineField, handleSubmit, setFieldValue } = useForm<FormValues>({
    initialValues: props.item || defaultLanguage,
    validationSchema: validationSchema,
});


const resumeStore = useResumeStore();

const handleUrl = (value: URL) => {
    console.log(value)
}

const onChange = (value: string) => {
    console.log(value)
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}].summary`, value);
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    console.log(values.level)
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [name, nameAttrs] = defineField('name');
const [description, descriptionAttrs] = defineField('description');
const [level, levelAttrs] = defineField('level');

const setLevel = (value) => setFieldValue('level', value as number);

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
                <Input v-model="level" name="level" type="number" v-bind="levelAttrs" />
                {{ errors.level }}
            </div>

            <Select v-model="level">
                <SelectTrigger>
                    <SelectValue>{{ level }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value=1>
                            m@example.com
                        </SelectItem>
                        <SelectItem value=2>
                            m@google.com
                        </SelectItem>
                        <SelectItem value=3>
                            m@support.com
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    </Form>
</template>