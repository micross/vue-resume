import * as v from 'valibot';
import { idSchema } from '../shared';

export enum LayoutPosition {
    MAIN = 'MAIN',
    SIDEBAR = 'SIDEBAR',
  }

export const sectionSchema = v.object({
    id: idSchema,
    name: v.string(),
    position: v.enum(LayoutPosition),
    columns: v.fallback(v.pipe(v.number(), v.minValue(1), v.maxValue(5)), 1),
    separate_links: v.fallback(v.boolean(), true),
    visible: v.fallback(v.boolean(), true),
});