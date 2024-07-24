import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/auth/constants';

@Module({
  imports: [JwtModule.register({ secret: JWT.SECRET })],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
