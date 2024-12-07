import * as v from 'valibot';

import { basicsSection } from "./basics";
import { awardSection } from "./award";
import { certificationSection } from "./certification";
import { customSectionSection } from "./custom-section";
import { educationSection } from "./education";
import { experienceSection } from "./experience";
import { interestSection } from "./interest";
import { languageSection } from "./language";
import { profileSection } from "./profile";
import { projectSection } from "./project";
import { publicationSection } from "./publication";
import { referenceSection } from "./reference";
import { skillSection } from "./skill";
import { volunteerSection } from "./volunteer";
import { summarySection } from './summary';
import { LayoutPosition, type sectionSchema } from './section';
import { createId } from '@paralleldrive/cuid2';

export const sectionsSchema = v.array(v.union([
  basicsSection,
  summarySection,
  awardSection,
  certificationSection,
  educationSection,
  experienceSection,
  volunteerSection,
  interestSection,
  languageSection,
  profileSection,
  projectSection,
  publicationSection,
  referenceSection,
  skillSection,
  customSectionSection,
]));

// Detailed Types
export type Section = v.InferOutput<typeof sectionSchema>;
export type Sections = v.InferOutput<typeof sectionsSchema>;

export const enum SectionModel {
  BASICS = "BASICS",
  SUMMARY = "SUMMARY",
  AWARDS = "AWARDS",
  CERTIFICATIONS = "CERTIFICATIONS",
  EDUCATION = "EDUCATION",
  EXPERIENCE = "EXPERIENCE",
  VOLUNTEER = "VOLUNTEER",
  INTERESTS = "INTERESTS",
  LANGUAGES = "LANGUAGES",
  PROFILES = "PROFILES",
  PROJECTS = "PROJECTS",
  PUBLICATIONS = "PUBLICATIONS",
  REFERENCES = "REFERENCES",
  SKILLS = "SKILLS",
  CUSTOM = "CUSTOM"
}

export type SectionKey = keyof typeof SectionModel
export type SectionWithItem<T = unknown> = Sections[number];
export type SectionItem = SectionWithItem["items"][number];

// Defaults
export const defaultSection: Section = {
  id: createId(),
  name: "",
  columns: 1,
  separate_links: true,
  position: LayoutPosition.MAIN,
  visible: true,
};

export const defaultSections: Sections = [
  { ...defaultSection, model: SectionModel.BASICS, name: "Basics", items: [] },
  { ...defaultSection, model: SectionModel.SUMMARY, name: "Summary", items: [] },
  { ...defaultSection, model: SectionModel.AWARDS, name: "Awards", items: [] },
  { ...defaultSection, model: SectionModel.CERTIFICATIONS, name: "Certifications", items: [] },
  { ...defaultSection, model: SectionModel.EDUCATION, name: "Education", items: [] },
  { ...defaultSection, model: SectionModel.EXPERIENCE, name: "Experience", items: [] },
  { ...defaultSection, model: SectionModel.VOLUNTEER, name: "Volunteering", items: [] },
  { ...defaultSection, model: SectionModel.INTERESTS, name: "Interests", items: [] },
  { ...defaultSection, model: SectionModel.LANGUAGES, name: "Languages", items: [] },
  { ...defaultSection, model: SectionModel.PROFILES, name: "Profiles", items: [] },
  { ...defaultSection, model: SectionModel.PROJECTS, name: "Projects", items: [] },
  { ...defaultSection, model: SectionModel.PUBLICATIONS, name: "Publications", items: [] },
  { ...defaultSection, model: SectionModel.REFERENCES, name: "References", items: [] },
  { ...defaultSection, model: SectionModel.SKILLS, name: "Skills", items: [] },
  { ...defaultSection, model: SectionModel.CUSTOM, name: "Custom", items: [] },
];

export * from "./award";
export * from "./certification";
export * from "./custom-section";
export * from "./education";
export * from "./experience";
export * from "./interest";
export * from "./language";
export * from "./profile";
export * from "./project";
export * from "./publication";
export * from "./reference";
export * from "./skill";
export * from "./volunteer";
export * from "./summary";
export * from "./basics";
