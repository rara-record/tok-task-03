import { createZodDto } from 'nestjs-zod';
import { postSchema } from '../entities/post.entity';

export class UpdatePostDto extends createZodDto(
  postSchema.omit({ id: true }).partial(),
) {}
