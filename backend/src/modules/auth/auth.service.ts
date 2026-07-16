import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse, Session, User } from '@supabase/supabase-js';

import { SupabaseService } from '../../core/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async validateAccessToken(accessToken: string): Promise<User> {
    const { data, error } = await this.supabaseService.client.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException('A valid Supabase session is required.');
    }

    return data.user;
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    const result = await this.supabaseService.client.auth.signUp({ email, password });
    this.throwIfError(result.error, 'Unable to create your account.');
    return result;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const result = await this.supabaseService.client.auth.signInWithPassword({ email, password });
    if (result.error || !result.data.session) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return result;
  }

  async refreshSession(refreshToken: string): Promise<Session> {
    const result = await this.supabaseService.client.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (result.error || !result.data.session) {
      throw new UnauthorizedException('Your session has expired. Please log in again.');
    }
    return result.data.session;
  }

  async requestPasswordReset(email: string, redirectTo: string): Promise<void> {
    const { error } = await this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    this.throwIfError(error, 'Unable to request a password reset.');
  }

  async resetPassword(accessToken: string, password: string): Promise<void> {
    try {
      await this.supabaseService.updatePassword(accessToken, password);
    } catch {
      throw new BadRequestException(
        'Unable to reset your password. Please request a new reset link.',
      );
    }
  }

  private throwIfError(error: Error | null, message: string): void {
    if (error) {
      throw new BadRequestException(message);
    }
  }
}
