

import * as v from 'valibot';
import { createDto } from "~/lib/utils";
import { userSchema } from "../user";

export const authResponseSchema = v.object({
  status: v.picklist(["authenticated", "2fa_required"]),
  user: userSchema,
  token: v.string(),
});

export class AuthResponseDto extends createDto(authResponseSchema) {}
