import * as v from 'valibot';

import { defaultItem, itemSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const interestSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  keywords: v.fallback(v.array(v.string()), []),
});

// Type
export type Interest = v.InferInput<typeof interestSchema>;

// Defaults
export const defaultInterest: Interest = {
  ...defaultItem,
  name: "",
  keywords: [],
};

export const interestSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("INTERESTS"),
  items: v.array(interestSchema),
})

export type InterestSection = v.InferOutput<typeof interestSection>;