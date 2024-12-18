import * as v from 'valibot';

export const metadataSchema = v.object({
  template: v.fallback(v.string(), "rhyhorn"),
  css: v.object({
    value: v.fallback(v.string(), ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}"),
    visible: v.fallback(v.boolean(), false),
  }),
  page: v.object({
    margin: v.fallback(v.number(), 18),
    format: v.fallback(v.picklist(["a4", "letter"]), "a4"),
    options: v.object({
      break_line: v.fallback(v.boolean(), true),
      page_numbers: v.fallback(v.boolean(), true),
    }),
  }),
  theme: v.object({
    background: v.fallback(v.string(), "#ffffff"),
    text: v.fallback(v.string(), "#000000"),
    primary: v.fallback(v.string(), "#dc2626"),
  }),
  typography: v.object({
    font: v.object({
      family: v.fallback(v.string(), "IBM Plex Serif"),
      subset: v.fallback(v.string(), "latin"),
      variants: v.fallback(v.array(v.string()), ["regular"]),
      size: v.fallback(v.number(), 14),
    }),
    line_height: v.fallback(v.number(), 1.5),
    hide_icons: v.fallback(v.boolean(), false),
    underline_links: v.fallback(v.boolean(), true),
  }),
  notes: v.fallback(v.string(), ""),
});

// Type
export type Metadata = v.InferOutput<typeof metadataSchema>;

// Defaults
export const defaultMetadata: Metadata = {
  template: "rhyhorn",
  css: {
    value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
    visible: false,
  },
  page: {
    margin: 18,
    format: "a4",
    options: {
      break_line: true,
      page_numbers: true,
    },
  },
  theme: {
    background: "#ffffff",
    text: "#000000",
    primary: "#dc2626",
  },
  typography: {
    font: {
      family: "IBM Plex Serif",
      subset: "latin",
      variants: ["regular", "italic", "600"],
      size: 14,
    },
    line_height: 1.5,
    hide_icons: false,
    underline_links: true,
  },
  notes: "",
};
