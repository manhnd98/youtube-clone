import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiFeaturePrismaModule} from "@youtube-clone/api/feature-prisma";
import {AuthController} from "./auth.controller";

@Module({
  imports: [ApiFeaturePrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class ApiFeatureAuthModule {
}
