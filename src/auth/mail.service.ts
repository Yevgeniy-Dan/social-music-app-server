import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'configuration.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService<Configuration>) {
    const smtpConfig = this.configService.get('smtp');

    this.transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: false,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password,
      },
    } as any);
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: this.configService.get('smtp').user,
      to,
      subject: 'Account activation for' + this.configService.get('apiUrl'),
      text: '',
      html: `
      <div>
        <h1>To activate follow the link</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}
