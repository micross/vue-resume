import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const updatePasswordSchema = v.object({
  password: v.pipe(v.string(), v.minLength(6)),
});

export class UpdatePasswordDto extends createDto(updatePasswordSchema) {}
