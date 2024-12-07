import * as v from 'valibot';

// Schema
export const urlSchema = v.object({
  label: v.string(),
  href: v.union([v.literal(""), v.pipe(v.string(), v.url())]),
});

// Type
export type URL = v.InferOutput<typeof urlSchema>;

// Defaults
export const defaultUrl: URL = {
  label: "",
  href: "",
};
