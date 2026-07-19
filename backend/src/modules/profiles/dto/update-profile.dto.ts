import { IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

const usernameRule = /^[a-z0-9_]{3,24}$/;

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @Matches(usernameRule, {
    message:
      'Username must be 3-24 characters and use only lowercase letters, numbers, or underscores.',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  displayName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  bio?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(500)
  avatarUrl?: string;
}
