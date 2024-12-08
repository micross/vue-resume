import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const educationSchema = v.object({
  ...itemSchema.entries,
  institution: v.pipe(v.string(), v.minLength(1)),
  study_type: v.string(),
  area: v.string(),
  score: v.string(),
  date: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Education = v.InferOutput<typeof educationSchema>;

// Defaults
export const defaultEducation: Education = {
  ...defaultItem,
  id: "",
  institution: "",
  study_type: "",
  area: "",
  score: "",
  date: "",
  summary: "",
  url: defaultUrl,
};

export const educationSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("EDUCATION"),
  items: v.array(educationSchema),
});

export type EducationSection = v.InferOutput<typeof educationSection>;