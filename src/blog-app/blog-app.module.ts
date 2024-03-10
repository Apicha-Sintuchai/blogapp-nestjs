/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlogAppController } from './blog-app.controller';
import { BlogAppService } from './blog-app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogAppSchema, BlogSchema } from 'src/Schema/BlogSchema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Auth, AuthSchema } from 'src/Schema/AuthSchema';
import { AuthModule } from 'src/auth/auth.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogSchema.name, schema: BlogAppSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: 'Picsave',
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),

    AuthModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'BlogPicture'),
    //   serveRoot: '/Picsave',
    //   serveStaticOptions:{
    //     cacheControl: true,
    //   }
    // })
  ],
  controllers: [BlogAppController],
  providers: [BlogAppService],
})
export class BlogAppModule {}
