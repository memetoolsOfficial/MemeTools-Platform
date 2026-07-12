import { Skeleton } from '@/components/ui/skeleton';

export function WatchlistPreviewItemSkeleton() {
  return (
    <li className="flex items-center gap-3 py-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-3.5 w-8" />
      <Skeleton className="h-9 w-9 rounded-lg" />
    </li>
  );
}
