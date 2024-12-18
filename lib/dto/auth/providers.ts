import * as v from 'valibot';
import { createDto } from "~/lib/utils";

const authProvidersSchema = v.array(v.picklist(["email", "github", "google"]));

export class AuthProvidersDto extends createDto(authProvidersSchema) {}
