import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MonitorModule} from "@youtube-clone/monitor";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [MonitorModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
