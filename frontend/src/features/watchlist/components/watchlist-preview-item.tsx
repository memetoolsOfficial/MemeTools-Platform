import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconBadge } from '@/components/icon-badge';
import { formatPercentage } from '@/lib/format';
import { WatchlistButton } from '@/components/watchlist-button';
import type { WatchlistPreviewItemMock } from '@/features/watchlist/data/mock-watchlist';

interface WatchlistPreviewItemProps {
  item: WatchlistPreviewItemMock;
}

export function WatchlistPreviewItem({ item }: WatchlistPreviewItemProps) {
  return (
    <li className="flex items-center gap-3 py-3">
      <Link
        href="/markets"
        prefetch={false}
        className="-mx-1 flex min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-0.5 transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <IconBadge glyph={item.glyph} bgClassName={item.bgClassName} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{item.question}</p>
          <p className="text-xs text-muted-foreground">{item.categoryName}</p>
        </div>
        <p
          className={cn(
            'shrink-0 text-sm font-bold',
            item.direction === 'up' ? 'text-positive' : 'text-negative',
          )}
        >
          {formatPercentage(item.yesPercentage)}
        </p>
      </Link>
      <WatchlistButton marketTitle={item.question} defaultSaved className="shrink-0" />
    </li>
  );
}
