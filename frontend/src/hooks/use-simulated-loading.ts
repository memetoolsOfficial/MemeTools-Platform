'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `true` for `delayMs` after mount, then `false`. Used only to
 * give the visual-only skeleton components (introduced in Phase 2.1) a
 * real moment on screen, since this phase has no actual asynchronous
 * data fetching (all data is local mock data, per docs/Phase-0.7 —
 * Markets/Leaderboard/Activity/Watchlist API integration arrives in
 * their own later phases). This is a presentation-only timing helper,
 * not a substitute for real loading state, and introduces no network
 * or business logic of any kind.
 */
export function useSimulatedLoading(delayMs = 600): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);

  return isLoading;
}
