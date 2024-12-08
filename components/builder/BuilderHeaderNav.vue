<script setup lang="ts">
import ExportPdf from './shared/ExportPdf.vue';
import TemplateList from './shared/TemplateList.vue';
</script>

<template>
  <div class="flex w-full flex-col">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <ExportPdf class="text-foreground transition-colors hover:text-foreground" />
        <TemplateList class="text-foreground transition-colors hover:text-foreground" />

      </nav>
    </header>
  </div>
</template>