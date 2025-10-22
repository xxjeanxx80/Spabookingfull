import { IsEnum, IsString } from 'class-validator';

enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export class OAuthLoginDto {
  @IsEnum(OAuthProvider)
  provider!: OAuthProvider;

  @IsString()
  accessToken!: string;
}

export { OAuthProvider };
