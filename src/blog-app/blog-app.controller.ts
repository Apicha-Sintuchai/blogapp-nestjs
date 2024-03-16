/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  // @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ControllerBlogApp.deleteone(id);
  }
  // @UseGuards(AuthGuard())
  @Get('Seeuser')
  async getall() {
    return this.ControllerBlogApp.seeusermame();
  }
  @UseGuards(AuthGuard())
  @Get('Seeusers/:id')
  async getone(@Param('id') id: string) {

    return this.ControllerBlogApp.findoneuser(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('Users/:id')
  async getuserblog(
    @Param('id') id: any,
    @Body() req: any,
    @UploadedFile() file: any,
  ) {
    const passall = {
      id,
      req,
      file,
    };
    
    return this.ControllerBlogApp.letnamelater(passall);
  }

  @Put('increment/:wherepost')
  async increment(@Param('wherepost') wherepost: string) {
    return this.ControllerBlogApp.increaselink(wherepost);
  }
  @Put('decrement/:wherepost')
  async decrement(@Param('wherepost') wherepost: string) {
    return this.ControllerBlogApp.decreaselink(wherepost);
  }
}
