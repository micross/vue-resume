<template>
    <div>
        <div v-if="editor" class="flex flex-wrap gap-0.5 border p-1">
            <Toggle size="sm" @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                <PhTextB />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                <PhTextItalic />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }">
                <PhTextStrikethrough />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleCode().run()"
                :disabled="!editor.can().chain().focus().toggleCode().run()"
                :class="{ 'is-active': editor.isActive('code') }">
                <PhCode />
            </Toggle>
            <Toggle @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                <PhParagraph />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                <PhTextHOne />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                <PhTextHTwo />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                <PhTextHThree />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                <PhTextHFour />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                <PhTextHFive />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                <PhTextHSix />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                <PhListBullets />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
                <PhListNumbers />
            </Toggle>
            <Toggle @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }">
                <PhCodeBlock />
            </Toggle>
            <Toggle @click="editor.chain().focus().setHorizontalRule().run()">
                <PhMinus />
            </Toggle>
            <Toggle @click="editor.chain().focus().setHardBreak().run()">
                <PhKeyReturn />
            </Toggle>
            <Toggle @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                <PhArrowCounterClockwise />
            </Toggle>
            <Toggle @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                <PhArrowClockwise />
            </Toggle>
        </div>
        <TiptapEditorContent :editor="editor"
            class="grid min-h-[160px] w-full rounded-sm border bg-transparent px-3 py-2 text-sm placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
</template>

<script setup lang="ts">
import {
    PhArrowClockwise,
    PhArrowCounterClockwise,
    PhCode,
    PhCodeBlock,
    PhHighlighterCircle,
    PhImage as ImageIcon,
    PhKeyReturn,
    PhLinkSimple,
    PhListBullets,
    PhListNumbers,
    PhMinus,
    PhParagraph,
    PhTextAlignCenter,
    PhTextAlignJustify,
    PhTextAlignLeft,
    PhTextAlignRight,
    PhTextAUnderline,
    PhTextB,
    PhTextHOne,
    PhTextHThree,
    PhTextHFour,
    PhTextHFive,
    PhTextHSix,
    PhTextHTwo,
    PhTextIndent,
    PhTextItalic,
    PhTextOutdent,
    PhTextStrikethrough,
} from "@phosphor-icons/vue";
import { cn } from "~/lib/utils";

const props = defineProps({
    modelValue: String
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const editor = useEditor({
    content: props.modelValue,
    extensions: [TiptapStarterKit],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
    editorProps: {
        attributes: {
            class: cn("prose prose-sm prose-zinc max-h-[200px] max-w-none overflow-y-scroll dark:prose-invert focus:outline-none [&_*]:my-2"),
        },
    },
});

onBeforeUnmount(() => {
    unref(editor).destroy();
});
</script>