import { createDto, kebabCase } from "~/lib/utils";
import * as v from 'valibot';

export const createResumeSchema = v.object({
  title: v.string(),
  slug: v.optional(v.string()),
  visibility: v.optional(v.number(), 0),
});

export class CreateResumeDto extends createDto(createResumeSchema) {}
