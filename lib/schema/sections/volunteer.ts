import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const volunteerSchema = v.object({
  ...itemSchema.entries,
  organization: v.pipe(v.string(), v.minLength(1)),
  position: v.string(),
  location: v.string(),
  date: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Volunteer = v.InferOutput<typeof volunteerSchema>;

// Defaults
export const defaultVolunteer: Volunteer = {
  ...defaultItem,
  organization: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
};


export const volunteerSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("VOLUNTEER"),
  items: v.array(volunteerSchema),
});

export type VolunteerSection = v.InferOutput<typeof volunteerSection>;