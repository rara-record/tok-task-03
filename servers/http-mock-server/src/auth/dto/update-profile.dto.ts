import { createZodDto } from 'nestjs-zod';
import { userSchema } from 'src/users/entities/user.entities';

export class UpdateProfileDto extends createZodDto(
  userSchema.omit({ social: true, id: true }).partial(),
) {}
