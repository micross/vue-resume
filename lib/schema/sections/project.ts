import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const projectSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  description: v.string(),
  date: v.string(),
  summary: v.string(),
  keywords: v.fallback(v.array(v.string()), []),
  url: urlSchema,
});

// Type
export type Project = v.InferOutput<typeof projectSchema>;

// Defaults
export const defaultProject: Project = {
  ...defaultItem,
  name: "",
  description: "",
  date: "",
  summary: "",
  keywords: [],
  url: defaultUrl,
};

export const projectSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("PROJECTS"),
  items: v.array(projectSchema),
})

export type ProjectSection = v.InferOutput<typeof projectSection>;