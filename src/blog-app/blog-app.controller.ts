/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
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

  @Put('increment/:wherepost')
  async increment(@Param('wherepost') wherepost: string) {
    return this.ControllerBlogApp.increaselink(wherepost);
  }
  @Put('decrement/:wherepost')
  async decrement(@Param('wherepost') wherepost: string) {
    return this.ControllerBlogApp.decreaselink(wherepost);
  }

  //------------------------------------------need token to do something--------------------------------------------------------------------------//

  @UseGuards(AuthGuard())
  @Get('Seeusers')
  async getone(@Param('id') id: string, @Request() req: any) {
    return this.ControllerBlogApp.findoneuser(req.user.id);
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  @Post('Users')
  async getuserblog(
    @Request() id: any,
    @Body() req: any,
    @UploadedFile() file: any,
  ) {
    const iduser = id.user.id;
    const passall = {
      iduser,
      req,
      file,
    };

    return this.ControllerBlogApp.letnamelater(passall);
  }
  //------------------------------------------------------------------------------------------------------------------------//
}
