import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/auth/constants';

@Module({
  imports: [JwtModule.register({ secret: JWT.SECRET })],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
