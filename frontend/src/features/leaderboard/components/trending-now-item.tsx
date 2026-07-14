import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconBadge } from '@/components/icon-badge';
import { formatPercentage } from '@/lib/format';
import type { TrendingNowItemMock } from '@/features/leaderboard/data/mock-trending-now';

interface TrendingNowItemProps {
  item: TrendingNowItemMock;
}

/** Memoized in Phase 2.3 — renders inside a static, unchanging list. */
function TrendingNowItemComponent({ item }: TrendingNowItemProps) {
  return (
    <li>
      <Link
        href="/markets"
        prefetch={false}
        className="-mx-1 flex items-center gap-3 rounded-lg px-1 py-3 transition-colors duration-150 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="sr-only">Rank {item.rank}: </span>
        <span aria-hidden="true" className="w-4 shrink-0 text-sm font-semibold text-muted-foreground">
          {item.rank}
        </span>
        <IconBadge glyph={item.glyph} bgClassName={item.bgClassName} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.categoryName}</p>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={cn(
              'text-sm font-bold',
              item.direction === 'up' ? 'text-positive' : 'text-negative',
            )}
          >
            {formatPercentage(item.percentage)}
          </p>
          <p className="text-xs text-muted-foreground">{item.volumeLabel}</p>
        </div>
      </Link>
    </li>
  );
}

export const TrendingNowItem = memo(TrendingNowItemComponent);
