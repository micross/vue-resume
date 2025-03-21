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
  type Summary as SummarySchema,
  type SectionWithItem as SectionWithItemSchema,
  type Basics as BasicsSchema,
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
import { cn, isEmptyString, isUrl } from "~/lib/utils";
import get from "lodash.get";
import { Fragment } from "vue/jsx-runtime";
import { Picture } from "../picture";
import { useResumeStore } from "~/stores/resume";
import _ from "lodash";
import { useSlots } from "vue";
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
        <div
          class="summary group bg-primary px-6 pb-7 pt-6 text-background"
          style={{
            borderRadius: `calc(${basics.avatar.border_radius}px - 2px)`,
          }}
        >
          <div class="col-span-2 space-y-2.5">
            <div>
              <h2 class="text-2xl font-bold">{basics.name}</h2>
              <p>{basics.headline}</p>
            </div>

            <hr class="border-background opacity-50" />

            <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
              {basics.location && (
                <>
                  <div class="flex items-center gap-x-1.5">
                    <i class="ph ph-bold ph-map-pin" />
                    <div>{basics.location}</div>
                  </div>
                  <div class="size-1 rounded-full bg-background last:hidden" />
                </>
              )}
              {basics.phone && (
                <>
                  <div class="flex items-center gap-x-1.5">
                    <i class="ph ph-bold ph-phone" />
                    <a
                      href={`tel:${basics.phone}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {basics.phone}
                    </a>
                  </div>
                  <div class="size-1 rounded-full bg-background last:hidden" />
                </>
              )}
              {basics.email && (
                <>
                  <div class="flex items-center gap-x-1.5">
                    <i class="ph ph-bold ph-at" />
                    <a
                      href={`mailto:${basics.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {basics.email}
                    </a>
                  </div>
                  <div class="size-1 rounded-full bg-background last:hidden" />
                </>
              )}
              {isUrl(basics.url.href) && (
                <>
                  <Link url={basics.url} />
                  <div class="size-1 rounded-full bg-background last:hidden" />
                </>
              )}
              {basics.custom_fields.map((item) => (
                <Fragment key={item.id}>
                  <div class="flex items-center gap-x-1.5">
                    <i class={cn(`ph ph-bold ph-${item.icon}`)} />
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
                  <div class="size-1 rounded-full bg-background last:hidden" />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </BaseSection>
  );
};

const Summary = ({ section }: SectionProps<SummarySection>) => {
  if (!section.visible || section.items.length < 1) return null;

  return (
    <Section<SummarySchema> section={section}>
      {(item: SummarySchema) => (
        <div
          v-html={item.content}
          class="wysiwyg"
          style={{ columns: section.columns }}
        />
      )}
    </Section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div class="flex items-center gap-x-1.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        class={cn(
          "ph ph-diamond text-primary",
          level > index && "ph-fill",
          level <= index && "ph-bold"
        )}
      />
      // <div
      //   key={index}
      //   className={cn("h-2 w-4 border border-primary", level > index && "bg-primary")}
      // />
    ))}
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
      {!iconOnRight &&
        (icon ?? (
          <i class="ph ph-bold ph-link text-primary group-[.summary]:text-background" />
        ))}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        class={cn("inline-block", className)}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight &&
        (icon ?? (
          <i class="ph ph-bold ph-link text-primary group-[.summary]:text-background" />
        ))}
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
      icon={
        <i class="ph ph-bold ph-globe text-primary group-[.summary]:text-background" />
      }
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
      <h4 class="mb-2 border-b border-primary text-base font-bold">
        {section.name}
      </h4>

      <div
        class="grid gap-x-6 gap-y-3"
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
              <div key={item.id} class={cn("space-y-2", className)}>
                <div>
                  {slots.default ? slots.default(item as T) : null}
                  {url !== undefined && section.separate_links && (
                    <Link url={url} />
                  )}
                </div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div v-html={summary} class="wysiwyg" />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p class="text-sm">{keywords.join(", ")}</p>
                )}
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <LinkedEntity
              name={item.company}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.position}</div>
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
            <div class="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <LinkedEntity
              name={item.institution}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.area}</div>
            <div>{item.score}</div>
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
            <div class="font-bold">{item.date}</div>
            <div>{item.study_type}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Awards = ({ section }: SectionProps<AwardSection>) => {
  return (
    <Section<AwardSchema> section={section} urlKey="url" summaryKey="summary">
      {(item: AwardSchema) => (
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <div class="font-bold">{item.title}</div>
            <LinkedEntity
              name={item.awarder}
              url={item.url}
              separate_links={section.separate_links}
            />
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
            <div class="font-bold">{item.date}</div>
          </div>
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <div class="font-bold">{item.name}</div>
            <LinkedEntity
              name={item.issuer}
              url={item.url}
              separate_links={section.separate_links}
            />
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
            <div class="font-bold">{item.date}</div>
          </div>
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
      className="space-y-1"
      keywordsKey="keywords"
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.publisher}</div>
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
            <div class="font-bold">{item.date}</div>
          </div>
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <LinkedEntity
              name={item.organization}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.position}</div>
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
            <div class="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.description}</div>
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
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
        <div class="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div class="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separate_links={section.separate_links}
              className="font-bold"
            />
            <div>{item.description}</div>
          </div>

          <div class="shrink-0 text-right group-[.sidebar]:text-left">
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

export const Pikachu = () => {
  const resumeStore = useResumeStore();
  const sections = resumeStore.$state.resume.data.sections;
  const basics = _.find(sections, {
    model: SectionModel.BASICS,
  }) as SectionWithItem;

  return (
    <div class="p-custom grid grid-cols-3 space-x-6">
      <div class="sidebar group space-y-4">
        {basics.items.length > 0 && (
          <Picture className="w-full !max-w-none" basics={basics.items[0] as BasicsSchema} />
        )}

        {sections
          .filter((item) => item.position == LayoutPosition.SIDEBAR)
          .map((section) => (
            <Fragment key={section.id}>
              {mapSectionToComponent(section)}
            </Fragment>
          ))}
      </div>

      <div class="main group col-span-2 space-y-4">
        <Header section={basics} />

        {sections
          .filter((item) => item.position == LayoutPosition.MAIN)
          .map((section) => (
            <Fragment key={section.id}>
              {mapSectionToComponent(section)}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
