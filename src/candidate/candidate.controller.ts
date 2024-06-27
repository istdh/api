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
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  getMeCandidate(@GetCurrentUser() user: JwtPayload) {
    return this.candidateService.getMeCandidate(user.sub);
  }

  @Patch('/change-image')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  changeImage(
    @GetCurrentUser() user: JwtPayload,
    @Body('image') image: string,
  ) {
    return this.candidateService.changeImage(user.sub, image);
  }

  @Patch('/update-info-candidate')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  updateInfo(
    @GetCurrentUser() user: JwtPayload,
    @Body() candidate: CandidateInfoUpdateDTO,
  ) {
    return this.candidateService.updateProfile(candidate, user.sub);
  }

  @Patch('/update-education')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  updateEducation(@Body() education: EducationDTO) {
    return this.candidateService.updateEducation(education);
  }

  @Delete('/delete-education/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  deleteEducation(@Param('id') id: string) {
    return this.candidateService.deleteEducation(id);
  }

  @Post('/create-education')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  createEducation(@GetCandidate() id: string, @Body() education: EducationDTO) {
    return this.candidateService.createEducation(education, id);
  }

  @Post('/create-desire')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  createDerise(@GetCandidate() id: string, @Body() desire: DesireDTO) {
    return this.candidateService.createDesire(id, desire);
  }

  @Patch('/update-desire')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  editDesire(@Body() desire: DesireDTO) {
    return this.candidateService.updateDesire(desire);
  }

  @Delete('/delete-desire/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  deleteDesire(@Param('id') id: string, @GetCandidate() candidate_id: string) {
    return this.candidateService.deleteDesire(id, candidate_id);
  }

  @Patch('/update-language')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  updateLanguage(@GetCandidate() id: string, @Body() languages: string[]) {
    return this.candidateService.updateLanguage(id, languages);
  }

  @Patch('/change-email')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  changeEmail(@Body() payload: ChangeEmailDTO) {
    return this.candidateService.changeEmail(payload);
  }

  @Patch('/change-password')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  changePassword(
    @GetCurrentUser() user: JwtPayload,
    @Body() payload: ChangePasswordDTO,
  ) {
    return this.candidateService.changePassword(user.sub, payload);
  }

  @Post('/create-experience')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  createExperience(@GetCandidate() id: string, @Body() payload: ExperienceDTO) {
    return this.candidateService.createExperience(payload, id);
  }

  @Patch('/update-experience')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  updateExperience(@Body() payload: UpdateExperienceDTO) {
    return this.candidateService.updateExperience(payload);
  }

  @Delete('/delete-experience/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  deleteExperience(@Param('id') id: string) {
    return this.candidateService.deleteExperience(id);
  }

  @Patch('/add-skill')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  addSkill(
    @GetCandidate() id: string,
    @Body('skill') skill: string,
    @Body('type') type: 'add' | 'remove',
  ) {
    return this.candidateService.addSkill(id, skill, type);
  }

  @Post('/create-certificate')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  createCertificate(
    @GetCandidate() id: string,
    @Body() payload: CertificationDTO,
  ) {
    return this.candidateService.createCertificate(id, payload);
  }

  @Patch('/update-certificate')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  updateCertificate(@Body() payload: CertificationDTO) {
    return this.candidateService.updateCertificate(payload);
  }

  @Delete('/delete-certificate/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  deleteCertificate(@Param('id') id: string) {
    return this.candidateService.deleteCertificate(id);
  }

  @Patch('/update-resume')
  @UseGuards(HmacguardGuard, AccessTokenGuard)
  updateResume(@GetCandidate() id: string, @Body('resume') resume: string) {
    return this.candidateService.updateResume(id, resume);
  }
}
