import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: string, email: string, url: string) {
    await this.mailerService.sendMail({
      from: 'Cổng việc làm <verify@istdh.edu.vn>',
      to: email,

      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Email verification required',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user,
        url,
      },
    });
  }
}
