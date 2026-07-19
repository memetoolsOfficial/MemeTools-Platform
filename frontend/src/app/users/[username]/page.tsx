'use client';

import { useEffect, useState } from 'react';

import { AppShell } from '@/app-shell/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { ProfilePage } from '@/features/profile/components/profile-page';
import { getProfile, type UserProfile } from '@/services/profile-api';

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile(params.username)
      .then(setProfile)
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load profile.'));
  }, [params.username]);

  if (!profile && !error) {
    return (
      <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
        <Card className="h-72 animate-pulse bg-secondary/30" />
      </AppShell>
    );
  }

  if (error || !profile) {
    return (
      <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
        <Card className="max-w-xl">
          <CardContent className="p-6 text-sm text-destructive">
            {error ?? 'Profile not found.'}
          </CardContent>
        </Card>
      </AppShell>
    );
  }

  return <ProfilePage profile={profile} />;
}
