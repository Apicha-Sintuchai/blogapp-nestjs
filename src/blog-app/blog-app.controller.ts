import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogAppService } from './blog-app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog-app')
export class BlogAppController {
  constructor(private readonly ControllerBlogApp: BlogAppService) {}

  @Get()
  async findAll() {
    return await this.ControllerBlogApp.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() req, @UploadedFile() file) {
    return await this.ControllerBlogApp.create(req, file);
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
}
