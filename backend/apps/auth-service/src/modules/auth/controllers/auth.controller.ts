import { Body, Controller, Post } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { AuthService } from '../services/auth.service';
import { EmailLoginDto } from '../dto/email-login.dto';
import { OAuthLoginDto } from '../dto/oauth-login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: EmailLoginDto) {
    const data = await this.authService.loginWithEmail(payload);
    return createApiResponse(data);
  }

  @Post('oauth/google')
  async google(@Body() payload: Omit<OAuthLoginDto, 'provider'>) {
    const data = await this.authService.loginWithOAuth({ ...payload, provider: 'google' });
    return createApiResponse(data);
  }

  @Post('oauth/facebook')
  async facebook(@Body() payload: Omit<OAuthLoginDto, 'provider'>) {
    const data = await this.authService.loginWithOAuth({ ...payload, provider: 'facebook' });
    return createApiResponse(data);
  }

  @Post('refresh')
  async refresh(@Body() payload: RefreshTokenDto) {
    const data = await this.authService.refreshToken(payload);
    return createApiResponse(data);
  }
}
