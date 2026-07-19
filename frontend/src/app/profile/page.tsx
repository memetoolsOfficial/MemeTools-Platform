'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { AppShell } from '@/app-shell/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/providers/auth-provider';
import { ProfilePage } from '@/features/profile/components/profile-page';
import { getMyProfile, type UserProfile } from '@/services/profile-api';

export default function MyProfilePage() {
  const { user, isLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getMyProfile()
      .then(setProfile)
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load profile.'));
  }, [user]);

  if (isLoading || (user && !profile && !error)) {
    return (
      <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
        <Card className="h-72 animate-pulse bg-secondary/30" />
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
        <Card className="max-w-xl">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-2xl font-black">Log in to view your profile</h1>
            <p className="text-sm text-muted-foreground">
              Your profile is connected to your MemeTools account.
            </p>
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </CardContent>
        </Card>
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

  return <ProfilePage profile={profile} isOwnProfile />;
}
