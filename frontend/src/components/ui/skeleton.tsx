import { cn } from '@/lib/utils';

/**
 * Base loading-skeleton primitive. Polished in Phase 2.3 with a shimmer
 * sweep (in addition to the base pulse) for a more production-quality
 * loading feel. Visual-only — no asynchronous data fetching exists yet
 * (all dashboard data is local mock data), so nothing in the shipped
 * homepage actually enters a real network-loading state; the brief
 * on-mount simulated delay (see useSimulatedLoading) is what triggers
 * this component in practice. Composed skeletons (MarketRowSkeleton,
 * ActivityItemSkeleton, TrendingNowItemSkeleton, WatchlistPreviewItemSkeleton)
 * build on this primitive.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-muted',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
        'before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
