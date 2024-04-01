import { Controller, Get } from '@nestjs/common';

@Controller()
export class appcontroller {
  @Get()
  sayHI() {
    return 'sayhi';
  }
}
