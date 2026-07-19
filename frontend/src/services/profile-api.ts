export type UserProfile = {
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileInput = {
  username?: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function profileRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiUrl}/profiles/${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new Error(message ?? 'Something went wrong. Please try again.');
  }

  return response.json() as Promise<T>;
}

export function getMyProfile(): Promise<UserProfile> {
  return profileRequest<UserProfile>('me');
}

export function getProfile(username: string): Promise<UserProfile> {
  return profileRequest<UserProfile>(encodeURIComponent(username));
}

export function updateMyProfile(input: UpdateProfileInput): Promise<UserProfile> {
  return profileRequest<UserProfile>('me', {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}
