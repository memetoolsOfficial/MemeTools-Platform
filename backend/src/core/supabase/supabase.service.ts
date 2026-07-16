import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  readonly client: SupabaseClient;
  private readonly url: string;
  private readonly serviceRoleKey: string;

  constructor(configService: ConfigService) {
    this.url = configService.getOrThrow<string>('SUPABASE_URL');
    this.serviceRoleKey = configService.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');
    this.client = createClient(this.url, this.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async updatePassword(accessToken: string, password: string): Promise<void> {
    const response = await fetch(`${this.url}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        apikey: this.serviceRoleKey,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) throw new Error('Supabase password update failed.');
  }
}
