import * as v from 'valibot';
import { createDto } from "~/lib/utils";

export const twoFactorSchema = v.object({
  code: v.pipe(
    v.string(),
    v.length(6, "Code must be a 6 digit number"),
    v.regex(/^\d+$/, "Code must be a 6 digit number"),
  )
});

export class TwoFactorDto extends createDto(twoFactorSchema) {}

export const backupCodesSchema = v.object({
  backupCodes: v.pipe(v.array(v.string()), v.length(10)),
});

export class BackupCodesDto extends createDto(backupCodesSchema) {}

export const twoFactorBackupSchema = v.object({
  code: v.pipe(v.string(), v.length(10)),
});

export class TwoFactorBackupDto extends createDto(twoFactorBackupSchema) {}
