import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { createRepository } from 'src/common/utils/create-repository';

export const presignedUrlSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  fileType: z.enum(['image', 'audio', 'text', 'video', 'application']),
  key: z.string(),
  createdAt: z.string(),
});

export const presignedUrlRepo = createRepository({
  key: 'presignedUrls',
  schema: presignedUrlSchema,
  autoIncrementId: 'id',
  autoCreatedAt: 'createdAt',
});

export type IPresignedUrlEntity = z.infer<typeof presignedUrlSchema>;

export class PresignedUrlEntity extends createZodDto(presignedUrlSchema) {}
