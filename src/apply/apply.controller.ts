import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyDTO } from './apply.dto';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { GetCandidate } from 'src/auth/decorator/get-candidate.decorator';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @UseGuards(HmacguardGuard, AccessTokenGuard)
  @Get('/create:job_id')
  createApply(@GetCandidate() id: string, @Param('job_id') job_id: string) {
    return this.applyService.createApply({
      candidate_id: id,
      job_id: job_id,
    });
  }
}
