import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CandidateInfoUpdateDTO } from './dto/candidate-info-update.dto';
import { ChangeEmailDTO } from './dto/change-email.dto';
import { DesireDTO } from './dto/desire.dto';
import { EducationDTO } from './dto/education.dto';
import { ChangePasswordDTO } from './dto/chang-password.dto';
import { ConfigService } from '@nestjs/config';
import { ExperienceDTO, UpdateExperienceDTO } from './dto/experience.dto';
import { CertificationDTO } from './dto/cerification.dto';

@Injectable()
export class CandidateService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getMeCandidate(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        candidate: {
          include: {
            education: true,
            experience: true,
            desire: true,
            certificate: true,
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    delete user.email_verified;
    delete user.provider_account_id;
    delete user.company_id;
    delete user.school_id;
    delete user.password;
    return user;
  }

  async changeImage(id: string, image: string) {
    if (!image) throw new BadRequestException();

    await this.prisma.user.update({
      where: { id },
      data: { image: `${process.env.IMAGE_URL}${image}` },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async updateProfile(candidate: CandidateInfoUpdateDTO, id: string) {
    await this.prisma.candidate.update({
      where: { user_id: id },
      data: {
        phone_number: candidate.phone_number,
        job_title: candidate.job_title,
        exp_year: candidate.exp_year,
        industry: candidate.industry,
        job_level: candidate.job_level,
        degree: candidate.degree,
        date_of_birth: candidate.date_of_birth,
        gender: candidate.gender,
        nationality: candidate.nationality,
        address: candidate.address,
        province: candidate.province,
        married_status: candidate.married_status,
        country: candidate.country,
        district: candidate.district,
        website: candidate.website,
        linkedin_url: candidate.linkedin_url,
        facebook_url: candidate.facebook_url,
        twitter_url: candidate.twitter_url,
      },
    });

    await this.prisma.user.update({
      where: { id },
      data: {
        full_name: candidate.full_name,
      },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async updateEducation(education: EducationDTO) {
    await this.prisma.education.update({
      where: { id: education.id },
      data: {
        name_education: education.name_education,
        degree: education.degree,
        majors: education.majors,
        graduation_date: education.graduation_date,
        description: education.description,
      },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async createEducation(education: EducationDTO, candidate_id: string) {
    await this.prisma.education.create({
      data: {
        name_education: education.name_education,
        degree: education.degree,
        majors: education.majors,
        graduation_date: education.graduation_date,
        description: education.description,
        candidate_id,
      },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async deleteEducation(id: string) {
    await this.prisma.education.delete({
      where: { id },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async createDesire(id: string, desire: DesireDTO) {
    const newDesire = await this.prisma.desire.create({
      data: {
        level: desire.level,
        currency: desire.currency,
        min_salary: desire.min_salary,
        max_salary: desire.max_salary,
        job_type: desire.job_type,
        industry: desire.industry,
        workplace: desire.workplace,
        benefit: desire.benefit,
      },
    });

    await this.prisma.candidate.update({
      where: { id },
      data: {
        desire_id: newDesire.id,
      },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async updateDesire(desire: DesireDTO) {
    await this.prisma.desire.update({
      data: {
        level: desire.level,
        currency: desire.currency,
        min_salary: desire.min_salary,
        max_salary: desire.max_salary,
        job_type: desire.job_type,
        industry: desire.industry,
        workplace: desire.workplace,
        benefit: desire.benefit,
      },
      where: { id: desire.id },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async deleteDesire(id: string, candidate_id: string) {
    await this.prisma.candidate.update({
      where: { id: candidate_id },
      data: { desire_id: null },
    });

    await this.prisma.desire.delete({
      where: { id },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async updateLanguage(id: string, languages: string[]) {
    await this.prisma.candidate.update({
      where: { id },
      data: { languages },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async changeEmail(payload: ChangeEmailDTO) {
    const { email, password, newEmail } = payload;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('Email not found');

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) throw new BadRequestException('Password wrong');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { email: newEmail },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async changePassword(id: string, payload: ChangePasswordDTO) {
    console.log(payload, id);
    const { old_password, new_password, new_confirm_password } = payload;

    const user = await this.prisma.user.findUnique({ where: { id } });

    const isMatchPassword = await bcrypt.compare(old_password, user.password);
    if (!isMatchPassword) throw new BadRequestException('Password wrong');

    if (new_password !== new_confirm_password)
      throw new BadRequestException('Password not match');

    const hashPassword = await bcrypt.hash(
      new_password,
      Number(this.config.get('HASH_SIZE')),
    );

    await this.prisma.user.update({
      where: { id },
      data: { password: hashPassword },
    });

    return { statusCode: 200, message: 'Success' };
  }

  async createExperience(experience: ExperienceDTO, candidate_id: string) {
    await this.prisma.experience.create({
      data: { ...experience, candidate_id },
    });
    return { statusCode: 201, message: 'Success' };
  }

  async updateExperience(experience: UpdateExperienceDTO) {
    await this.prisma.experience.update({
      data: { ...experience },
      where: { id: experience.id },
    });
    return { statusCode: 200, message: 'Success' };
  }

  async deleteExperience(id: string) {
    await this.prisma.experience.delete({
      where: { id },
    });
    return { statusCode: 200, message: 'Success' };
  }

  async addSkill(candidate_id: string, skill: string, type: 'add' | 'remove') {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidate_id },
    });
    if (type === 'add') {
      if (candidate.skills.includes(skill)) {
        throw new BadRequestException('Skill already');
      }

      await this.prisma.candidate.update({
        where: { id: candidate_id },
        data: { skills: { push: skill } },
      });
      return { statusCode: 200, message: 'Success' };
    }
    if (type === 'remove') {
      const newSkillList = candidate.skills.filter((s) => s !== skill);

      await this.prisma.candidate.update({
        where: { id: candidate_id },
        data: { skills: newSkillList },
      });
      return { statusCode: 200, message: 'Success' };
    }
  }

  async createCertificate(id: string, certificate: CertificationDTO) {
    await this.prisma.certificate.create({
      data: {
        ...certificate,
        candidate_id: id,
      },
    });
    return { statusCode: 201, message: 'Success' };
  }

  async updateCertificate(certificate: CertificationDTO) {
    const { id, name_certificate, issued_by, issued_date, expire_date } =
      certificate;

    await this.prisma.certificate.update({
      data: {
        name_certificate,
        issued_by,
        issued_date,
        expire_date,
      },
      where: { id },
    });
    return { statusCode: 200, message: 'Success' };
  }

  async deleteCertificate(id: string) {
    await this.prisma.certificate.delete({
      where: { id },
    });
    return { statusCode: 200, message: 'Success' };
  }
}
