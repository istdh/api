import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthEmployerService } from './auth-employer.service';
import { RegisterDTO } from './dto/register.dto';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { Request } from 'express';
import { LoginDTO } from './dto/login.dto';
import { RefreshTokenGuard } from 'src/auth/guard/refresh-token.guard';
import { GetCurrentUser } from 'src/auth/decorator/get-current-user.decorator';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { HasRoles } from 'src/auth/decorator/role.decorator';
import { Roles } from 'enum';

@Controller('auth-employer')
export class AuthEmployerController {
  constructor(private readonly authEmployerService: AuthEmployerService) {}

  @Post('/register')
  @UseGuards(HmacguardGuard)
  register(@Body() register: RegisterDTO, @Req() req: Request) {
    return this.authEmployerService.register(
      register,
      req.headers['locale'] as string,
    );
  }

  @Post('/activation-email')
  @UseGuards(HmacguardGuard)
  activeEmployee(@Body('token') token: string) {
    return this.authEmployerService.activeEmployee(token);
  }

  @Post('/login')
  @UseGuards(HmacguardGuard)
  login(@Body() loginDTO: LoginDTO) {
    return this.authEmployerService.login(loginDTO);
  }

  @Get('/refresh-token')
  @UseGuards(HmacguardGuard, RefreshTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  refreshTokens(@GetCurrentUser() user: JwtPayloadWithRt) {
    return this.authEmployerService.refreshToken(user.sub, user.refresh_token);
  }

  @Get('/check-auth')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  checkAuthEmployer(@GetCurrentUser() user: JwtPayload) {
    return this.authEmployerService.checkAuthEmployer(user.sub);
  }
}
