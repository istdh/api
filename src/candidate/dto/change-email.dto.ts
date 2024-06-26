import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
