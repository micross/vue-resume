<script setup lang="ts">
import {
    Button,
} from "#components";
import { cn } from "~/lib/utils";
import { PhPlus } from "@phosphor-icons/vue";
import {
    Awards,
    Basics,
    Certifications,
    Custom,
    Education,
    Experience,
    Interests,
    Languages,
    Profiles,
    Projects,
    Publications,
    References,
    Skills,
    Summary,
    Volunteering
} from "./editor";
import { createId } from "@paralleldrive/cuid2";
import {
    defaultProfile,
    defaultSummary,
    defaultAward,
    defaultEducation,
    defaultExperience,
    defaultCertification,
    defaultSkill,
    defaultVolunteer,
    defaultLanguage,
    defaultInterest,
    defaultPublication,
    defaultProject,
    defaultReference,
    defaultCustomSection,
    SectionModel,
    type SectionWithItem
} from "~/lib/schema";

export type Props<SectionWithItem> = {
    section: SectionWithItem;
};

const props = defineProps<Props<SectionWithItem>>()

const resumeStore = useResumeStore();
const mainClass = cn("grid transition-opacity", !props.section.visible && "opacity-50");


const create = () => {
    switch (props.section.model) {
        case SectionModel.PROFILES: {
            props.section.items.push({ ...defaultProfile, id: createId() });
            return;
        }
        case SectionModel.SUMMARY: {
            props.section.items.push({ ...defaultSummary, id: createId() });
            return;
        }
        case SectionModel.EXPERIENCE: {
            props.section.items.push({ ...defaultExperience, id: createId() });
            return;
        }
        case SectionModel.EDUCATION: {
            props.section.items.push({ ...defaultEducation, id: createId() });
            return;
        }
        case SectionModel.AWARDS: {
            props.section.items.push({ ...defaultAward, id: createId() });
            return;
        }
        case SectionModel.CERTIFICATIONS: {
            props.section.items.push({ ...defaultCertification, id: createId() });
            return;
        }
        case SectionModel.SKILLS: {
            props.section.items.push({ ...defaultSkill, id: createId() });
            return;
        }
        case SectionModel.INTERESTS: {
            props.section.items.push({ ...defaultInterest, id: createId() });
            return;
        }
        case SectionModel.PUBLICATIONS: {
            props.section.items.push({ ...defaultPublication, id: createId() });
            return;
        }
        case SectionModel.VOLUNTEER: {
            props.section.items.push({ ...defaultVolunteer, id: createId() });
            return;
        }
        case SectionModel.LANGUAGES: {
            props.section.items.push({ ...defaultLanguage, id: createId() });
            return;
        }
        case SectionModel.PROJECTS: {
            props.section.items.push({ ...defaultProject, id: createId() });
            return;
        }
        case SectionModel.REFERENCES: {
            props.section.items.push({ ...defaultReference, id: createId() });
            return;
        }
        case SectionModel.CUSTOM: {
            props.section.items.push({ ...defaultCustomSection, id: createId() });
            return;
        }
    }
};

const mapSectionToComponent = () => {
    switch (props.section.model) {
        case SectionModel.BASICS: {
            return Basics;
        }
        case SectionModel.PROFILES: {
            return Profiles;
        }
        case SectionModel.SUMMARY: {
            return Summary;
        }
        case SectionModel.AWARDS: {
            return Awards;
        }
        case SectionModel.EXPERIENCE: {
            return Experience;
        }
        case SectionModel.EDUCATION: {
            return Education;
        }
        case SectionModel.CERTIFICATIONS: {
            return Certifications;
        }
        case SectionModel.SKILLS: {
            return Skills;
        }
        case SectionModel.INTERESTS: {
            return Interests;
        }
        case SectionModel.PUBLICATIONS: {
            return Publications;
        }
        case SectionModel.VOLUNTEER: {
            return Volunteering;
        }
        case SectionModel.LANGUAGES: {
            return Languages;
        }
        case SectionModel.PROJECTS: {
            return Projects;
        }
        case SectionModel.REFERENCES: {
            return References;
        }
        case SectionModel.CUSTOM: {
            return Custom;
        }

    }
};

console.log(props.section)

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

        <component v-for="(item, index) of section.items" :key="item.id" :item="item" :index="index"
            :section-id="props.section.id" :is="mapSectionToComponent()" />

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