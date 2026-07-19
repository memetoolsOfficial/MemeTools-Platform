import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../core/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureProfileForUser(user: { id: string; email?: string | null }) {
    const existingProfile = await this.prisma.profile.findUnique({ where: { userId: user.id } });
    if (existingProfile) return existingProfile;

    const email = user.email ?? `${user.id}@memetools.local`;

    return this.prisma.profile.create({
      data: {
        userId: user.id,
        username: await this.nextAvailableUsername(email),
        displayName: this.defaultDisplayName(email),
      },
    });
  }

  async getOwnProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) throw new NotFoundException('Profile not found.');
    return this.toProfilePayload(profile);
  }

  async getPublicProfile(username: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (!profile || !profile.isActive) throw new NotFoundException('Profile not found.');
    return this.toProfilePayload(profile);
  }

  async updateOwnProfile(userId: string, dto: UpdateProfileDto) {
    const username = dto.username?.toLowerCase();

    try {
      const profile = await this.prisma.profile.update({
        where: { userId },
        data: {
          ...(username ? { username } : {}),
          ...(dto.displayName !== undefined ? { displayName: dto.displayName.trim() } : {}),
          ...(dto.bio !== undefined ? { bio: dto.bio.trim() || null } : {}),
          ...(dto.avatarUrl !== undefined ? { avatarUrl: dto.avatarUrl.trim() || null } : {}),
        },
      });

      return this.toProfilePayload(profile);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('That username is already taken.');
      }
      throw error;
    }
  }

  private async nextAvailableUsername(email: string): Promise<string> {
    const base = this.slugifyUsername(email.split('@')[0] || 'user');
    let candidate = base;
    let suffix = 1;

    while (await this.prisma.profile.findUnique({ where: { username: candidate } })) {
      const suffixText = `_${suffix}`;
      candidate = `${base.slice(0, 24 - suffixText.length)}${suffixText}`;
      suffix += 1;
    }

    return candidate;
  }

  private slugifyUsername(value: string): string {
    const username = value
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    return (username || 'user').slice(0, 24).padEnd(3, '0');
  }

  private defaultDisplayName(email: string): string {
    return (
      email
        .split('@')[0]
        ?.replace(/[._-]+/g, ' ')
        .trim() || 'MemeTools User'
    );
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
  }

  private toProfilePayload(profile: {
    username: string;
    displayName: string;
    bio: string | null;
    avatarUrl: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      username: profile.username,
      displayName: profile.displayName,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      isActive: profile.isActive,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  }
}
