import { Body, Controller, Get, Patch, Param, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

const ACCESS_COOKIE = 'memetools_access_token';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly authService: AuthService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get('me')
  async me(@Req() request: Request) {
    const user = await this.currentUser(request);
    await this.profilesService.ensureProfileForUser(user);
    return this.profilesService.getOwnProfile(user.id);
  }

  @Get(':username')
  async publicProfile(@Param('username') username: string) {
    return this.profilesService.getPublicProfile(username);
  }

  @Patch('me')
  async updateMe(@Body() dto: UpdateProfileDto, @Req() request: Request) {
    const user = await this.currentUser(request);
    await this.profilesService.ensureProfileForUser(user);
    return this.profilesService.updateOwnProfile(user.id, dto);
  }

  private async currentUser(request: Request) {
    const accessToken = this.cookies(request)[ACCESS_COOKIE];
    if (!accessToken) throw new UnauthorizedException('No active session.');
    return this.authService.validateAccessToken(accessToken);
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
}
