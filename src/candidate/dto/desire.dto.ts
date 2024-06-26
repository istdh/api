import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DesireDTO {
  id?: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  min_salary: number;

  @IsNumber()
  @IsNotEmpty()
  max_salary: number;

  @IsString()
  @IsNotEmpty()
  job_type: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsArray()
  @IsNotEmpty()
  workplace: string[];

  @IsArray()
  @IsNotEmpty()
  benefit: string[];
}
