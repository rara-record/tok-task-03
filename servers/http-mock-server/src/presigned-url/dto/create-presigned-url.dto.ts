import { createZodDto } from 'nestjs-zod';
import { presignedUrlSchema } from '../entities/presigned-url.entity';

export class CreatePresignedUrlDto extends createZodDto(
  presignedUrlSchema.pick({ fileName: true, fileType: true }),
) {}
