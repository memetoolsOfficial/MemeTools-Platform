'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { WidgetCard } from '@/components/widget-card';
import { WatchlistPreviewItem } from './watchlist-preview-item';
import { WatchlistPreviewItemSkeleton } from './watchlist-preview-item-skeleton';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { MOCK_WATCHLIST } from '@/features/watchlist/data/mock-watchlist';

export function WatchlistPreviewWidget() {
  const isLoading = useSimulatedLoading(650);

  if (!isLoading && MOCK_WATCHLIST.length === 0) {
    return (
      <WidgetCard title="Watchlist" viewAllHref="/watchlist" isLoading={false}>
        <li className="flex flex-col items-center gap-2 py-6 text-center">
          <Star className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Markets you save will show up here.
          </p>
          <Link
            href="/markets"
            prefetch={false}
            className="text-sm font-medium text-accent hover:underline"
          >
            Browse markets
          </Link>
        </li>
      </WidgetCard>
    );
  }

  return (
    <WidgetCard title="Watchlist" viewAllHref="/watchlist" isLoading={isLoading}>
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => <WatchlistPreviewItemSkeleton key={i} />)
        : MOCK_WATCHLIST.map((item) => <WatchlistPreviewItem key={item.id} item={item} />)}
    </WidgetCard>
  );
}
