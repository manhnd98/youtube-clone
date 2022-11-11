import {Injectable, Inject} from '@nestjs/common';
import {PrismaService} from '@youtube-clone/api/feature-prisma';
import {IAuthService} from "@youtube-clone/api-interfaces";
import {LocalSignupDto} from "@youtube-clone/api/shared-data-access-dtos";

@Injectable()
export class AuthService implements IAuthService {

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  signupLocal(dto: LocalSignupDto) {
//    this.prismaService.user.create({
//      data: {
//        email: dto.email
//      }
//    })
  }

  signinLocal() {

  }

  logout() {

  }

  refreshTokens() {
  }
}
