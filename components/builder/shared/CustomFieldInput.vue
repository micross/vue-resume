<script setup lang="ts">
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Input,
} from "#components";
import { PhEnvelope } from "@phosphor-icons/vue";
import { X } from "lucide-vue-next";
import { cn } from "~/lib/utils";
import type { CustomField as ICustomField } from "~/lib/schema";

type CustomFieldProps = {
    field: ICustomField;
    onChange: (field: ICustomField) => void;
    onRemove: (id: string) => void;
};

const props = defineProps<CustomFieldProps>()

const handleChange = (value: string | number, key: "icon" | "name" | "value") => {
    props.onChange({ ...props.field, [key]: value });
};

const updateIcon = (value: string | number) => {
    props.onChange({ ...props.field, icon: value as string });
}

const remove = () => {
    props.onRemove(props.field.id);
}
</script>

<template>
    <div class="flex items-end justify-between space-x-2">
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                    <i v-if="field.icon" :class="cn(`ph ph-${field.icon}`)" />
                    <PhEnvelope v-else />
                </Button>
            </PopoverTrigger>
            <PopoverContent class="p-1.5">
                <Input v-model="field.icon" place-holder="Enter Phosphor Icon" @update:model-value="updateIcon" />
            </PopoverContent>
        </Popover>

        <Input place-holder="Name" v-model="field.name" class="!ml-0"
            @update:model-value="handleChange($event, 'name')" />

        <Input place-holder="Value" v-model="field.value" @update:model-value="handleChange($event, 'value')" />

        <Button size="icon" variant="link" class="!ml-0 shrink-0" @click="remove">
            <X />
        </Button>
    </div>
</template>