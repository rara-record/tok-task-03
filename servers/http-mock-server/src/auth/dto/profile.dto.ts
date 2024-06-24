import { createZodDto } from 'nestjs-zod';
import { userSchema } from 'src/users/entities/user.entities';

export class ProfileDto extends createZodDto(
  userSchema.omit({ password: true }),
) {}
