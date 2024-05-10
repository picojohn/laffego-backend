import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiTags('Laffego Status Of Service')
  @Get()
  getHello() {
    return this.appService.getStatus();
  }
}
