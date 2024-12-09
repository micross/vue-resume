import { Label, Switch, Tooltip } from "#components";
import {
  PhArticle,
  PhBooks,
  PhBriefcase,
  PhCertificate,
  PhCompassTool,
  PhGameController,
  PhGraduationCap,
  PhHandHeart,
  PhMedal,
  PhPuzzlePiece,
  PhShareNetwork,
  PhTranslate,
  PhUser,
  PhUsers,
} from "@phosphor-icons/vue";
import _ from "lodash";
import {
  defaultSection,
  SectionModel,
  type ID,
  type SectionKey,
  type SectionWithItem,
} from "~/lib/schema";
import { useResumeStore } from "~/stores/resume";

export const getSectionIcon = (model: SectionKey, props = {}) => {
  switch (model) {
    case SectionModel.BASICS: {
      return <PhUser size={18} {...props} />;
    }
    case SectionModel.SUMMARY: {
      return <PhArticle size={18} {...props} />;
    }
    case SectionModel.AWARDS: {
      return <PhMedal size={18} {...props} />;
    }
    case SectionModel.PROFILES: {
      return <PhShareNetwork size={18} {...props} />;
    }
    case SectionModel.EXPERIENCE: {
      return <PhBriefcase size={18} {...props} />;
    }
    case SectionModel.EDUCATION: {
      return <PhGraduationCap size={18} {...props} />;
    }
    case SectionModel.CERTIFICATIONS: {
      return <PhCertificate size={18} {...props} />;
    }
    case SectionModel.INTERESTS: {
      return <PhGameController size={18} {...props} />;
    }
    case SectionModel.LANGUAGES: {
      return <PhTranslate size={18} {...props} />;
    }
    case SectionModel.VOLUNTEER: {
      return <PhHandHeart size={18} {...props} />;
    }
    case SectionModel.PROJECTS: {
      return <PhPuzzlePiece size={18} {...props} />;
    }
    case SectionModel.PUBLICATIONS: {
      return <PhBooks size={18} {...props} />;
    }
    case SectionModel.SKILLS: {
      return <PhCompassTool size={18} {...props} />;
    }
    case SectionModel.REFERENCES: {
      return <PhUsers size={18} {...props} />;
    }
    case SectionModel.CUSTOM: {
      return <PhUsers size={18} {...props} />;
    }

    default: {
      return null;
    }
  }
};

type SectionIconProps = {
  id: ID;
  model: SectionKey;
  name?: string;
};

export const SectionIcon = ({
  id,
  model,
  name,
  ...props
}: SectionIconProps) => {
  const resumeStore = useResumeStore();
  const section =
    _.find(resumeStore.$state.resume.data.sections, { id: id }) ||
    (defaultSection as SectionWithItem);
  const setValue = resumeStore.setValue;

  return (
    <Tooltip>
      <div class="flex justify-between">
        <div class="flex">
          <div class="size-8 rounded-full">
            {getSectionIcon(model, { size: 14 })}
          </div>
          <Label for={`sections.${section.model}`}>
            {name ?? section.name}
          </Label>
        </div>
        <Switch
          id={section.id}
          checked={section.visible}
          onUpdate:checked={(checked) => {
            const index = resumeStore.$state.resume.data.sections.findIndex(
              (item) => item.id === section.id
            );
            setValue(`sections[${index}].visible`, checked);
          }}
        />
      </div>
    </Tooltip>
  );
};
