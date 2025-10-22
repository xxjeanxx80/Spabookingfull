import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthGatewayService {
  getOAuthProviders() {
    return {
      providers: [
        {
          name: 'google',
          authorizationUrl: '/auth/oauth/google',
          scopes: ['profile', 'email'],
        },
        {
          name: 'facebook',
          authorizationUrl: '/auth/oauth/facebook',
          scopes: ['public_profile', 'email'],
        },
      ],
    };
  }
}
