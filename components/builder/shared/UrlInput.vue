<script setup lang="ts">
import { computed } from "vue";
import { type URL, urlSchema } from "~/lib/schema";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import * as v from "valibot";

type Props = {
  id?: string;
  modelValue: URL;
  placeholder?: string;
  onUpdate: (value: URL) => void;
};

const props = defineProps<Props>()

const hasError = computed(() => !v.safeParse(urlSchema, props.modelValue).success);

const updateHref = (value: string | number) => {
  props.onUpdate({
    ...props.modelValue,
    href: value as string,
  })
};

const updateLabel = (value: string | number) => {
  props.onUpdate({
    ...props.modelValue,
    label: value as string,
  })
};
</script>

<template>
  <div>
    <div class="flex gap-x-1">
      <Input v-model="modelValue.href" class="flex-1" @update:model-value="updateHref" />

      <Popover>
        <TooltipProvider>
          <Tooltip>
            <PopoverTrigger as-child>
              <Button size="icon" variant="ghost"></Button>
            </PopoverTrigger>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent class="p-1.5">
          <Input v-model="modelValue.label" place-holder="Label" @update:model-value="updateLabel" />
        </PopoverContent>
      </Popover>
    </div>

    <small v-if="hasError" class="opacity-75">{`URL must start with https://`}</small>
  </div>
</template>