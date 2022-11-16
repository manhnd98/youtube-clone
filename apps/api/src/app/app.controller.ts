import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {Request, Response, RestController} from '@youtube-clone/shared-core';
import {LocalSignupDto} from "@youtube-clone/api/shared-data-access-dtos";

@Controller()
export class AppController extends RestController {
    constructor(private readonly appService: AppService) {
        super();
    }

    @Post('hello')
    getData(@Req() request: Request, @Res() response: Response, @Body() user: LocalSignupDto) {
        return response.success('Helloworld');
    }
}
