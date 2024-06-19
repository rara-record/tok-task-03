import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createPaginatedSchema = (
  entity: z.ZodTypeAny,
  config?: { cursorSchema?: z.ZodTypeAny },
) => {
  return z.object({
    result: z.array(entity),
    total: z.number().int().positive(),
    hasNextPage: z.boolean(),
    next: config?.cursorSchema || z.number().int().positive().optional(),
  });
};

export const createPaginatedDto = (
  entity: z.ZodTypeAny,
  config?: { cursorSchema?: z.ZodTypeAny },
) => {
  return createZodDto(createPaginatedSchema(entity, config));
};
