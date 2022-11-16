import {Injectable, Inject} from '@nestjs/common';
import {PrismaService} from '@youtube-clone/api/feature-prisma';
import {LocalSignupDto} from '@youtube-clone/api/shared-data-access-dtos';
import {IAuthService} from '@youtube-clone/shared-interface';
import {hash} from 'bcrypt';
import {AuthConfig, authConfig} from '@youtube-clone/api/utils-config';
import {Tokens} from './types';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(PrismaService) private prismaService: PrismaService,
        @Inject(authConfig) private config: AuthConfig,
        @Inject(JwtService) private jwtService: JwtService,
    ) {}

    async signupLocal(dto: LocalSignupDto): Promise<Tokens> {
        const hash = await this.hashPassword(dto.password);
        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                password: hash,
            },
        });

        return this.getTokens(user.id, user.email);
    }

    signinLocal() {}

    logout() {}

    refreshTokens() {}

    private hashPassword(password: string): Promise<string> {
        return hash(password, this.config.jwtSalt);
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const accessToken = this.jwtService.signAsync(
            {
                sub: userId,
                email,
            },
            {
                expiresIn: this.config.jwtAccessTokenExpired,
                secret: this.config.jwtAccessTokenSecret,
            },
        );

        const refreshToken = this.jwtService.signAsync(
            {
                sub: userId,
                email,
            },
            {
                secret: this.config.jwtRefreshTokenSecret,
                expiresIn: this.config.jwtRefreshTokenExpired,
            },
        );

        const [at, rt] = await Promise.all([accessToken, refreshToken]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }
}
