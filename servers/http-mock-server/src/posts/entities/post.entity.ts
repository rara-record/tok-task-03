import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { createRepository } from 'src/common/utils/create-repository';

export const postSchema = z.object({
  id: z.number().int().describe("The post's id"),
  title: z.string().describe("The post's title"),
  content: z.string().describe("The post's content"),
});

export const postRepo = createRepository({
  key: 'posts',
  schema: postSchema,
  autoIncrementId: 'id',
  initial: Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    title: `Post ${i}`,
    content: `This is post #${i}`,
  })),
});

export type IPostEntity = z.infer<typeof postSchema>;

export class PostEntity extends createZodDto(postSchema) {}
