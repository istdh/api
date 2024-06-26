import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { AtStrategy } from './strategy/at-token';
import { RtStrategy } from './strategy/rf-token';
import { GoogleStrategy } from './strategy/google-strategy';
import { FacebookStrategy } from './strategy/facebook-strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        privateKey: fs
          .readFileSync(configService.get<string>('PRIVATE_KEY'), 'utf8')
          .toString(),

        publicKey: fs
          .readFileSync(configService.get<string>('PUBLIC_KEY'), 'utf8')
          .toString(),

        signOptions: {
          expiresIn: configService.get<string>('ACCESS_EXPIRATION'),
          algorithm: 'RS256',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    MailService,
    JwtService,
    AtStrategy,
    RtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
