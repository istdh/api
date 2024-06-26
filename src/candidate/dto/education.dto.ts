import { IsNotEmpty, IsString } from 'class-validator';

export class EducationDTO {
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name_education: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  majors: string;

  @IsString()
  @IsNotEmpty()
  graduation_date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;
}
