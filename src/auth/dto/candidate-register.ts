import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CandidateRegisterDTO {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
