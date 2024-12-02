import { Button, ScrollArea, TooltipProvider } from "#components";
import { PlusCircle } from "lucide-vue-next";
import { useResumeStore } from "~/stores/resume";
import { SectionIcon } from "./section-icon";

export const LeftNav = () => {
  const containterRef = ref<HTMLDivElement | null>(null);

  const addSection = useResumeStore().addSection;

  const scrollIntoView = (selector: string) => {
    const section = containterRef.value?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const resumeSections = useResumeStore().$state.resume.data.sections;

  return (
    <div class=" flex-1 pb-16 lg:pb-0">
      <div class="flex bg-secondary-accent/30">
        <div class="contentHeight hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 p-4 sm:flex shadow-2xl rounded-lg">
          <ScrollArea class="h-full flex flex-col justify-center gap-y-2">
            {Object.entries(resumeSections).map(([key, section]) => (
              <SectionIcon
                key={key}
                id={section.id}
                name={section.name}
                model={section.model}
                onClick={() => {
                  scrollIntoView(`#${section}`);
                }}
              />
            ))}

            <Button
              onClick={() => {
                addSection();
                scrollIntoView("& > section:last-of-type");
              }}
            >
              <PlusCircle />
              <span class="ml-2">{`Add a new section`}</span>
            </Button>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
