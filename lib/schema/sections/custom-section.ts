import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const customSectionSchema = v.object({
  ...itemSchema.entries,
  name: v.string(),
  description: v.string(),
  date: v.string(),
  location: v.string(),
  summary: v.string(),
  keywords: v.fallback(v.array(v.string()), []),
  url: urlSchema,
});

// Type
export type CustomSection = v.InferOutput<typeof customSectionSchema>;

// Defaults
export const defaultCustomSection: CustomSection = {
  ...defaultItem,
  name: "",
  description: "",
  date: "",
  location: "",
  summary: "",
  keywords: [],
  url: defaultUrl,
};

export const customSectionSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("CUSTOM"),
  items: v.array(customSectionSchema),
})

export type CustomSectionSection = v.InferOutput<typeof customSectionSection>;