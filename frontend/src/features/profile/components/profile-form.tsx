'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { UserProfile } from '@/services/profile-api';
import { updateMyProfile } from '@/services/profile-api';

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(profile.username);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const updated = await updateMyProfile({ username, displayName, bio, avatarUrl });
      router.push(`/users/${updated.username}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update your profile.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card className="max-w-2xl shadow-2xl shadow-black/20">
      <CardHeader>
        <CardTitle>Edit public profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Username
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value.toLowerCase())}
            />
            <span className="block text-xs font-normal text-muted-foreground">
              Use 3-24 lowercase letters, numbers, or underscores. Public URL: /users/
              {username || 'username'}
            </span>
          </label>

          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Display name
            <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={160}
              className="min-h-28 w-full rounded-lg border border-border bg-secondary/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Avatar URL
            <Input
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              placeholder="https://example.com/avatar.png"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save profile'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => router.push('/profile')}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
