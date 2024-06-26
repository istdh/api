import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ContactInfoDTO {
  @IsString()
  @IsNotEmpty()
  name_company: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  company_size: string;

  @IsString()
  @IsNotEmpty()
  code_number: string;

  @IsArray()
  @IsNotEmpty()
  industry: string[];
}
