import {LocalSigninDto, LocalSignupDto} from "@youtube-clone/api/shared-data-access-dtos";

export interface IAuthService {

  // create account by username and password
  // TODO: add more user information like firstname, lastname, dob, etc.
  // TODO: create other login type like Google SSO
  signupLocal(dto: LocalSignupDto);

  // login by username and password
  signinLocal(dto: LocalSigninDto);

  logout();

  refreshTokens();

}