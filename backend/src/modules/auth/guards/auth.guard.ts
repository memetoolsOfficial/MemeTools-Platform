import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { AuthenticatedRequest } from '../types/authenticated-request.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & AuthenticatedRequest>();
    const accessToken = this.getBearerToken(request.headers.authorization);

    request.user = await this.authService.validateAccessToken(accessToken);
    return true;
  }

  private getBearerToken(authorization: string | undefined): string {
    if (!authorization) {
      throw new UnauthorizedException('A bearer token is required.');
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('The authorization header must use the Bearer scheme.');
    }

    return token;
  }
}
