import * as v from 'valibot';

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { sectionSchema } from './section';

// Schema
export const certificationSchema = v.object({
  ...itemSchema.entries,
  name: v.pipe(v.string(), v.minLength(1)),
  issuer: v.string(),
  date: v.string(),
  summary: v.string(),
  url: urlSchema,
});

// Type
export type Certification = v.InferOutput<typeof certificationSchema>;

// Defaults
export const defaultCertification: Certification = {
  ...defaultItem,
  name: "",
  issuer: "",
  date: "",
  summary: "",
  url: defaultUrl,
};

export const certificationSection = v.object({
  ...sectionSchema.entries,
  model: v.literal("CERTIFICATIONS"),
  items: v.array(certificationSchema),
});

export type CertificationSection = v.InferOutput<typeof certificationSection>;