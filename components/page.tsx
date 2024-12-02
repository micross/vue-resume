import { cn, pageSizeMap } from "~/lib/utils";
import { useResumeStore } from "~/stores/resume";

type Props = {
  mode?: "preview" | "builder";
};

export const MM_TO_PX = 3.78;

export default function Page({ mode = "preview" }: Props) {

  const page = useResumeStore().$state.resume.data.metadata.page;
  const fontFamily = useResumeStore().$state.resume.data.metadata.typography.font.family;
  const slots = useSlots();

  return (
    <div
      class={cn("relative bg-background text-foreground resume-template")}
      style={{
        fontFamily,
        width: `${pageSizeMap[page.format].width * MM_TO_PX}px`,
        minHeight: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
      }}
    >
      {mode === "builder" && page.options.page_numbers && (
        <div class={cn("absolute -top-7 left-0 font-bold")}>
          Page 0
        </div>
      )}

      {slots.default ? slots.default() : null}

      {mode === "builder" && page.options.break_line && (
        <div
          class="absolute inset-x-0 border-b border-dashed"
          style={{
            top: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
          }}
        />
      )}
    </div>
  );
};
