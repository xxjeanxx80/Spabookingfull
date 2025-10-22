import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OAuthLoginDto } from './dto/oauth-login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.loginWithCredentials(dto);
    return new ApiResponse(data, 'Login successful');
  }

  @Post('oauth')
  async oauth(@Body() dto: OAuthLoginDto) {
    const data = await this.authService.loginWithOAuth(dto);
    return new ApiResponse(data, 'OAuth login successful');
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {
    return 'redirecting to Google';
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleCallback(@Req() req: any) {
    const data = await this.authService.loginWithOAuth(req.user);
    return new ApiResponse(data, 'Google login successful');
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async facebookAuth() {
    return 'redirecting to Facebook';
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  async facebookCallback(@Req() req: any) {
    const data = await this.authService.loginWithOAuth(req.user);
    return new ApiResponse(data, 'Facebook login successful');
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    const data = await this.authService.refreshToken(dto.userId);
    return new ApiResponse(data, 'Token refreshed');
  }
}
