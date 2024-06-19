import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  password: z.string(),
  social: z.enum(['kakao', 'google', 'naver']).optional(),
});

export type IUserEntity = z.infer<typeof userSchema>;

export class UserEntity extends createZodDto(userSchema) {}
