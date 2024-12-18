<script setup lang="ts">
import {
  Checkbox,
  Input,
  Label,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipProvider,
} from "#components";
import type { AcceptableValue } from "reka-ui";
import { type Basics } from "~/lib/schema";

type Props = {
  basics: Basics;
  sectionId: string;
};

const props = defineProps<Props>()

const stringToRatioMap = {
  square: 1,
  portrait: 0.75,
  horizontal: 1.33,
} as const;

const ratioToStringMap = {
  "1": "square",
  "0.75": "portrait",
  "1.33": "horizontal",
} as const;

type AspectRatio = keyof typeof stringToRatioMap;

// Border Radius Helpers
const stringToBorderRadiusMap = {
  square: 0,
  rounded: 6,
  circle: 9999,
};

const borderRadiusToStringMap = {
  "0": "square",
  "6": "rounded",
  "9999": "circle",
};

type BorderRadius = keyof typeof stringToBorderRadiusMap;


const resumeStore = useResumeStore();
const avatar = props.basics.avatar;

const aspectRatio = computed(() => {
  const ratio = avatar.aspect_ratio.toString() as keyof typeof ratioToStringMap;
  return ratioToStringMap[ratio];
});

const onAspectRatioChange = (payload: AcceptableValue | AcceptableValue[]) => {
  if (!payload) return;
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.aspect_ratio`, stringToRatioMap[payload as AspectRatio]);
};

const borderRadius = computed(() => {
  const radius =
    avatar.border_radius.toString() as keyof typeof borderRadiusToStringMap;
  return borderRadiusToStringMap[radius];
});

const onBorderRadiusChange = (payload: AcceptableValue | AcceptableValue[] | BorderRadius) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.border_radius`, stringToBorderRadiusMap[payload as BorderRadius]);
};

const updateGrayScale = (checked: boolean) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.effects.grayscale`, checked);
};

const updateBorder = (checked: boolean) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.effects.border`, checked);
};

const updateHiden = (checked: boolean) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.effects.hidden`, checked);
};

const updateBorderRadius = (value: string | number) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.border_radius`, value);
};

const updateAspectRatio = (value: string | number) => {
  if (!value) return;
  if (Number.isNaN(value)) return;

  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.aspect_ratio`, value);
};

const updateSize = (value: string | number) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.size`, Number(value));
};

</script>

<template>
  <TooltipProvider>
    <div class="flex flex-col gap-y-5">
      <div class="grid grid-cols-3 items-center gap-x-6">
        <Label for="avatar.size">Size (in px)</Label>
        <Input place-holder="128" v-model="avatar.size" class="col-span-2" @update:model-value="updateSize" />
      </div>

      <div class="grid grid-cols-3 items-center gap-x-6">
        <Label for="avatar.aspect_ratio">Aspect Ratio</Label>
        <div class="col-span-2 flex items-center justify-between">
          <ToggleGroup type="single" v-model="aspectRatio" class="flex items-center justify-center"
            @update:model-value="onAspectRatioChange">
            <Tooltip>
              <ToggleGroupItem value="square">
                <div class="size-3 border border-foreground" />
              </ToggleGroupItem>
            </Tooltip>

            <Tooltip>
              <ToggleGroupItem value="horizontal">
                <div class="h-2 w-3 border border-foreground" />
              </ToggleGroupItem>
            </Tooltip>

            <Tooltip>
              <ToggleGroupItem value="portrait">
                <div class="h-3 w-2 border border-foreground" />
              </ToggleGroupItem>
            </Tooltip>
          </ToggleGroup>

          <Input class="w-[60px]" v-model="avatar.aspect_ratio" @update:model-value="updateAspectRatio" />
        </div>
      </div>

      <div class="grid grid-cols-3 items-center gap-x-6">
        <Label for="avatar.border_radius">Border Radius</Label>
        <div class="col-span-2 flex items-center justify-between">
          <ToggleGroup type="single" v-model="borderRadius" class="flex items-center justify-center"
            @update:model-value="onBorderRadiusChange">
            <Tooltip>
              <ToggleGroupItem value="square">
                <div class="size-3 border border-foreground" />
              </ToggleGroupItem>
            </Tooltip>

            <Tooltip>
              <ToggleGroupItem value="rounded">
                <div class="size-3 rounded-sm border border-foreground" />
              </ToggleGroupItem>
            </Tooltip>

            <Tooltip>
              <ToggleGroupItem value="circle">
                <div class="size-3 rounded-full border border-foreground" />
              </ToggleGroupItem>
            </Tooltip>
          </ToggleGroup>

          <Input class="w-[60px]" v-model="avatar.border_radius" @update:model-value="updateBorderRadius" />
        </div>
      </div>

      <div>
        <div class="grid grid-cols-3 items-start gap-x-6">
          <div>
            <Label>Effects</Label>
          </div>
          <div class="col-span-2 space-y-4">
            <div class="flex items-center space-x-2">
              <Checkbox id="avatar.effects.hidden" :checked="avatar.effects.hidden" @update:checked="updateHiden" />
              <Label for="avatar.effects.hidden">Hidden</Label>
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="avatar.effects.border" :checked="avatar.effects.border" @update:checked="updateBorder" />
              <Label for="avatar.effects.border">Border</Label>
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="avatar.effects.grayscale" :checked="avatar.effects.grayscale"
                @update:checked="updateGrayScale" />
              <Label for="avatar.effects.grayscale">Grayscale</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>
