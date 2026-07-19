import { AppShell } from '@/app-shell/app-shell';
import { Reveal } from '@/components/reveal';
import type { UserProfile } from '@/services/profile-api';
import { ProfileCard } from './profile-card';

interface ProfilePageProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
}

export function ProfilePage({ profile, isOwnProfile = false }: ProfilePageProps) {
  return (
    <AppShell activeNavItem="Leaderboard" activeNavTab="Leaderboard">
      <Reveal>
        <section className="space-y-6" aria-labelledby="profile-heading">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Profile</p>
            <h1
              id="profile-heading"
              className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
            >
              {isOwnProfile ? 'Your public profile' : `${profile.displayName}'s profile`}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Public identity for MemeTools activity, rankings, and future prediction history.
            </p>
          </div>
          <ProfileCard profile={profile} isOwnProfile={isOwnProfile} />
        </section>
      </Reveal>
    </AppShell>
  );
}
