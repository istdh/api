import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateJobDTO {
  @IsNotEmpty()
  @IsString()
  title_job: string;

  @IsNotEmpty()
  @IsArray()
  industry: string[];

  @IsNotEmpty()
  @IsArray()
  workplace: string[];

  @IsNotEmpty()
  @IsArray()
  gender: string[];

  @IsNotEmpty()
  @IsString()
  age: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  @IsArray()
  languages: string[];

  @IsNotEmpty()
  @IsArray()
  skills: string[];

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  min_salary: number;

  @IsNotEmpty()
  @IsNumber()
  max_salary: number;

  @IsNotEmpty()
  @IsBoolean()
  hidden_salary: boolean;

  @IsNotEmpty()
  @IsString()
  job_type: string;

  @IsNotEmpty()
  @IsString()
  deadline: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  required: string;

  @IsNotEmpty()
  @IsString()
  benefits: string;
}
