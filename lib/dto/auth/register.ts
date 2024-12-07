import * as v from 'valibot';
import { createDto } from "~/lib/utils";
import { usernameSchema } from "../user";

export const registerSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
  username: usernameSchema,
  email: v.pipe(v.string(), v.email()),
  locale: v.optional(v.string(), "en-US"),
  password: v.pipe(v.string(), v.minLength(6))
 });

export class RegisterDto extends createDto(registerSchema) {}
