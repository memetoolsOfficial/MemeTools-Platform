import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@supabase/supabase-js';

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
}
