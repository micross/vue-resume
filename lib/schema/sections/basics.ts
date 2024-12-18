import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

export const customFieldSchema = v.object({
  id: v.string(),
  icon: v.string(),
  name: v.string(),
  value: v.string(),
});

export type CustomField = v.InferOutput<typeof customFieldSchema>;

// Schema
export const basicsSchema = v.object({
  ...itemSchema.entries,
  name: v.string(),
  headline: v.string(),
  email: v.union([v.pipe(v.string(), v.email()), v.literal("")]),
  phone: v.string(),
  location: v.string(),
  url: urlSchema,
  custom_fields: v.array(customFieldSchema),
  avatar: v.object({
    url: v.string(),
    size: v.fallback(v.number(), 64),
    aspect_ratio: v.fallback(v.number(), 1),
    border_radius: v.fallback(v.number(), 0),
    effects: v.object({
      hidden: v.fallback(v.boolean(), false),
      border: v.fallback(v.boolean(), false),
      grayscale: v.fallback(v.boolean(), false),
    }),
  }),
});

// Type
export type Basics = v.InferOutput<typeof basicsSchema>;

// Defaults
export const defaultBasics: Basics = {
  ...defaultItem,
  name: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  url: defaultUrl,
  custom_fields: [],
  avatar: {
    url: "",
    size: 64,
    aspect_ratio: 1,
    border_radius: 0,
    effects: {
      hidden: false,
      border: false,
      grayscale: false,
    },
  },
};

export const basicsSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("BASICS"),
  items: v.array(basicsSchema),
});

export type BasicsSection = v.InferOutput<typeof basicsSection>;
