import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorator/get-current-user.decorator';
import { CandidateLoginDTO } from './dto/candidate-login.dto';
import { CandidateRegisterDTO } from './dto/candidate-register';
import { passwordDTO } from './dto/verify-dto';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/candidate/register')
  @UseGuards(HmacguardGuard)
  candidateRegister(
    @Query('locale') locale: string,
    @Body() candidate: CandidateRegisterDTO,
  ) {
    return this.authService.candidateRegister(candidate, locale);
  }

  @Get('/candidate/verify')
  @UseGuards(HmacguardGuard)
  candidateVerify(@Query('token') token: string) {
    return this.authService.candidateVerify(token);
  }

  @Post('/candidate/set-password')
  @UseGuards(HmacguardGuard)
  setPasswordCandidate(
    @Body() passwords: passwordDTO,
    @Query('token') token: string,
  ) {
    return this.authService.setPassword(passwords, token);
  }

  @Post('/candidate/login')
  @UseGuards(HmacguardGuard)
  loginCandidate(@Body() loginDto: CandidateLoginDTO) {
    return this.authService.loginCandidate(loginDto);
  }

  @Get('/candidate/refresh-token')
  @UseGuards(RefreshTokenGuard, HmacguardGuard)
  refreshTokens(@GetCurrentUser() user: JwtPayloadWithRt) {
    return this.authService.refreshToken(user.sub, user.refresh_token);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, cookies } = req;
    const tokens = await this.authService.loginWithGoogle(user);
    res.redirect(
      `${process.env.CLIENT_URL_VERIFY}/${cookies.NEXT_LOCALE}/authentication/oauth?access_token=${tokens?.access_token}&refresh_token=${tokens?.refresh_token!}`,
    );
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async faceLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req: any, @Res() res: Response) {
    const { user, cookies } = req;

    const tokens = await this.authService.loginWithFacebook(user);

    res.redirect(
      `${process.env.CLIENT_URL_VERIFY}/${cookies.NEXT_LOCALE}/authentication/oauth?access_token=${tokens?.access_token}&refresh_token=${tokens?.refresh_token!}`,
    );
  }

  @Delete('/candidate/logout')
  @UseGuards(AccessTokenGuard, HmacguardGuard)
  logout(@GetCurrentUser() user: JwtPayload) {
    return this.authService.logout(user.sub);
  }
}
