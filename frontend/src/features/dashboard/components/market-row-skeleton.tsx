import { Skeleton } from '@/components/ui/skeleton';

/**
 * Matches MarketRow's dual desktop/mobile layout. Not rendered on the
 * homepage by default in Phase 2.1/2.2 (Trending Markets data is local
 * mock data with a brief simulated loading window — see
 * useSimulatedLoading), but used during that window and shipped as
 * ready-to-use scaffolding for Phase 6 (Markets), when real API calls
 * are introduced per docs/Phase-0.6-API-Specification-and-Backend-Contracts.md.
 */
export function MarketRowSkeleton() {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <div className="hidden items-center gap-4 px-2 sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto_auto] sm:px-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="ml-auto h-4 w-16" />
          <Skeleton className="ml-auto h-3 w-12" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>

      <div className="flex flex-col gap-3 px-2 sm:hidden">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
