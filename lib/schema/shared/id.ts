import { createId } from "@paralleldrive/cuid2";
import * as v from 'valibot';

export const idSchema = v.fallback(v.pipe(v.string(), v.cuid2()), () => createId());

export type ID = v.InferOutput<typeof idSchema>;
