'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { AppShell } from '@/app-shell/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/providers/auth-provider';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { getMyProfile, type UserProfile } from '@/services/profile-api';

export default function EditProfilePage() {
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
        <Card className="h-96 max-w-2xl animate-pulse bg-secondary/30" />
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
        <Card className="max-w-xl">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-2xl font-black">Log in to edit your profile</h1>
            <p className="text-sm text-muted-foreground">
              Only the profile owner can update public profile details.
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

  return (
    <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
      <section className="space-y-6" aria-labelledby="edit-profile-heading">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Profile</p>
          <h1
            id="edit-profile-heading"
            className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
          >
            Edit your public profile
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Choose the username and public details other MemeTools users will see.
          </p>
        </div>
        <ProfileForm profile={profile} />
      </section>
    </AppShell>
  );
}
