import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { GetCandidate } from 'src/auth/decorator/get-candidate.decorator';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { ApplyService } from './apply.service';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @UseGuards(HmacguardGuard, AccessTokenGuard)
  @Post('/create/:job_id')
  createApply(@GetCandidate() id: string, @Param('job_id') job_id: string) {
    return this.applyService.createApply({
      candidate_id: id,
      job_id: job_id,
    });
  }
}
