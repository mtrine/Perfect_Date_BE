import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { JwtAccessTokenGuard } from './guards/jwt-access.guard';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.useGlobalGuards(new JwtAccessTokenGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.use(cookieParser());
  app.setGlobalPrefix('/api/');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
