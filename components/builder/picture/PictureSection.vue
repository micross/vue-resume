<script setup lang="ts">
import { Avatar, AvatarImage, Label, Input, Popover, PopoverTrigger, PopoverContent } from "#components";
import { Aperture } from "lucide-vue-next";
import { PictureOptions } from ".";
import * as v from "valibot";
import { PhTrash, PhUploadSimple } from "@phosphor-icons/vue";
import type { Basics } from "~/lib/schema";

type PictureProps = {
  className?: string;
  basics: Basics;
  sectionId: string;
};

const props = defineProps<PictureProps>()

const inputRef = ref<HTMLInputElement | null>(null)
const { uploadImage } = useUploadImage();

const resumeStore = useResumeStore();
const avatar = computed(()=> props.basics.avatar);

const isValidUrl = computed(() => v.safeParse(v.pipe(v.string(), v.url()), avatar.value.url).success);

const onSelectImage = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const response = await uploadImage(file)

    const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
    resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.url`, response);
  }
}

const onAvatarClick = () => {
  if (isValidUrl.value) {
    const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
    const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
    resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.url`, '');
  } else {
    inputRef.value?.click();
  }
};

const update = (value: string | number) => {
  const sectionIndex = resumeStore.$state.resume.data.sections.findIndex((section) => section.id === props.sectionId);
  const itemIndex = resumeStore.$state.resume.data.sections[sectionIndex].items.findIndex(item => item.id === props.basics.id);
  resumeStore.setValue(`sections[${sectionIndex}].items[${itemIndex}].avatar.url`, value);
}


</script>

<template>
  <div class="flex items-center gap-x-4">
    <div class="group relative cursor-pointer" @click="onAvatarClick">
      <Avatar class="size-14 bg-secondary">
        <AvatarImage :src="avatar.url" />
      </Avatar>


      <div v-if="isValidUrl"
        class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
        <PhTrash size="16" weight="bold" />
      </div>

      <div v-else
        class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
        <PhUploadSimple size="16" weight="bold" />
      </div>

    </div>

    <div class="flex w-full flex-col gap-y-1.5">
      <Label for="basics.avatar.url">Avatar</Label>
      <div class="flex items-center gap-x-2">
        <input ref="inputRef" hidden type="file" @change="onSelectImage" />

        <Input place-holder="https://..." :model-value="avatar.url" @update:model-value="update" />

        <Popover v-if="isValidUrl">
          <PopoverTrigger as-child>
            <Aperture />
          </PopoverTrigger>
          <PopoverContent class="w-[360px]">
            <PictureOptions :basics="props.basics" :section-id="props.sectionId" />
          </PopoverContent>
        </Popover>

      </div>
    </div>
  </div>
</template>
