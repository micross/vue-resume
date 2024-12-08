import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const profileSchema = v.object({
  ...itemSchema.entries,
  network: v.pipe(v.string(), v.minLength(1)),
  username: v.pipe(v.string(), v.minLength(1)),
  icon: v.string(),
  url: urlSchema,
});

// Type
export type Profile = v.InferOutput<typeof profileSchema>;

// Defaults
export const defaultProfile: Profile = {
  ...defaultItem,
  network: "",
  username: "",
  icon: "",
  url: defaultUrl,
};

export const profileSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("PROFILES"),
  items: v.array(profileSchema),
})

export type ProfileSection = v.InferOutput<typeof profileSection>;