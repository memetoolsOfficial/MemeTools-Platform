import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;

export class CredentialsDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(passwordRule)
  password!: string;
}

export class PasswordResetRequestDto {
  @IsEmail()
  email!: string;
}

export class PasswordResetDto {
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(passwordRule)
  password!: string;
}
