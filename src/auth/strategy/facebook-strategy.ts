import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, VerifyCallback } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService,

    config: ConfigService,
  ) {
    super({
      clientID: config.get<string>('FACEBOOK_ID'),
      clientSecret: config.get<string>('FACEBOOK_SECRET_KEY'),
      callbackURL: config.get<string>('FACEBOOK_CALLBACK'),
      profileFields: [
        'id',
        'first_name',
        'last_name',
        'email',
        'picture.type(large)',
        'link',
        'locale',
        'timezone',
        'updated_time',
        'verified',
      ],

      // profileFields: ['id', 'displayName', 'gender', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, profile._json);
  }
}
