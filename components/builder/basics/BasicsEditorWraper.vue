<script setup lang="ts">
import {
    Button,
} from "#components";
import { cn } from "~/lib/utils";
import { PhPlus } from "@phosphor-icons/vue";
import BasicsEditor from "./BasicsEditor.vue";
import { createId } from "@paralleldrive/cuid2";
import { defaultBasics, type BasicsSection, type Section } from "~/lib/schema";

export type Props<T extends Section> = {
    section: T;
};

const props = defineProps<Props<BasicsSection>>()

const resumeStore = useResumeStore();
const mainClass = cn("grid transition-opacity", !props.section.visible && "opacity-50");

const create = () => {
    props.section.items.push({ ...defaultBasics, id: createId() })
}

</script>

<template>
    <main :class="mainClass">
        <Button v-if="section.items.length === 0" variant="outline"
            class="gap-x-2 border-dashed py-6 leading-relaxed hover:bg-secondary-accent" @click="create">
            <PhPlus size="14" />
            <span class="font-medium">
                Add a new item
            </span>
        </Button>

        <BasicsEditor v-for="(item, index) of section.items" :key="item.id" :item="item" :index="index" :section-id="props.section.id" />

    </main>
</template>