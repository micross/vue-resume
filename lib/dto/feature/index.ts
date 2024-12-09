import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const featureSchema = v.object({
  is_signups_disabled: v.optional(v.boolean(), false),
  is_email_auth_disabled: v.optional(v.boolean(), false),
});

export class FeatureDto extends createDto(featureSchema) {}
