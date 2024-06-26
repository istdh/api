import { IsNotEmpty, IsString } from 'class-validator';

export class CertificationDTO {
  id?: string;

  @IsString()
  @IsNotEmpty()
  name_certificate: string;

  @IsString()
  @IsNotEmpty()
  issued_by: string;

  @IsString()
  @IsNotEmpty()
  issued_date: string;
  expire_date?: string;
}
