import {Module} from '@nestjs/common';
import {AccessTokenStrategy, RefreshTokenStrategy} from "./strategies";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({

     })],
    controllers: [],
    providers: [AccessTokenStrategy, RefreshTokenStrategy],
    exports: [],
})
export class AuthDataAccessAuthModule {}
