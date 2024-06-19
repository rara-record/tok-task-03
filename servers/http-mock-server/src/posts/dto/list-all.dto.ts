import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const listAllSchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(10)
    .describe('The maximum number of posts to return'),
  cursor: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .describe('The cursor to start from'),
});

export class ListAllDto extends createZodDto(listAllSchema) {}
