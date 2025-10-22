import { Injectable } from '@nestjs/common';
import { EmailLoginDto } from '../dto/email-login.dto';
import { OAuthLoginDto, OAuthProvider } from '../dto/oauth-login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  async loginWithEmail(payload: EmailLoginDto) {
    return this.createTokenResponse(payload.email, ['customer']);
  }

  async loginWithOAuth(payload: OAuthLoginDto) {
    const profileEmail = `${payload.provider}_user@example.com`;
    const roles =
      payload.provider === OAuthProvider.GOOGLE
        ? ['customer']
        : ['customer', 'owner'];
    return this.createTokenResponse(profileEmail, roles);
  }

  async refreshToken({ refreshToken }: RefreshTokenDto) {
    return this.createTokenResponse('existing_user@example.com', ['customer'], refreshToken);
  }

  private createTokenResponse(email: string, roles: string[], refreshToken?: string) {
    return {
      accessToken: `mock-access-token-${Date.now()}`,
      refreshToken: refreshToken ?? `mock-refresh-token-${Date.now()}`,
      expiresIn: 3600,
      user: {
        email,
        roles,
      },
    };
  }
}
