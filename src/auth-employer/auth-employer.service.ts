import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { encrypt, decrypt } from 'secure-encrypt';
import { VerificationToken } from '@prisma/client';
import { LoginDTO } from './dto/login.dto';
import * as fs from 'fs';

@Injectable()
export class AuthEmployerService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  async validateToken(token: string) {
    try {
      const decoded = await this.jwt.verify(token, { secret: 'locminh' });
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return { statusCode: 401, message: 'Token expired' };
        // throw new UnauthorizedException('Token has expired');
      }
      // throw new UnauthorizedException('Invalid token');
      return { statusCode: 401, message: 'Invalid token' };
    }
  }

  async hashString(text: string) {
    const hash = await bcrypt.hash(
      text,
      Number(this.config.get<string>('HASH_SIZE')),
    );

    return hash;
  }

  async getTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      role: role,
    };
    const ac_private_key = fs
      .readFileSync(this.config.get<string>('PRIVATE_KEY'), 'utf8')
      .toString();

    const rt_private_key = fs
      .readFileSync(this.config.get<string>('RF_PRIVATE_KEY'), 'utf8')
      .toString();

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(jwtPayload, {
        secret: ac_private_key,
        algorithm: 'RS256',
        expiresIn: this.config.get('ACCESS_EXPIRATION'),
      }),

      this.jwt.signAsync(jwtPayload, {
        secret: rt_private_key,
        algorithm: 'RS256',
        expiresIn: this.config.get('REFRESH_EXPIRATION'),
      }),
    ]);

    return {
      refresh_token: rt,
      access_token: at,
    };
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash: string = await bcrypt.hash(
      rt,
      Number(this.config.get<string>('HASH_SALT')),
    );

    await this.prisma.token.update({
      where: {
        user_id: userId,
      },
      data: {
        refresh_token: hash,
      },
    });
  }

  async register(register: RegisterDTO, locale: string) {
    const {
      full_name,
      email,
      password,
      confirm_password,
      name,
      industry,
      company_size,
      phone,
      code_number,
    } = register;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new ConflictException('User already registered');
    }

    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashPassword = await this.hashString(password);

    const token = await this.jwt.sign(
      {
        full_name,
        email,
        hashPassword,
        name,
        industry,
        company_size,
        phone,
        code_number,
      },
      {
        secret: 'locminh',
        expiresIn: '24h',
      },
    );

    const hashToken = encrypt(token, 'locminh');

    const url = `${this.config.get('CLIENT_URL_EMPLOYEE')}/${locale}/auth/verification-email?token=${hashToken}`;

    await this.mail.sendUserConfirmation(full_name, email, url);

    return {
      statusCode: 201,
      message: 'Created successfully!',
    };
  }
  async activeEmployee(token: string) {
    try {
      const decrypted = decrypt(token, 'locminh');

      const verifyToken: PayloadVerification =
        await this.validateToken(decrypted);

      if (verifyToken.statusCode === 401) {
        return verifyToken;
      } else {
        const {
          full_name,
          email,
          hashPassword,
          name,
          industry,
          company_size,
          phone,
          code_number,
        } = verifyToken;

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (user) {
          throw new ConflictException('User already registered');
        } else {
          const company = await this.prisma.company.create({
            data: {
              name_company: name,
              industry,
              company_size,
              phone: `${code_number}.${phone}`,
            },
          });

          await this.prisma.user.create({
            data: {
              full_name,
              email,
              password: hashPassword,
              role: 'EMPLOYER',
              type: 'email',
              company_id: company.id,
            },
          });

          return { statusCode: 201, message: 'Success' };
        }
      }
    } catch (error) {
      return { statusCode: 500, message: 'System error' };
    }
  }

  async login(payload: LoginDTO) {
    const { email, password } = payload;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new BadRequestException('User not found!');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new BadRequestException('Wrong password!');

    const tokens = await this.getTokens(user.id, user.email, user.role);

    const hash_rf = await bcrypt.hash(
      tokens.refresh_token,
      Number(this.config.get<string>('HASH_SALT')),
    );

    const token = await this.prisma.token.findUnique({
      where: { user_id: user.id },
    });

    if (!token) {
      await this.prisma.token.create({
        data: {
          refresh_token: hash_rf,
          user_id: user.id,
        },
      });
    } else {
      await this.prisma.token.update({
        where: { user_id: user.id },
        data: { refresh_token: hash_rf },
      });
    }

    return tokens;
  }

  async refreshToken(id: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        token: true,
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user || !user.token.refresh_token) {
      throw new ForbiddenException('The refresh token not found');
    }
    const token = rt.split(' ');
    const rtMatches = await bcrypt.compare(token[1], user.token.refresh_token);

    if (!rtMatches) {
      throw new ForbiddenException('The refresh token invalid');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);

    await this.updateRtHash(user.id, tokens.refresh_token);
    // this.setCookies(res, access_token, refresh_token);

    return tokens;
  }

  async checkAuthEmployer(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    delete user.password;
    delete user.school_id;
    return user;
  }
}
