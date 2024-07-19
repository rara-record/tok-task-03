import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createPresignedUrlResponseSchema = z.object({
  url: z.string(),
  fields: z.object({
    key: z.string(),
  }),
});

export class CreatePresignedUrlResponseDto extends createZodDto(
  createPresignedUrlResponseSchema,
) {}
