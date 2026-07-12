import { Skeleton } from '@/components/ui/skeleton';

export function TrendingNowItemSkeleton() {
  return (
    <li className="flex items-center gap-3 py-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3.5 w-44" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="space-y-2 text-right">
        <Skeleton className="ml-auto h-3.5 w-10" />
        <Skeleton className="ml-auto h-3 w-16" />
      </div>
    </li>
  );
}
