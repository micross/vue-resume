import { resumeDataSchema } from "~/lib/schema";
import { createDto, kebabCase } from "~/lib/utils";
import * as v from 'valibot';

export const importResumeSchema = v.object({
  title: v.optional(v.string()),
  slug: v.optional(v.string()),
  visibility: v.optional(v.number(), 0),
  data: resumeDataSchema,
});

export class ImportResumeDto extends createDto(importResumeSchema) {}
