import * as v from 'valibot';

import { defaultItem, itemSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const skillSchema = v.object({
  ...itemSchema.entries,
  name: v.string(),
  description: v.string(),
  level: v.fallback(v.pipe(v.number(), v.minValue(0), v.maxValue(5)), 1),
  keywords: v.fallback(v.array(v.string()), []),
});

// Type
export type Skill = v.InferOutput<typeof skillSchema>;

// Defaults
export const defaultSkill: Skill = {
  ...defaultItem,
  name: "",
  description: "",
  level: 1,
  keywords: [],
};

export const skillSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("SKILLS"),
  items: v.array(skillSchema),
})

export type SkillSection = v.InferOutput<typeof skillSection>;