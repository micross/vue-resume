<script setup lang="ts">
import { cn } from '~/lib/utils';

const templatesList = [
    "azurill",
    "bronzor",
    "chikorita",
    "ditto",
    "gengar",
    "glalie",
    "kakuna",
    "leafish",
    "nosepass",
    "onyx",
    "pikachu",
    "rhyhorn",
] as const;

const resumeStore = useResumeStore();
const currentTemplate = computed(() => resumeStore.resume.data.metadata.template);
const updateTemplate = (value: string) => resumeStore.setValue("metadata.template", value);


</script>

<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="outline">
                Switch Template
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Choose Template</SheetTitle>
            </SheetHeader>

            <ScrollArea class="h-5/6 rounded-md border p-2">
                <div class="grid grid-cols-2 gap-5 @lg/right:grid-cols-3 @2xl/right:grid-cols-4">
                    <div v-for="(template, index) of templatesList" :key="index"
                        :class="cn('relative cursor-pointer rounded-sm ring-primary transition-all hover:ring-2 m-2', currentTemplate === template && 'ring-2')"
                        @click="updateTemplate(template)">
                        <img :src="`/templates/${template}.jpg`" alt="template" class="rounded-sm" />

                        <div
                            class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background/80">
                            <p class="absolute inset-x-0 bottom-2 text-center font-bold capitalize text-primary">
                                {{ template }}
                            </p>
                        </div>
                    </div>
                </div>
            </ScrollArea>

        </SheetContent>
    </Sheet>
</template>