import { Skeleton } from '@/components/ui/skeleton';

/**
 * Matches CategoryPillCard's exact border, padding, and icon size so
 * there is no layout shift when the skeleton is replaced by real
 * content — same rounded-xl border card, same h-10 w-10 icon slot,
 * same two-line text block.
 */
export function CategoryPillCardSkeleton() {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
