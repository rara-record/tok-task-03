import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { createRepository } from 'src/common/utils/create-repository';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  password: z.string(),
  social: z.enum(['kakao', 'google', 'naver']).optional(),
  profileImg: z.string().url().optional(),
});

export const userRepo = createRepository({
  key: 'users',
  schema: userSchema,
  autoIncrementId: 'id',
  initial: [
    {
      id: 0,
      name: 'admin',
      password: 'admin',
    },
  ],
});

export type IUserEntity = z.infer<typeof userSchema>;

export class UserEntity extends createZodDto(userSchema) {}
