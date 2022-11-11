import {Controller, Get} from '@nestjs/common';

@Controller('tenant')
export class AppController {


  @Get('hello')
  getData(): string {
    return 'helloworld';
  }

}
