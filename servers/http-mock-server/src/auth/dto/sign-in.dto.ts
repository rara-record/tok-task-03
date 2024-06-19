import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const signInSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(3).max(255),
});

export class SignInDto extends createZodDto(signInSchema) {}
