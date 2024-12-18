import * as v from 'valibot';

import { idSchema } from "./id";

// Schema
export const itemSchema = v.object({
  id: idSchema,
  visible: v.boolean(),
});

// Type
export type Item = v.InferOutput<typeof itemSchema>;

// Defaults
export const defaultItem: Item = {
  id: "",
  visible: true,
};
