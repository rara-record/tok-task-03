import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { createRepository } from 'src/common/utils/create-repository';

export const gallerySchema = z.object({
  userId: z.number(),
  src: z.string().url('Invalid URL'),
  createdAt: z.string(),
});

export const galleryRepo = createRepository({
  key: 'gallery',
  autoCreatedAt: 'createdAt',
  schema: gallerySchema,
});

export type IGalleryEntity = z.infer<typeof gallerySchema>;

export class GalleryEntity extends createZodDto(gallerySchema) {}
