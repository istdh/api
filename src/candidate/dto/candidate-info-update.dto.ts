import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CandidateInfoUpdateDTO {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  job_title: string;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  job_level: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  married_status: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  website: string;

  @IsString()
  linkedin_url: string;

  @IsString()
  facebook_url: string;

  @IsString()
  twitter_url: string;
}
