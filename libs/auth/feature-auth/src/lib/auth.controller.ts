import {Body, Controller, Inject, Post} from '@nestjs/common';
import {LocalSigninDto, LocalSignupDto} from '@youtube-clone/api/shared-data-access-dtos';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private authService: AuthService) {}

    @Post('/local/signup')
    signupLocal(@Body() dto: LocalSignupDto): Promise<Tokens> {
        return this.authService.signupLocal(dto);
    }

    @Post('/local/signin')
    signinLocal(@Body() dto: LocalSigninDto) {
        this.authService.signinLocal();
    }

    @Post('/logout')
    logout() {
        this.authService.logout();
    }

    @Post('/refresh')
    refreshTokens() {
        this.authService.refreshTokens();
    }
}
