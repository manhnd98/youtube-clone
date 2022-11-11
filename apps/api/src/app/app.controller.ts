import {Controller, Get, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Request, Response, RestController} from "@youtube-clone/api/shared-core";

@Controller()
export class AppController extends RestController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get('hello')
  getData(
          @Req() request: Request,
          @Res() response: Response
  ){
    return response.success('Helloworld');
  }
}
