'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authRequest, AuthUser } from '@/services/auth-api';

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const session = await authRequest<{ user: AuthUser }>('session');
      setUser(session.user);
    } catch {
      try {
        const session = await authRequest<{ user: AuthUser }>('refresh', { method: 'POST' });
        setUser(session.user);
      } catch {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void refreshSession(); }, [refreshSession]);

  const signOut = useCallback(async () => {
    await authRequest<void>('logout', { method: 'POST' });
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, refreshSession, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within an AuthProvider.');
  return value;
}
