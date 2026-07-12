import { Skeleton } from '@/components/ui/skeleton';

/**
 * Not rendered on the homepage by default in this phase (all market data
 * is local mock data, so there is nothing to actually load), but shipped
 * as ready-to-use scaffolding for Phase 6 (Markets), when real API calls
 * are introduced per docs/Phase-0.6-API-Specification-and-Backend-Contracts.md.
 */
export function MarketRowSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border px-2 py-4 last:border-b-0 sm:px-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="min-w-0 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="hidden space-y-2 sm:block">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-3 w-8" />
      </div>
      <Skeleton className="hidden h-9 w-32 md:block" />
      <Skeleton className="h-9 w-9 rounded-lg" />
    </div>
  );
}
