import {
  type Award as AwardSchema,
  type Certification as CertificationSchema,
  type CustomSection as CustomSectionSchema,
  type Education as EducationSchema,
  type Experience as ExperienceSchema,
  type Interest as InterestSchema,
  type Language as LanguageSchema,
  type Profile as ProfileSchema,
  type Project as ProjectSchema,
  type Publication as PublicationSchema,
  type Reference as ReferenceSchema,
  type Basics as BasicsSchema,
  type SectionWithItem as SectionWithItemSchema,
  type Skill as SkillSchema,
  type URL as URLSchema,
  type Volunteer as VolunteerSchema,
  type SectionWithItem,
  type AwardSection,
  type ProfileSection,
  type ExperienceSection,
  type EducationSection,
  type CertificationSection,
  type SkillSection,
  type InterestSection,
  type PublicationSection,
  type VolunteerSection,
  type LanguageSection,
  type ProjectSection,
  type ReferenceSection,
  type CustomSectionSection,
  type SummarySection,
  SectionModel,
  type BasicsSection,
} from "~/lib/schema";
import _ from "lodash";
import { cn, isEmptyString, isUrl, linearTransform } from "~/lib/utils";
import get from "lodash.get";
import { Fragment } from "vue/jsx-runtime";
import { Picture } from "../picture";
import { useResumeStore } from "~/stores/resume";
import type { VNode } from "vue";
import { LayoutPosition } from "~/lib/schema/sections/section";

const BaseSection = <T,>({ section }: SectionProps<T>) => {
  const slots = useSlots();
  if (!section.visible || section.items.length === 0) return null;

  return (
    <>
      {section.items.map((item) =>
        slots.default ? slots.default(item as T) : null
      )}
    </>
  );
};

const Header = ({ section }: SectionProps<BasicsSection>) => {
  return (
    <BaseSection<BasicsSchema> section={section}>
      {(basics: BasicsSchema) => (
        <div class="flex flex-col items-center justify-center space-y-2 pb-2 text-center">
          <Picture basics={basics}/>

          <div>
            <div class="text-2xl font-bold">{basics.name}</div>
            <div class="text-base">{basics.headline}</div>
          </div>

          <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
            {basics.location && (
              <div class="flex items-center gap-x-1.5">
                <i class="ph ph-bold ph-map-pin text-primary" />
                <div>{basics.location}</div>
              </div>
            )}
            {basics.phone && (
              <div class="flex items-center gap-x-1.5">
                <i class="ph ph-bold ph-phone text-primary" />
                <a
                  href={`tel:${basics.phone}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {basics.phone}
                </a>
              </div>
            )}
            {basics.email && (
              <div class="flex items-center gap-x-1.5">
                <i class="ph ph-bold ph-at text-primary" />
                <a
                  href={`mailto:${basics.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {basics.email}
                </a>
              </div>
            )}
            <Link url={basics.url} />
            {basics.custom_fields.map((item) => (
              <div key={item.id} class="flex items-center gap-x-1.5">
                <i class={cn(`ph ph-bold ph-${item.icon}`, "text-primary")} />
                {isUrl(item.value) ? (
                  <a
                    href={item.value}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    {item.name || item.value}
                  </a>
                ) : (
                  <span>
                    {[item.name, item.value].filter(Boolean).join(": ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseSection>
  );
};

const Summary = ({ section }: SectionProps<SummarySection>) => {
  if (!section.visible) return null;

  return (
    <section id={section.model}>
      <div class="mb-2 hidden font-bold text-primary group-[.main]:block">
        <h4>{section.name}</h4>
      </div>

      <div class="mb-2 hidden items-center gap-x-2 text-center font-bold text-primary group-[.sidebar]:flex">
        <div class="size-1.5 rounded-full border border-primary" />
        <h4>{section.name}</h4>
        <div class="size-1.5 rounded-full border border-primary" />
      </div>

      <main class={cn("relative space-y-2", "border-l border-primary pl-4")}>
        <div class="absolute left-[-4.5px] top-[8px] hidden size-[8px] rounded-full bg-primary group-[.main]:block" />

        {section.items.map((item) => (
          <div
            v-html={item.content}
            class="wysiwyg"
            style={{ columns: section.columns }}
          />
        ))}
      </main>
    </section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div class="relative h-1 w-[128px] group-[.sidebar]:mx-auto">
    <div class="absolute inset-0 h-1 w-[128px] rounded bg-primary opacity-25" />
    <div
      class="absolute inset-0 h-1 rounded bg-primary"
      style={{ width: linearTransform(level, 0, 5, 0, 128) }}
    />
  </div>
);

type LinkProps = {
  url: URLSchema;
  icon?: VNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

const Link = ({ url, icon, iconOnRight, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div class="flex items-center gap-x-1.5">
      {!iconOnRight && (icon ?? <i class="ph ph-bold ph-link text-primary" />)}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        class={cn("inline-block", className)}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight && (icon ?? <i class="ph ph-bold ph-link text-primary" />)}
    </div>
  );
};

type LinkedEntityProps = {
  name: string;
  url: URLSchema;
  separate_links: boolean;
  className?: string;
};

const LinkedEntity = ({
  name,
  url,
  separate_links,
  className,
}: LinkedEntityProps) => {
  return !separate_links && isUrl(url.href) ? (
    <Link
      url={url}
      label={name}
      icon={<i class="ph ph-bold ph-globe text-primary" />}
      iconOnRight={true}
      className={className}
    />
  ) : (
    <div class={className}>{name}</div>
  );
};

type SectionProps<T> = {
  section: SectionWithItemSchema<T>;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  const slots = useSlots();
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.model} class="grid">
      <div class="mb-2 hidden font-bold text-primary group-[.main]:block">
        <h4>{section.name}</h4>
      </div>

      <div class="mx-auto mb-2 hidden items-center gap-x-2 text-center font-bold text-primary group-[.sidebar]:flex">
        <div class="size-1.5 rounded-full border border-primary" />
        <h4>{section.name}</h4>
        <div class="size-1.5 rounded-full border border-primary" />
      </div>

      <div
        class="grid gap-x-6 gap-y-3 group-[.sidebar]:mx-auto group-[.sidebar]:text-center"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URLSchema | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as
              | number
              | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as
              | string
              | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as
              | string[]
              | undefined;

            return (
              <div
                key={item.id}
                class={cn(
                  "relative space-y-2",
                  "border-primary group-[.main]:border-l group-[.main]:pl-4",
                  className
                )}
              >
                <div>{slots.default ? slots.default(item as T) : null}</div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div v-html={summary} class="wysiwyg" />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p class="text-sm">{keywords.join(", ")}</p>
                )}

                {url !== undefined && section.separate_links && (
                  <Link url={url} />
                )}

                <div class="absolute left-[-4.5px] top-px hidden size-[8px] rounded-full bg-primary group-[.main]:block" />
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Profiles = ({ section }: SectionProps<ProfileSection>) => {
  const fontSize =
    useResumeStore().$state.resume.data.metadata.typography.font.size;

  return (
    <Section<ProfileSchema> section={section}>
      {(item: ProfileSchema) => (
        <div>
          {isUrl(item.url.href) ? (
            <Link
              url={item.url}
              label={item.username}
              icon={
                <img
                  class="ph"
                  width={fontSize}
                  height={fontSize}
                  alt={item.network}
                  src={`https://cdn.simpleicons.org/${item.icon}`}
                />
              }
            />
          ) : (
            <p>{item.username}</p>
          )}
          {!item.icon && <p class="text-sm">{item.network}</p>}
        </div>
      )}
    </Section>
  );
};

const Experience = ({ section }: SectionProps<ExperienceSection>) => {
  return (
    <Section<ExperienceSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
    >
      {(item: ExperienceSchema) => (
        <div>
          <LinkedEntity
            name={item.company}
            url={item.url}
            separate_links={section.separate_links}
            className="font-bold"
          />
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div class="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Education = ({ section }: SectionProps<EducationSection>) => {
  return (
    <Section<EducationSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
    >
      {(item: EducationSchema) => (
        <div>
          <LinkedEntity
            name={item.institution}
            url={item.url}
            separate_links={section.separate_links}
            className="font-bold"
          />
          <div>{item.area}</div>
          <div>{item.score}</div>
          <div>{item.study_type}</div>
          <div class="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Awards = ({ section }: SectionProps<AwardSection>) => {
  return (
    <Section<AwardSchema> section={section} urlKey="url" summaryKey="summary">
      {(item: AwardSchema) => (
        <div>
          <div class="font-bold">{item.title}</div>
          <LinkedEntity
            name={item.awarder}
            url={item.url}
            separate_links={section.separate_links}
          />
          <div class="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Certifications = ({ section }: SectionProps<CertificationSection>) => {
  return (
    <Section<CertificationSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
    >
      {(item: CertificationSchema) => (
        <div>
          <div class="font-bold">{item.name}</div>
          <LinkedEntity
            name={item.issuer}
            url={item.url}
            separate_links={section.separate_links}
          />
          <div class="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Skills = ({ section }: SectionProps<SkillSection>) => {
  return (
    <Section<SkillSchema>
      section={section}
      levelKey="level"
      keywordsKey="keywords"
    >
      {(item: SkillSchema) => (
        <div>
          <div class="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Interests = ({ section }: SectionProps<InterestSection>) => {
  return (
    <Section<InterestSchema>
      section={section}
      keywordsKey="keywords"
      className="space-y-0.5"
    >
      {(item: InterestSchema) => <div class="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = ({ section }: SectionProps<PublicationSection>) => {
  return (
    <Section<PublicationSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
    >
      {(item: PublicationSchema) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separate_links={section.separate_links}
            className="font-bold"
          />
          <div>{item.publisher}</div>
          <div class="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = ({ section }: SectionProps<VolunteerSection>) => {
  return (
    <Section<VolunteerSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
    >
      {(item: VolunteerSchema) => (
        <div>
          <LinkedEntity
            name={item.organization}
            url={item.url}
            separate_links={section.separate_links}
            className="font-bold"
          />
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div class="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Languages = ({ section }: SectionProps<LanguageSection>) => {
  return (
    <Section<LanguageSchema> section={section} levelKey="level">
      {(item: LanguageSchema) => (
        <div>
          <div class="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = ({ section }: SectionProps<ProjectSection>) => {
  return (
    <Section<ProjectSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item: ProjectSchema) => (
        <div>
          <div>
            <LinkedEntity
              name={item.name}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.description}</div>

            <div class="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const References = ({ section }: SectionProps<ReferenceSection>) => {
  return (
    <Section<ReferenceSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
    >
      {(item: ReferenceSchema) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separate_links={section.separate_links}
            className="font-bold"
          />
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Custom = ({ section }: SectionProps<CustomSectionSection>) => {
  return (
    <Section<CustomSectionSchema>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item: CustomSectionSchema) => (
        <div>
          <div>
            <LinkedEntity
              name={item.name}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.description}</div>

            <div class="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionWithItem) => {
  switch (section.model) {
    case SectionModel.PROFILES: {
      return <Profiles section={section} />;
    }
    case SectionModel.SUMMARY: {
      return <Summary section={section} />;
    }
    case SectionModel.EXPERIENCE: {
      return <Experience section={section} />;
    }
    case SectionModel.EDUCATION: {
      return <Education section={section} />;
    }
    case SectionModel.AWARDS: {
      return <Awards section={section} />;
    }
    case SectionModel.CERTIFICATIONS: {
      return <Certifications section={section} />;
    }
    case SectionModel.SKILLS: {
      return <Skills section={section} />;
    }
    case SectionModel.INTERESTS: {
      return <Interests section={section} />;
    }
    case SectionModel.PUBLICATIONS: {
      return <Publications section={section} />;
    }
    case SectionModel.VOLUNTEER: {
      return <Volunteer section={section} />;
    }
    case SectionModel.LANGUAGES: {
      return <Languages section={section} />;
    }
    case SectionModel.PROJECTS: {
      return <Projects section={section} />;
    }
    case SectionModel.REFERENCES: {
      return <References section={section} />;
    }
    case SectionModel.CUSTOM: {
      return <Custom section={section} />;
    }
    default: {
      return null;
    }
  }
};

export const Azurill = () => {
  const resumeStore = useResumeStore();
  const sections = resumeStore.$state.resume.data.sections;
  const basics = _.find(sections, {
    model: SectionModel.BASICS,
  }) as SectionWithItem;

  return (
    <div class="p-custom space-y-3">
      <Header section={basics}/>

      <div class="grid grid-cols-3 gap-x-4">
        <div class="sidebar group space-y-4">
          {sections
            .filter((item) => item.position == LayoutPosition.SIDEBAR)
            .map((section) => (
              <Fragment key={section.id}>
                {mapSectionToComponent(section)}
              </Fragment>
            ))}
        </div>

        <div class="main group col-span-2 space-y-4">
          {sections
            .filter((item) => item.position == LayoutPosition.MAIN)
            .map((section) => (
              <Fragment key={section.id}>
                {mapSectionToComponent(section)}
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
