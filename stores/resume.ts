import { createId } from "@paralleldrive/cuid2";
import { ResumeDto } from "~/lib/dto";
import { defaultCustomSection, defaultResumeData, defaultSection, SectionModel, type CustomSectionSection, type ID } from "~/lib/schema";
import _set from "lodash.set";

export const useResumeStore = defineStore('resume', () => {
  const resume = ref({
    id: '',
    title: '',
    slug: '',
    data: defaultResumeData,
    visibility: 0,
    locked: false,
    userId: '',
  } as ResumeDto);

  const setValue = (path: string, value: any) => {
    if (path === "visibility") {
      resume.value.visibility = value as 1 | 0;
    } else {
      resume.value.data = _set(resume.value.data, path, value);
    }
    debouncedUpdateResume(resume.value);
  }

  const addSection = () => {
    const section: CustomSectionSection = {
      ...defaultSection,
      id: createId(),
      name: `Custom Section`,
      model: SectionModel.CUSTOM,
      items: [defaultCustomSection],
    };

    resume.value.data.sections.push(section);
    debouncedUpdateResume(resume.value);
  }

  const removeSection = (id: ID) => {
    const index = resume.value.data.sections.findIndex((item) => item.id === id);
    console.log(index);

    if (resume.value.data.sections[index].model === SectionModel.CUSTOM) {
      resume.value.data.sections.splice(index, 1);

      debouncedUpdateResume(resume.value);
    }
  }

  return { resume, setValue, addSection, removeSection }
},
  {
    persist: false,
  }
);
