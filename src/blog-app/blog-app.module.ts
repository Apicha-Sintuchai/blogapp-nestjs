import { Module } from '@nestjs/common';
import { BlogAppController } from './blog-app.controller';
import { BlogAppService } from './blog-app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogAppSchema, BlogSchema } from 'src/Schema/BlogSchema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogSchema.name, schema: BlogAppSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: 'BlogPicture',
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [BlogAppController],
  providers: [BlogAppService],
})
export class BlogAppModule {}
