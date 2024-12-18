<script setup lang="ts">
import {
    Input,
    Avatar,
    AvatarImage,
} from "#components";
import { useForm } from "vee-validate";
import {
    profileSchema,
    type SectionItem,
    defaultProfile,
    type URL,
    type Profile,
} from "~/lib/schema";
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import { ref } from "vue";
import {UrlInput} from "../shared";


const formSchema = profileSchema;

type FormValues = v.InferOutput<typeof formSchema>;

export type Props<T extends SectionItem> = {
    item: T;
    index: number;
    sectionId: string
};

const props = defineProps<Props<Profile>>()
const validationSchema = toTypedSchema(formSchema)
const { defineField, handleSubmit } = useForm<FormValues>({
    initialValues: props.item || defaultProfile,
    validationSchema: validationSchema,
});

const iconSrc = ref("");
let iconChangeTimeout: number | null | NodeJS.Timeout = null;

const handleIconChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (iconChangeTimeout) {
        clearTimeout(iconChangeTimeout);
    }
    iconChangeTimeout = setTimeout(() => {
        if (target.value === "") {
            iconSrc.value = "";
        } else {
            iconSrc.value = `https://cdn.simpleicons.org/${target.value}`;
        }
    }, 400);
};

const resumeStore = useResumeStore();

const handleUrl = (value: URL) => {
    console.log(value)
    props.item.url = value
}

const onSubmit = handleSubmit(async (values: FormValues) => {
    const index = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    resumeStore.setValue(`sections[${index}].items[${props.index}]`, values);
});

const [network, networkAttrs] = defineField('network');
const [username, usernameAttrs] = defineField('username');
const [url, urlAttrs] = defineField('url');
const [icon, iconAttrs] = defineField('icon');

</script>

<template>
    <form @change="onSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Label>Network</Label>
                <Input v-model="network" name="network" placeholder="LinkedIn" v-bind="networkAttrs" />
            </div>

            <div>
                <Label>Username</Label>
                <Input v-model="username" name="username" placeholder="john.doe" v-bind="usernameAttrs" />
            </div>

            <div class="sm:col-span-2">
                <Label>Website</Label>
                <UrlInput v-model="url"  placeholder="https://linkedin.com/in/johndoe"
                :onUpdate="handleUrl" v-bind="urlAttrs" />
            </div>

            <div>
                <div class="sm:col-span-2">
                    <Label for="iconSlug">Icon</Label>
                        <div class="flex items-center gap-x-2">
                            <Avatar class="size-8 bg-white">
                                <AvatarImage v-if="iconSrc" class="p-1.5" :src="iconSrc" />
                            </Avatar>
                            <Input v-model="icon" id="iconSlug" placeholder="linkedin" @input="handleIconChange" v-bind="iconAttrs" />
                        </div>
                    <div class="ml-10">
                        'Powered by'
                        <a href="https://simpleicons.org/" target="_blank" rel="noopener noreferrer nofollow"
                            class="font-medium">
                            Simple Icons
                        </a>
                    </div>
                </div>
            </div>
        </div> 
    </Form>
</template>