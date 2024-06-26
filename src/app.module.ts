import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { CandidateModule } from './candidate/candidate.module';
import { AssetModule } from './asset/asset.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthEmployerModule } from './auth-employer/auth-employer.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ApplyModule } from './apply/apply.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CandidateModule,
    AssetModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthEmployerModule,
    CompanyModule,
    JobModule,
    ApplyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
