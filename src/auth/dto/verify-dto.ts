import { IsNotEmpty, IsString } from 'class-validator';

export class passwordDTO {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
