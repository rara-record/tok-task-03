import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { ENV } from 'env';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets('public', {
    prefix: '/file/_media/',
  });

  const config = new DocumentBuilder()
    .setTitle('HTTP Mock Server')
    .setDescription(
      `
      프론트 온보딩을 위한 http mock server
      - openapi-json : http://localhost:${ENV.PORT}/api-json
      `,
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  patchNestJsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = ENV.PORT;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + 'api');
  });
}
bootstrap();
