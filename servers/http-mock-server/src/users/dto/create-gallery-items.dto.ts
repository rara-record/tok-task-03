import { createZodDto } from 'nestjs-zod';
import { gallerySchema } from '../entities/gallery.entities';
import { z } from 'nestjs-zod/z';

export class CreateGalleryItemsDto extends createZodDto(
  z.object({
    srcSet: z.array(gallerySchema.shape.src),
  }),
) {}
