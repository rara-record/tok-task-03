import { createZodDto } from 'nestjs-zod';
import { postSchema } from '../entities/post.entity';

export class CreatePostDto extends createZodDto(
  postSchema.omit({ id: true }),
) {}
