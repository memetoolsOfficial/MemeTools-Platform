import { cn } from '@/lib/utils';

/**
 * Base loading-skeleton primitive. Visual-only in this phase — no
 * asynchronous data fetching exists yet (all dashboard data is local
 * mock data, per this phase's scope), so nothing in the shipped homepage
 * actually enters a loading state. This primitive, and the composed
 * skeletons built from it (see MarketRowSkeleton, ActivityItemSkeleton,
 * TrendingNowItemSkeleton), exist as ready-to-use scaffolding for the
 * future phases (per docs/Phase-0.7) that introduce real API calls.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
