import {
  ScrollArea,
  Accordion,
  Button,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "#components";
import { PlusCircle } from "lucide-vue-next";
import ProfileEditorWraper from "./profiles/ProfileEditorWraper.vue";
import ExperienceEditorWraper from "./experience/ExperienceEditorWraper.vue";
import EducationEditorWraper from "./education/EducationEditorWraper.vue";
import SkillEditorWraper from "./skill/SkillEditorWraper.vue";
import LanguageEditorWraper from "./languages/LanguageEditorWraper.vue";
import { AwardsEditorWraper } from "./awards";
import { CertificationEditorWraper } from "./certifications";
import { InterestEditorWraper } from "./interests";
import { ProjectEditorWraper } from "./projects";
import { PublicationEditorWraper } from "./publications";
import { VolunteerEditorWraper } from "./volunteer";
import { ReferenceEditorWraper } from "./references";
import { SummaryEditorWraper } from "./summary";
import { CustomSectionEditorWraper } from "./custom";
import { SectionModel } from "~/lib/schema";
import { SectionOptions } from "./shared";
import { BasicsEditorWraper } from "./basics";

export const ResumeEditor = () => {
  const containterRef = ref<HTMLDivElement | null>(null);

  const resumeStore = useResumeStore();
  const sections = resumeStore.$state.resume.data.sections;

  return (
    <div class="flex bg-secondary-accent/30 shadow-2xl rounded-lg">
      <div class="container mx-auto p-4 max-w-3xl contentHeight">
        <ScrollArea class="h-full flex-1 pb-16 lg:pb-0">
          <div ref={containterRef} class="grid gap-y-6 @container/left">
            <Accordion type="single" collapsible class="w-full">
              {sections.map((section) => {
                if (section.model == SectionModel.BASICS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Basics
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <BasicsEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.SUMMARY)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Summary
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <SummaryEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.PROFILES)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Profiles
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ProfileEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.EXPERIENCE)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Experience
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ExperienceEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.EDUCATION)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Education
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <EducationEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.SKILLS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Skills
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <SkillEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.LANGUAGES)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Languages
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <LanguageEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.AWARDS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Awards
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <AwardsEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.CERTIFICATIONS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Certifications
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <CertificationEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.INTERESTS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Interests
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <InterestEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.PROJECTS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Projects
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ProjectEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.PUBLICATIONS)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Publications
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <PublicationEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.VOLUNTEER)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Volunteer
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <VolunteerEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.REFERENCES)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        References
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ReferenceEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );

                if (section.model == SectionModel.CUSTOM)
                  return (
                    <AccordionItem
                      value={section.id}
                      class="container mx-auto p-2 max-w-3xl border-gray-200"
                    >
                      <AccordionTrigger>
                        Custom
                        <SectionOptions id={section.id} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <CustomSectionEditorWraper section={section} />
                      </AccordionContent>
                    </AccordionItem>
                  );
              })}
            </Accordion>

            <Button
              size="lg"
              variant="outline"
              on-click={resumeStore.addSection}
            >
              <PlusCircle />
              <span class="ml-2">{`Add a new section`}</span>
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
