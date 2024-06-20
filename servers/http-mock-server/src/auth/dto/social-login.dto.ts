import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const socialLoginSchema = z.object({
  code: z.string(),
  type: z.enum(['kakao', 'google', 'naver']),
});

export class SocialLoginDto extends createZodDto(socialLoginSchema) {}
