import { Res, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  users(@Res() res): string {
    return res.status(200).json([{ userId: 1, username: 'vasia' }]);
  }
}
