<script setup lang="ts">
import {
    Button,
} from "#components";
import { cn } from "~/lib/utils";
import { PhPlus } from "@phosphor-icons/vue";
import VolunteerEditor from "./VolunteerEditor.vue";
import { createId } from "@paralleldrive/cuid2";
import { defaultVolunteer, type Section, type VolunteerSection } from "~/lib/schema";

export type Props<T extends Section> = {
    section: T;
};

const props = defineProps<Props<VolunteerSection>>()

const resumeStore = useResumeStore();
const mainClass = cn("grid transition-opacity", !props.section.visible && "opacity-50");

const create = () => {
    props.section.items.push({ ...defaultVolunteer, id: createId() })
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

        <VolunteerEditor v-for="(item, index) of section.items" :key="item.id" :item="item" :index="index" :section-id="props.section.id" />

        <footer v-if="section.items.length > 0" class="flex items-center justify-end">
            <Button variant="outline" class="ml-auto gap-x-2" @click="create">
                <PhPlus />
                <span>
                    Add a new item
                </span>
            </Button>
        </footer>
    </main>
</template>