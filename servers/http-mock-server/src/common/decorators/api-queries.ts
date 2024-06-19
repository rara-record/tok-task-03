import { applyDecorators } from '@nestjs/common';
import type { ApiQueryOptions } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import type { ZodRawShape } from 'nestjs-zod/z';
import { z } from 'nestjs-zod/z';

export const ApiQueries = <T extends z.ZodObject<ZodRawShape>>(
  zodObject: T,
) => {
  const optionsList = Object.keys(zodObject.shape).reduce<
    Array<ApiQueryOptions & { schema: ReturnType<typeof zodToOpenAPI> }>
  >((acc, name) => {
    const zodType = zodObject.shape[name];

    if (zodType)
      acc.push({
        name,
        required: !zodType.isOptional(),
        schema: zodToOpenAPI(zodType),
      });

    return acc;
  }, []);

  return applyDecorators(...optionsList.map((options) => ApiQuery(options)));
};
