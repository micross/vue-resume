<script setup lang="ts">
import { PhCircleNotch, PhFilePdf } from "@phosphor-icons/vue";
import { useResumeStore } from "@/stores/resume";
import { saveAs } from "file-saver";

const { printResume, loading } = usePrintResume();

const onPdfExport = async () => {
    const url = useRequestURL();
    const { resume } = useResumeStore();

    const pdfData = await printResume({ url: `${url.origin}/resume/${resume.id}` });
    const filename = `resume-${resume.title}.pdf`;
    saveAs(new Blob([pdfData.value], { type: "application/pdf" }), filename);
};

</script>

<template>
    <Tooltip content="Download PDF">
        <Button size="icon" variant="ghost" :disabled="loading" class="rounded-none" @click.prevent="onPdfExport">
            <PhCircleNotch v-if="loading" class="animate-spin" />
            <PhFilePdf v-else />
        </Button>
    </Tooltip>
</template>