import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const referenceSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  description: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Reference = v.InferOutput<typeof referenceSchema>;

// Defaults
export const defaultReference: Reference = {
  ...defaultItem,
  name: "",
  description: "",
  summary: "",
  url: defaultUrl,
};

export const referenceSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("REFERENCES"),
  items: v.array(referenceSchema),
})

export type ReferenceSection = v.InferOutput<typeof referenceSection>;