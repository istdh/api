import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CandidateLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
