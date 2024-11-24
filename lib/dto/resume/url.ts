import * as v from 'valibot';
import { createDto } from "~/lib/utils";


export const urlSchema = v.object({ url: v.pipe(v.string(), v.url()) });

export class UrlDto extends createDto(urlSchema) {}
