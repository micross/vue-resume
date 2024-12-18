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
  type SectionWithItem as SectionWithItemSchema,
  type Skill as SkillSchema,
  type URL as URLSchema,
  type Volunteer as VolunteerSchema,
  type Basics as BasicsSchema,
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
import {
  cn,
  isEmptyString,
  isUrl,
} from "~/lib/utils";
import get from "lodash.get";
import { Fragment } from "vue/jsx-runtime";
import { Picture } from "../picture";
import { useResumeStore } from "~/stores/resume";
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
        <div class="grid grid-cols-4 gap-x-6">
          <div class="mt-1 space-y-2 text-right">
            <Picture className="ml-auto" basics={basics} />
          </div>

          <div class="col-span-3 space-y-2">
            <div>
              <div class="text-2xl font-bold">{basics.name}</div>
              <div class="text-base">{basics.headline}</div>
            </div>

            <div class="space-y-1 text-sm">
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
            </div>

            <div class="flex flex-wrap gap-x-3 text-sm">
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
                    <>
                      <span class="text-primary">{item.name}</span>
                      <span>{item.value}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </BaseSection>
  );
};


const Summary = ({ section }: SectionProps<SummarySection>) => {
  if (!section.visible) return null;

  return (
    <section id={section.model} class="grid grid-cols-4 gap-x-6">
      <div class="text-right">
        <h4 class="font-medium text-primary">{section.name}</h4>
      </div>

      <div class="col-span-3">
        <div class="relative">
          <hr class="mt-3 border-primary pb-3" />
          <div class="absolute bottom-3 right-0 size-3 bg-primary" />
        </div>

        {section.items.map((item) => (
          <div
            v-html={item.content}
            class="wysiwyg"
            style={{ columns: section.columns }}
          />
        ))}
      </div>
    </section>
  );
};

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
  urlKey?: keyof T;
  dateKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  urlKey,
  dateKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  const slots = useSlots();
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section
      id={section.model}
      class={cn("grid", dateKey !== undefined && "gap-y-4")}
    >
      <div class="grid grid-cols-4 gap-x-6">
        <div class="text-right">
          <h4 class="font-medium text-primary">{section.name}</h4>
        </div>

        <div class="col-span-3">
          <div class="relative">
            <hr class="mt-3 border-primary" />
            <div class="absolute bottom-0 right-0 size-3 bg-primary" />
          </div>
        </div>
      </div>

      {dateKey !== undefined && (
        <div class="grid grid-cols-4 gap-x-6 gap-y-4">
          {section.items
            .filter((item) => item.visible)
            .map((item) => {
              const url = (urlKey && get(item, urlKey)) as
                | URLSchema
                | undefined;
              const date = (dateKey && get(item, dateKey, "")) as
                | string
                | undefined;
              const summary = (summaryKey && get(item, summaryKey, "")) as
                | string
                | undefined;
              const keywords = (keywordsKey && get(item, keywordsKey, [])) as
                | string[]
                | undefined;

              return (
                <Fragment key={item.id}>
                  <div class="text-right font-medium text-primary">{date}</div>

                  <div class="col-span-3 space-y-1">
                    {slots.default ? slots.default(item as T) : null}

                    {url !== undefined && section.separate_links && (
                      <Link url={url} />
                    )}

                    {summary !== undefined && !isEmptyString(summary) && (
                      <div v-html={summary} class="wysiwyg" />
                    )}

                    {keywords !== undefined && keywords.length > 0 && (
                      <p class="text-sm">{keywords.join(", ")}</p>
                    )}
                  </div>
                </Fragment>
              );
            })}
        </div>
      )}

      {dateKey === undefined && (
        <div class="grid grid-cols-4 gap-x-6">
          <div
            class="col-span-3 col-start-2 grid gap-x-6 gap-y-3"
            style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
          >
            {section.items
              .filter((item) => item.visible)
              .map((item) => {
                const url = (urlKey && get(item, urlKey)) as
                  | URLSchema
                  | undefined;
                const summary = (summaryKey && get(item, summaryKey, "")) as
                  | string
                  | undefined;
                const keywords = (keywordsKey && get(item, keywordsKey, [])) as
                  | string[]
                  | undefined;

                return (
                  <div key={item.id}>
                    {slots.default ? slots.default(item as T) : null}

                    {url !== undefined && section.separate_links && (
                      <Link url={url} />
                    )}

                    {summary !== undefined && !isEmptyString(summary) && (
                      <div v-html={summary} class="wysiwyg" />
                    )}

                    {keywords !== undefined && keywords.length > 0 && (
                      <p class="text-sm">{keywords.join(", ")}</p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
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
      dateKey="date"
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
      dateKey="date"
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
          <div>{item.study_type}</div>
          <div>{item.score}</div>
        </div>
      )}
    </Section>
  );
};

const Awards = ({ section }: SectionProps<AwardSection>) => {
  return (
    <Section<AwardSchema>
      section={section}
      urlKey="url"
      dateKey="date"
      summaryKey="summary"
    >
      {(item: AwardSchema) => (
        <div>
          <div class="font-bold">{item.title}</div>
          <LinkedEntity
            name={item.awarder}
            url={item.url}
            separate_links={section.separate_links}
          />
        </div>
      )}
    </Section>
  );
};

const Certifications = ({
  section,
}: SectionProps<CertificationSection>) => {
  return (
    <Section<CertificationSchema>
      section={section}
      urlKey="url"
      dateKey="date"
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
    <Section<InterestSchema> section={section} keywordsKey="keywords">
      {(item: InterestSchema) => <div class="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = ({
  section,
}: SectionProps<PublicationSection>) => {
  return (
    <Section<PublicationSchema>
      section={section}
      urlKey="url"
      dateKey="date"
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
      dateKey="date"
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
      dateKey="date"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item: ProjectSchema) => (
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
      dateKey="date"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item: CustomSectionSchema) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separate_links={section.separate_links}
            className="font-bold"
          />
          <div>{item.description}</div>
          <div>{item.location}</div>
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

export const Nosepass = () => {
  const resumeStore = useResumeStore();
  const sections = resumeStore.$state.resume.data.sections;
  const basics = _.find(sections, {
    model: SectionModel.BASICS,
  }) as SectionWithItem;

  return (
    <div class="p-custom space-y-6">

      <Header section={basics} />

      <div class="space-y-4">
        {sections
          .filter((item) => item.position == LayoutPosition.MAIN)
          .map((section) => (
            <Fragment key={section.id}>
              {mapSectionToComponent(section)}
            </Fragment>
          ))}

        {sections
          .filter((item) => item.position == LayoutPosition.SIDEBAR)
          .map((section) => (
            <Fragment key={section.id}>
              {mapSectionToComponent(section)}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
