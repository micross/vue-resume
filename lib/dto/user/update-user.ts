import { createDto } from "~/lib/utils";
import { userSchema } from "./user";
import * as v from 'valibot';

export const updateUserSchema = v.partial(v.pick(userSchema, [
  'name',
  'locale',
  'username',
  'email',
  'avatar',
]));

export class UpdateUserDto extends createDto(updateUserSchema) {}
