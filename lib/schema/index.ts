import * as v from 'valibot';


import { defaultMetadata, metadataSchema } from "./metadata";
import { defaultSections, sectionsSchema } from "./sections";

// Schema
export const resumeDataSchema = v.object({
  sections: sectionsSchema,
  metadata: metadataSchema,
});

// Type
export type ResumeData = v.InferOutput<typeof resumeDataSchema>;

// Defaults
export const defaultResumeData: ResumeData = {
  sections: defaultSections,
  metadata: defaultMetadata,
};

export * from "./metadata";
export * from "./sample";
export * from "./sections";
export * from "./shared";
