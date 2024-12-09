import * as v from 'valibot';

import { defaultItem, itemSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const languageSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  description: v.string(),
  level: v.fallback(v.pipe(v.number(), v.minValue(0), v.maxValue(5)), 1),
});

// Type
export type Language = v.InferOutput<typeof languageSchema>;

// Defaults
export const defaultLanguage: Language = {
  ...defaultItem,
  name: "",
  description: "",
  level: 1,
};

export const languageSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("LANGUAGES"),
  items: v.array(languageSchema),
})

export type LanguageSection = v.InferOutput<typeof languageSection>;