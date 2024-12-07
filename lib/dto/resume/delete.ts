import { idSchema } from "~/lib/schema";
import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const deleteResumeSchema = v.object({
  id: idSchema,
});

export class DeleteResumeDto extends createDto(deleteResumeSchema) {}
