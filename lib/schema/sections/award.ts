import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const awardSchema = v.object({
  ...itemSchema.entries,
  title: v.pipe(v.string(), v.minLength(1)),
  awarder: v.string(),
  date: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Award = v.InferOutput<typeof awardSchema>;

// Defaults
export const defaultAward: Award = {
  ...defaultItem,
  title: "",
  awarder: "",
  date: "",
  summary: "",
  url: defaultUrl,
};

export const awardSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("AWARDS"),
  items: v.array(awardSchema),
});

export type AwardSection = v.InferOutput<typeof awardSection>;