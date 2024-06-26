import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyDTO {
  @IsString()
  @IsNotEmpty()
  candidate_id: string;

  @IsString()
  @IsNotEmpty()
  job_id: string;
}
