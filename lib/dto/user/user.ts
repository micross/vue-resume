import { idSchema } from "~/lib/schema";
import { secretsSchema } from "../secrets";
import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const usernameSchema = v.pipe(
  v.string(),
  v.minLength(3),
  v.maxLength(255),
  v.regex(/^[\d._a-z-]+$/, "Usernames can only contain lowercase letters, numbers, periods, hyphens, and underscores."
  )
);

export const userSchema = v.object({
  id: idSchema,
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
  avatar: v.union([v.pipe(v.string(), v.url()), v.literal(''), v.null()]),
  username: usernameSchema,
  email: v.pipe(v.string(), v.email()),
  locale: v.optional(v.string(), "en-US"),
  emailVerified: v.optional(v.boolean(), false),
  two_factor_enabled: v.optional(v.boolean(), false),
  provider: v.optional(v.picklist(["email", "github", "google"]), "email"),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export class UserDto extends createDto(userSchema) {}

export const userWithSecretsSchema = v.object({
  userSchema,
  secrets: secretsSchema
})

export class UserWithSecrets extends createDto(userWithSecretsSchema) {}
