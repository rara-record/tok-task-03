import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const paginatedSchema = z.object({
  total: z.number().int().positive(),
  hasNextPage: z.boolean(),
  next: z.number().int().positive().nullable(),
});

export class PaginatedDto<T> extends createZodDto(paginatedSchema) {
  result: T[];
}
