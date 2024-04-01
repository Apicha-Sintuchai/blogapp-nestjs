/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BlogAppModule } from './blog-app/blog-app.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ArrModule } from './arr/arr.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { appcontroller } from './app.controller';
@Module({
  imports: [
    BlogAppModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    ArrModule,

    ServeStaticModule.forRoot({
      serveRoot: '/Picsave',
      rootPath: join(__dirname, '..', 'Picsave'),
    })
  ],
  controllers: [
    appcontroller
  ],
  providers: [],
})
export class AppModule {}
