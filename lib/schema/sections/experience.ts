import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const experienceSchema = v.object({
  ...itemSchema.entries,
  company: v.pipe(v.string(), v.minLength(1)),
  position: v.string(),
  location: v.string(),
  date: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Experience = v.InferOutput<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
};

export const experienceSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("EXPERIENCE"),
  items: v.array(experienceSchema),
})

export type ExperienceSection = v.InferOutput<typeof experienceSection>;