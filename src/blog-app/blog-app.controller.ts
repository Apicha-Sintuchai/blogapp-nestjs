/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogAppService } from './blog-app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog-app')
export class BlogAppController {
  constructor(private readonly ControllerBlogApp: BlogAppService) {}
  @UseGuards(AuthGuard())
  @Get()
  async findAll() {
    return await this.ControllerBlogApp.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() req: any, @UploadedFile() file: any) {
    const passAll = {
      req,
      file,
    };
    return await this.ControllerBlogApp.create(passAll);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ControllerBlogApp.deleteone(id);
  }

  @Patch(':id/nestis/:id')
  async DOnecomment(@Param('id') id: string, @Body() req) {
    return this.ControllerBlogApp.putonenest(id, req);
  }
  @Patch('Dcomment/:id/nest/:nestid')
  async Dcomment(@Param('id') postid: string, @Param('nestid') nestid: string) {
    console.log(postid);
    console.log(nestid);
    return this.ControllerBlogApp.deleteNest(postid, nestid);
  }

  @Patch('Pcommnet/:id')
  async postcomment(@Param('id') id: string, @Body() req) {
    return this.ControllerBlogApp.postcomment(id, req);
  }

  @Get('Seeuser')
  async getall() {
    return this.ControllerBlogApp.seeusermame();
  }

  @Get('Seeuser/:id')
  async getone(@Param('id') id: string) {
    console.log(id);
    return this.ControllerBlogApp.findoneuser(id);
  }
  @UseInterceptors(FileInterceptor('file'))
  @Post('pushuserblog/:id')
  async postuser(
    @Param('id') id: string,
    @Body() req,
    @UploadedFile() file: any,
  ) {
    const passAll = {
      id,
      req,
      file,
    };
    return this.ControllerBlogApp.pushuserblog(passAll);
  }
  @UseGuards(AuthGuard())
  @Patch('User/:userid/whereBlogId/:blogid')
  async putuserblog(
    @Param('userid') userid: string,
    @Param('blogid') blogid: string,
  ) {
    return this.ControllerBlogApp.deleteuserblog(userid, blogid);
  }
}
