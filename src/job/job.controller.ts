import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO } from './dto/create-job.dto';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { HasRoles } from 'src/auth/decorator/role.decorator';
import { Roles } from 'enum';
import { GetCompany } from 'src/auth/decorator/get-company.decorator';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @Get('create-many')
  // createMany() {
  //   return this.jobService.createMany();
  // }

  @Post(':company_id')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  createJob(
    @Body() createJobDTO: CreateJobDTO,
    @Param('company_id') company_id: string,
  ) {
    return this.jobService.createJob(createJobDTO, company_id);
  }

  @Patch(':id')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  updateJob(@Body() createJobDTO: CreateJobDTO, @Param('id') id: string) {
    console.log(id);
    return this.jobService.updateJob(createJobDTO, id);
  }

  @Get('get-by-company')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  getJobsByCompany(
    @GetCompany() company_id: string,
    @Query('page') page: string,
  ) {
    return this.jobService.getJobsByCompany(company_id, page);
  }

  @Get(`/hot-jobs`)
  @UseGuards(HmacguardGuard)
  getHotJobs() {
    return this.jobService.getHotJobs();
  }

  @Get('/international')
  @UseGuards(HmacguardGuard)
  getInternationalJobs(@Query('workplace') workplace: string) {
    return this.jobService.getInternationalJobs(workplace);
  }

  @Get(`/detail/:slug`)
  @UseGuards(HmacguardGuard)
  getJobDetail(@Param('slug') slug: string) {
    return this.jobService.getJobDetail(slug);
  }

  @Get('/all')
  @UseGuards(HmacguardGuard)
  getJobs(@Query('page') page: string) {
    return this.jobService.getJobs(page);
  }
}
