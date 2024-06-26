import { Module } from '@nestjs/common';
import { AuthEmployerService } from './auth-employer.service';
import { AuthEmployerController } from './auth-employer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthEmployerController],
  providers: [AuthEmployerService, PrismaService, JwtService, MailService],
})
export class AuthEmployerModule {}
