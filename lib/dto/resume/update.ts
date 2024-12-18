import * as v from 'valibot';
import { createDto } from "~/lib/utils";
import { resumeSchema } from "./resume";

export const updateResumeSchema = v.partial(resumeSchema);

export class UpdateResumeDto extends createDto(updateResumeSchema) {}
