import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplyDTO } from './apply.dto';

@Injectable()
export class ApplyService {
  constructor(private prisma: PrismaService) {}

  async createApply(payload: ApplyDTO) {
    await this.prisma.application.create({
      data: {
        job_id: payload.job_id,
        candidate_id: payload.candidate_id,
      },
    });

    return { statusCode: 201, message: 'Successfully!' };
  }
}
