import * as v from 'valibot';
import { idSchema } from "~/lib/schema";

export const secretsSchema = v.object({
  id: idSchema,
  password: v.nullable(v.string()),
  lastSignedIn: v.nullable(v.date()),
  verificationToken: v.nullable(v.string()),
  twoFactorSecret: v.nullable(v.string()),
  twoFactorBackupCodes: v.optional(v.array(v.string()), []),
  refreshToken: v.nullable(v.string()),
  resetToken: v.nullable(v.string()),
  userId: idSchema,
});
