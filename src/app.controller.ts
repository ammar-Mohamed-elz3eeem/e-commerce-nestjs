import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    try {
      return await this.appService.getHello();
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
