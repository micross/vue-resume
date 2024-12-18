import { BuilderPreview, BuilderHeaderNav } from "#components";
import ResumeEditor from "~/components/builder/ResumeEditor.vue";

definePageMeta({
  auth: true,
  layout: "builder",
});

export default function page() {
  return (
    <div class="max-h-screen">
      <BuilderHeaderNav class="mb-8" />
      <div class="flex gap-6">
        <div class="flex flex-1 justify-center gap-6">
          <div class=" bg-background flex-1 max-w-3xl transition-[flex]">
            <ResumeEditor />
          </div>

          <div class=" bg-background flex-1 max-w-max transition-[flex]">
            <BuilderPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
