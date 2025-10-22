import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('oauth.facebook.clientId'),
      clientSecret: configService.get<string>('oauth.facebook.clientSecret'),
      callbackURL: configService.get<string>('oauth.facebook.callbackUrl') || 'http://localhost:3000/auth/facebook/callback',
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'emails', 'name']
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    return {
      provider: 'facebook',
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName
    };
  }
}
