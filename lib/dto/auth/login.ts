import { createDto } from "~/lib/utils";
import * as v from 'valibot';

export const loginSchema = v.object({
  identifier: v.string(),
  password: v.pipe(v.string(), v.minLength(6)),
});


export class LoginDto extends createDto(loginSchema) { }
