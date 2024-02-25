import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BlogAppModule } from './blog-app/blog-app.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ArrModule } from './arr/arr.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
