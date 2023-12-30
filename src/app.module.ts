import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BlogAppModule } from './blog-app/blog-app.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blogApp'),
    BlogAppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
