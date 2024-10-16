import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PresignedUrlModule } from './presigned-url/presigned-url.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    PostsModule,
    AuthModule,
    UsersModule,
    PresignedUrlModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
