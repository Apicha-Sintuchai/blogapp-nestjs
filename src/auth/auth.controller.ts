import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthControll: AuthService) {}
  @Post('SignUp')
  async SignUp(@Body() req): Promise<any> {
    return await this.AuthControll.SignUp(req);
  }

  @Post('SignIn')
  async SignIn(@Body() req): Promise<any> {
    return await this.AuthControll.login(req);
  }
}
