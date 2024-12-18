import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const messageSchema = v.object({ message: v.string() });

export class MessageDto extends createDto(messageSchema) {}
