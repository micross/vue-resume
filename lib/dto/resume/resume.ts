import { defaultResumeData, idSchema, resumeDataSchema } from "~/lib/schema";

import { userSchema } from "../user";
import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const resumeSchema = v.object({
  id: idSchema,
  title: v.string(),
  slug: v.string(),
  data: v.fallback(resumeDataSchema, defaultResumeData),
  visibility: v.fallback(v.number(), 0),
  locked: v.fallback(v.boolean(), false),
  userId: idSchema,
  user: v.optional(userSchema),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export class ResumeDto extends createDto(resumeSchema) {}
