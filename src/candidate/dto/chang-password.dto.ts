import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  old_password: string;
  @IsString()
  @IsNotEmpty()
  new_password: string;
  @IsString()
  @IsNotEmpty()
  new_confirm_password: string;
}
