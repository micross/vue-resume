import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const publicationSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  publisher: v.string(),
  date: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Publication = v.InferOutput<typeof publicationSchema>;

// Defaults
export const defaultPublication: Publication = {
  ...defaultItem,
  name: "",
  publisher: "",
  date: "",
  summary: "",
  url: defaultUrl,
};

export const publicationSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("PUBLICATIONS"),
  items: v.array(publicationSchema),
})

export type PublicationSection = v.InferOutput<typeof publicationSection>;