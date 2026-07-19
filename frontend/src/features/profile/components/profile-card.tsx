import Link from 'next/link';
import { CalendarDays, Edit3, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserProfile } from '@/services/profile-api';

interface ProfileCardProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
}

export function ProfileCard({ profile, isOwnProfile = false }: ProfileCardProps) {
  const joinedAt = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(
    new Date(profile.createdAt),
  );

  return (
    <Card className="overflow-hidden shadow-2xl shadow-black/20">
      <div className="h-28 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_32rem),linear-gradient(135deg,_rgba(124,58,237,0.24),_rgba(20,184,166,0.14))]" />
      <CardHeader className="-mt-14 flex-row items-end justify-between gap-4 space-y-0">
        <div className="flex items-end gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary shadow-xl shadow-black/30">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-11 w-11 text-muted-foreground" aria-hidden="true" />
            )}
          </div>
          <div className="pb-2">
            <CardTitle className="text-2xl">{profile.displayName}</CardTitle>
            <p className="mt-1 text-sm font-medium text-accent">@{profile.username}</p>
          </div>
        </div>
        {isOwnProfile && (
          <Button variant="secondary" size="sm" asChild>
            <Link href="/profile/edit" prefetch={false}>
              <Edit3 className="h-4 w-4" aria-hidden="true" />
              Edit profile
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          {profile.bio || 'This trader has not added a bio yet.'}
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5">
            <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
            Joined {joinedAt}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
