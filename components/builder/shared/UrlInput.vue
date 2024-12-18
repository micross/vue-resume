<script setup lang="ts">
import { computed } from "vue";
import { type URL, urlSchema } from "~/lib/schema";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as v from "valibot";
import { PhTag } from "@phosphor-icons/vue";

type Props = {
  id?: string;
  modelValue: URL;
  placeholder?: string;
};

const props = defineProps<Props>()

const hasError = computed(() => !v.safeParse(urlSchema, props.modelValue).success);

const emit = defineEmits<{
  (e: 'update:modelValue', value: URL): void
}>()

const updateHref = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    href: href.value,
  })
};

const updateLabel = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    label: label.value,
  })
};

const href = ref(props.modelValue.href)
const label = ref(props.modelValue.label)
</script>

<template>
  <div>
    <div class="flex gap-x-1">
      <Input v-model="href" class="flex-1" @blur="updateHref" />
      <Popover>
        <PopoverTrigger>
          <PhTag />
        </PopoverTrigger>

        <PopoverContent class="p-1.5">
          <Input v-model="label" place-holder="Label" @blur="updateLabel" />
        </PopoverContent>
      </Popover>
    </div>

    <small v-if="hasError" class="opacity-75">URL must start with https://</small>
  </div>
</template>