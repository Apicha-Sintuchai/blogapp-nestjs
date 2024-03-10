/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication
import { AppModule } from './app.module';

import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Change the type of app to NestExpressApplication
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'BlogPicture'));
  await app.listen(3000);
}
bootstrap();
