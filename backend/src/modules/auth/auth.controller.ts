import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Session } from '@supabase/supabase-js';
import { ProfilesService } from '../profiles/profiles.service';
import { AuthService } from './auth.service';
import { CredentialsDto, PasswordResetDto, PasswordResetRequestDto } from './dto/auth.dto';

const ACCESS_COOKIE = 'memetools_access_token';
const REFRESH_COOKIE = 'memetools_refresh_token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profilesService: ProfilesService,
    private readonly config: ConfigService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() credentials: CredentialsDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.assertSameOrigin(request);
    const result = await this.authService.signUp(credentials.email, credentials.password);
    if (result.data.user) await this.profilesService.ensureProfileForUser(result.data.user);
    if (result.data.session) this.setSessionCookies(response, result.data.session);
    return {
      user: this.userPayload(result.data.user),
      requiresEmailConfirmation: !result.data.session,
    };
  }

  @Post('login')
  async login(
    @Body() credentials: CredentialsDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.assertSameOrigin(request);
    const result = await this.authService.signIn(credentials.email, credentials.password);
    this.setSessionCookies(response, result.data.session!);
    return { user: this.userPayload(result.data.user) };
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): void {
    this.assertSameOrigin(request);
    this.clearSessionCookies(response);
  }

  @Post('refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    this.assertSameOrigin(request);
    const refreshToken = this.cookies(request)[REFRESH_COOKIE];
    if (!refreshToken)
      throw new UnauthorizedException('Your session has expired. Please log in again.');
    const session = await this.authService.refreshSession(refreshToken);
    this.setSessionCookies(response, session);
    return { user: this.userPayload(session.user) };
  }

  @Get('session')
  async session(@Req() request: Request) {
    const accessToken = this.cookies(request)[ACCESS_COOKIE];
    if (!accessToken) throw new UnauthorizedException('No active session.');
    const user = await this.authService.validateAccessToken(accessToken);
    return { user: this.userPayload(user) };
  }

  @Post('forgot-password')
  @HttpCode(204)
  async forgotPassword(
    @Body() body: PasswordResetRequestDto,
    @Req() request: Request,
  ): Promise<void> {
    this.assertSameOrigin(request);
    const frontendUrl = this.config.getOrThrow<string>('FRONTEND_URL');
    await this.authService.requestPasswordReset(body.email, `${frontendUrl}/auth/reset-password`);
  }

  @Post('reset-password')
  @HttpCode(204)
  async resetPassword(@Body() body: PasswordResetDto, @Req() request: Request): Promise<void> {
    this.assertSameOrigin(request);
    const accessToken = request.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!accessToken)
      throw new UnauthorizedException('The password reset link is invalid or expired.');
    await this.authService.resetPassword(accessToken, body.password);
  }

  private setSessionCookies(response: Response, session: Session): void {
    const secure = this.config.get<string>('NODE_ENV') === 'production';
    const options = { httpOnly: true, secure, sameSite: 'lax' as const, path: '/' };
    response.cookie(ACCESS_COOKIE, session.access_token, {
      ...options,
      maxAge: session.expires_in * 1000,
    });
    response.cookie(REFRESH_COOKIE, session.refresh_token, {
      ...options,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  private clearSessionCookies(response: Response): void {
    response.clearCookie(ACCESS_COOKIE, { httpOnly: true, path: '/' });
    response.clearCookie(REFRESH_COOKIE, { httpOnly: true, path: '/' });
  }

  private cookies(request: Request): Record<string, string> {
    return Object.fromEntries(
      (request.headers.cookie ?? '')
        .split('; ')
        .filter(Boolean)
        .map((item) => {
          const [key, ...value] = item.split('=');
          return [key, decodeURIComponent(value.join('='))];
        }),
    );
  }

  private assertSameOrigin(request: Request): void {
    const origin = request.headers.origin;
    if (origin && origin !== this.config.getOrThrow<string>('FRONTEND_URL')) {
      throw new UnauthorizedException('Invalid request origin.');
    }
  }

  private userPayload(user: { id: string; email?: string } | null) {
    return user ? { id: user.id, email: user.email ?? null } : null;
  }
}
