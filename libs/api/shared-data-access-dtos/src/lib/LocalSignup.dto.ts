import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class LocalSignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}