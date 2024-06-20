import { createZodDto } from 'nestjs-zod';
import { userSchema } from 'src/users/entities/user.entities';

export class SignUpDto extends createZodDto(userSchema.omit({ id: true })) {}
