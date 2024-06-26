import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { GetCandidate } from 'src/auth/decorator/get-candidate.decorator';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { CandidateInfoUpdateDTO } from './dto/candidate-info-update.dto';
import { EducationDTO } from './dto/education.dto';
import { GetCurrentUser } from 'src/auth/decorator/get-current-user.decorator';
import { DesireDTO } from './dto/desire.dto';
import { ChangeEmailDTO } from './dto/change-email.dto';
import { ChangePasswordDTO } from './dto/chang-password.dto';
import { ExperienceDTO, UpdateExperienceDTO } from './dto/experience.dto';
import { CertificationDTO } from './dto/cerification.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get('/get-me')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  getMeCandidate(@GetCurrentUser() user: JwtPayload) {
    return this.candidateService.getMeCandidate(user.sub);
  }

  @Patch('/change-image')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  changeImage(
    @GetCurrentUser() user: JwtPayload,
    @Body('image') image: string,
  ) {
    return this.candidateService.changeImage(user.sub, image);
  }

  @Patch('/update-info-candidate')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  updateInfo(
    @GetCurrentUser() user: JwtPayload,
    @Body() candidate: CandidateInfoUpdateDTO,
  ) {
    return this.candidateService.updateProfile(candidate, user.sub);
  }

  @Patch('/update-education')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  updateEducation(@Body() education: EducationDTO) {
    return this.candidateService.updateEducation(education);
  }

  @Delete('/delete-education/:id')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  deleteEducation(@Param('id') id: string) {
    return this.candidateService.deleteEducation(id);
  }

  @Post('/create-education')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  createEducation(@GetCandidate() id: string, @Body() education: EducationDTO) {
    return this.candidateService.createEducation(education, id);
  }

  @Post('/create-desire')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  createDerise(@GetCandidate() id: string, @Body() desire: DesireDTO) {
    return this.candidateService.createDesire(id, desire);
  }

  @Patch('/update-desire')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  editDesire(@Body() desire: DesireDTO) {
    return this.candidateService.updateDesire(desire);
  }

  @Delete('/delete-desire/:id')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  deleteDesire(@Param('id') id: string, @GetCandidate() candidate_id: string) {
    return this.candidateService.deleteDesire(id, candidate_id);
  }

  @Patch('/update-language')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  updateLanguage(@GetCandidate() id: string, @Body() languages: string[]) {
    return this.candidateService.updateLanguage(id, languages);
  }

  @Patch('/change-email')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  changeEmail(@Body() payload: ChangeEmailDTO) {
    return this.candidateService.changeEmail(payload);
  }

  @Patch('/change-password')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  changePassword(
    @GetCurrentUser() user: JwtPayload,
    @Body() payload: ChangePasswordDTO,
  ) {
    return this.candidateService.changePassword(user.sub, payload);
  }

  @Post('/create-experience')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  createExperience(@GetCandidate() id: string, @Body() payload: ExperienceDTO) {
    return this.candidateService.createExperience(payload, id);
  }

  @Patch('/update-experience')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  updateExperience(@Body() payload: UpdateExperienceDTO) {
    return this.candidateService.updateExperience(payload);
  }

  @Delete('/delete-experience/:id')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  deleteExperience(@Param('id') id: string) {
    return this.candidateService.deleteExperience(id);
  }

  @Patch('/add-skill')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  addSkill(
    @GetCandidate() id: string,
    @Body('skill') skill: string,
    @Body('type') type: 'add' | 'remove',
  ) {
    return this.candidateService.addSkill(id, skill, type);
  }

  @Post('/create-certificate')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  createCertificate(
    @GetCandidate() id: string,
    @Body() payload: CertificationDTO,
  ) {
    return this.candidateService.createCertificate(id, payload);
  }

  @Patch('/update-certificate')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  updateCertificate(@Body() payload: CertificationDTO) {
    return this.candidateService.updateCertificate(payload);
  }

  @Delete('/delete-certificate/:id')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  deleteCertificate(@Param('id') id: string) {
    return this.candidateService.deleteCertificate(id);
  }
}
