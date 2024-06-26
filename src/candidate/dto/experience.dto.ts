import { IsNotEmpty, IsString } from 'class-validator';

export class ExperienceDTO {
  @IsNotEmpty()
  @IsString()
  job_title: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  job_type: string;

  @IsNotEmpty()
  @IsString()
  job_level: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  to?: string | null;

  description?: string | null;
}

export class UpdateExperienceDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  job_title: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  job_type: string;

  @IsNotEmpty()
  @IsString()
  job_level: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  to?: string | null;

  description?: string | null;
}
