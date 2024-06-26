import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateTimestampWithOffset } from 'utils/generate-timestamp';
import { CandidateRegisterDTO } from './dto/candidate-register';
import { passwordDTO } from './dto/verify-dto';
import * as bcrypt from 'bcrypt';
import { CandidateLoginDTO } from './dto/candidate-login.dto';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private mail: MailService,
    private jwt: JwtService,
  ) {}

  async candidateRegister(candidate: CandidateRegisterDTO, locale) {
    const existsUser = await this.prisma.user.findUnique({
      where: { email: candidate.email },
    });

    if (existsUser) throw new ConflictException('User already registered');

    const token = await this.jwt.signAsync(candidate, {
      secret: 'locminh',
      expiresIn: '24h',
    });

    const expires = generateTimestampWithOffset(5);

    const verifyExist = await this.prisma.verificationToken.findUnique({
      where: { email: candidate.email },
    });

    if (verifyExist) {
      await this.prisma.verificationToken.update({
        where: { email: candidate.email },
        data: { email: candidate.email, token, expires },
      });
    } else {
      await this.prisma.verificationToken.create({
        data: { email: candidate.email, token, expires },
      });
    }

    const slug = (locale: string) => {
      switch (locale) {
        case 'vi':
          return '/authentication/xac-thuc-email';
        case 'en':
          return '/authentication/verify-email';
        case 'de':
          return '/authentication/e-mail-bestätigen';
      }
    };

    await this.mail.sendUserConfirmation(
      `${candidate.full_name}`,
      candidate.email,
      `${this.config.get<string>('CLIENT_URL_VERIFY')}/${locale}/${slug(locale)}?token=${token}`,
    );

    return { statusCode: 201, message: 'Success!', success: 'Success!' };
  }

  async candidateVerify(token: string) {
    const existsToken = await this.prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!existsToken) throw new ForbiddenException('Token not found');

    console.log(existsToken);
    try {
      await this.jwt.verifyAsync(token, {
        secret: 'locminh',
      });

      return {
        message: 'Token is valid',
        success: 'Token is valid',
        statusCode: 200,
      };
    } catch (error) {
      throw new BadRequestException('Jwt expired or invalid');
    }
  }

  async setPassword(passwords: passwordDTO, token: string) {
    const { password, confirm_password } = passwords;

    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const existsToken = await this.prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!existsToken) throw new ForbiddenException('Token not found');

    const tokenDecoded: JwtTokenVerification = await this.jwt.verifyAsync(
      token,
      {
        secret: 'locminh',
      },
    );
    const { full_name, email, phone_number, type } = tokenDecoded;
    const hash_password = await bcrypt.hash(
      password,
      Number(this.config.get<string>('HASH_SIZE')),
    );

    const user = await this.prisma.user.create({
      data: { email, full_name, password: hash_password, type },
    });
    await this.prisma.candidate.create({
      data: { phone_number, user_id: user.id },
    });

    await this.prisma.verificationToken.delete({ where: { token } });

    return {
      message: 'Success',
      success: 'Success',
      statusCode: 201,
    };
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

  async loginCandidate(loginDto: CandidateLoginDTO) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user.role !== 'CANDIDATE')
      throw new BadRequestException('User not found!');

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

  async loginWithGoogle(user: GoogleUser) {
    const { email, sub, given_name, family_name, picture } = user;

    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userExists) {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          full_name: `${given_name}  ${family_name}`,

          type: 'google',
          provider_account_id: sub,
          image: picture,
        },
      });

      await this.prisma.candidate.create({ data: { user_id: newUser.id } });
      const tokens = await this.getTokens(
        newUser.id,
        newUser.email,
        newUser.role,
      );

      const hash_rf = await bcrypt.hash(
        tokens.refresh_token,
        Number(this.config.get<string>('HASH_SALT')),
      );

      const token = await this.prisma.token.findUnique({
        where: { user_id: newUser.id },
      });

      if (!token) {
        await this.prisma.token.create({
          data: {
            refresh_token: hash_rf,
            user_id: newUser.id,
          },
        });
      } else {
        await this.prisma.token.update({
          where: { user_id: newUser.id },
          data: { refresh_token: hash_rf },
        });
      }

      return tokens;
    } else {
      if (userExists.role !== 'CANDIDATE') {
        throw new ForbiddenException('You are not a candidate');
      }
      const tokens = await this.getTokens(
        userExists.id,
        userExists.email,
        userExists.role,
      );

      const hash_rf = await bcrypt.hash(
        tokens.refresh_token,
        Number(this.config.get<string>('HASH_SALT')),
      );

      const token = await this.prisma.token.findUnique({
        where: { user_id: userExists.id },
      });

      if (!token) {
        await this.prisma.token.create({
          data: {
            refresh_token: hash_rf,
            user_id: userExists.id,
          },
        });
      } else {
        await this.prisma.token.update({
          where: { user_id: userExists.id },
          data: { refresh_token: hash_rf },
        });
      }

      return tokens;
    }
  }

  async loginWithFacebook(user: FacebookUser) {
    const { id, first_name, last_name, email } = user;

    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userExists) {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          full_name: `${first_name} ${last_name}`,
          type: 'facebook',
          provider_account_id: id,
        },
      });

      await this.prisma.candidate.create({ data: { user_id: newUser.id } });
      const tokens = await this.getTokens(
        newUser.id,
        newUser.email,
        newUser.role,
      );

      const hash_rf = await bcrypt.hash(
        tokens.refresh_token,
        Number(this.config.get<string>('HASH_SALT')),
      );

      const token = await this.prisma.token.findUnique({
        where: { user_id: newUser.id },
      });

      if (!token) {
        await this.prisma.token.create({
          data: {
            refresh_token: hash_rf,
            user_id: newUser.id,
          },
        });
      } else {
        await this.prisma.token.update({
          where: { user_id: newUser.id },
          data: { refresh_token: hash_rf },
        });
      }
      return tokens;
    } else {
      if (userExists.role !== 'CANDIDATE') {
        throw new ForbiddenException('You are not a candidate');
      }
      const tokens = await this.getTokens(
        userExists.id,
        userExists.email,
        userExists.role,
      );

      const hash_rf = await bcrypt.hash(
        tokens.refresh_token,
        Number(this.config.get<string>('HASH_SALT')),
      );

      const token = await this.prisma.token.findUnique({
        where: { user_id: userExists.id },
      });

      if (!token) {
        await this.prisma.token.create({
          data: {
            refresh_token: hash_rf,
            user_id: userExists.id,
          },
        });
      } else {
        await this.prisma.token.update({
          where: { user_id: userExists.id },
          data: { refresh_token: hash_rf },
        });
      }
      return tokens;
    }
  }
  async logout(id: string) {
    await this.prisma.token.delete({ where: { user_id: id } });
    return { statusCode: 200, data: 'Logged out' };
  }
}
