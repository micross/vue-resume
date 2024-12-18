import * as v from 'valibot';

import { defaultItem, itemSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const summarySchema = v.object({
  ...itemSchema.entries,
  content: v.fallback(v.string(), "")
});

// Type
export type Summary = v.InferOutput<typeof summarySchema>;

// Defaults
export const defaultSummary: Summary = {
  ...defaultItem,
  content: "",
};

export const summarySection = v.object({
  ...sectionSchema.entries,
  model: v.literal("SUMMARY"),
  items: v.array(summarySchema),
});

export type SummarySection = v.InferOutput<typeof summarySection>;