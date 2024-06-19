import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class CredentialDto extends createZodDto(
  z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  }),
) {}
