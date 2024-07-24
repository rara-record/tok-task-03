import { createZodDto } from 'nestjs-zod';
import { gallerySchema } from '../entities/gallery.entities';
import { z } from 'nestjs-zod/z';

export class CreateGalleryItemsResponseDto extends createZodDto(
  z.object({
    uploaded: z.array(gallerySchema),
    failed: z.array(
      z.object({
        src: z.string(),
        error: z.string(),
      }),
    ),
  }),
) {}
