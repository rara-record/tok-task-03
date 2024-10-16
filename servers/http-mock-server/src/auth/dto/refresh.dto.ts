import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const refreshSchema = z.object({
  refreshToken: z.string(),
});

export class RefreshDto extends createZodDto(refreshSchema) {}
