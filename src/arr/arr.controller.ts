import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArrService } from './arr.service';

@Controller('arr')
export class ArrController {
  constructor(
    // Inject the ArrService
    private readonly arrService: ArrService,
  ) {}

  @Get()
  async findAll() {
    return await this.arrService.findAll();
  }

  @Post()
  async create(@Body() createSomethinglike: any) {
    console.log(createSomethinglike);
    return await this.arrService.create(createSomethinglike);
  }
}
