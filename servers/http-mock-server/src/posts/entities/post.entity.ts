import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const postSchema = z.object({
  id: z.number().int().positive().describe("The post's id"),
  title: z.string().describe("The post's title"),
  content: z.string().describe("The post's content"),
});

export type IPostEntity = z.infer<typeof postSchema>;

export class PostEntity extends createZodDto(postSchema) {}
