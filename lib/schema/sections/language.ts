import * as v from 'valibot';

import { defaultItem, itemSchema } from "../shared";
import { sectionSchema } from './section';

enum LanguageLevel {
  None = 1,
  Basic,
  Intermediate,
  Advanced,
  Native 
}

// Schema
export const languageSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  description: v.string(),
  level: v.enum(LanguageLevel),
});

// Type
export type Language = v.InferOutput<typeof languageSchema>;

// Defaults
export const defaultLanguage: Language = {
  ...defaultItem,
  name: "",
  description: "",
  level: LanguageLevel.None,
};

export const languageSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("LANGUAGES"),
  items: v.array(languageSchema),
})

export type LanguageSection = v.InferOutput<typeof languageSection>;