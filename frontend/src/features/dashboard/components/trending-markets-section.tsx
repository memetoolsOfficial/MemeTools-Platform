'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MarketFilterTabs } from './market-filter-tabs';
import { MarketRow } from './market-row';
import { MarketRowSkeleton } from './market-row-skeleton';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { MOCK_TRENDING_MARKETS } from '@/features/dashboard/data/mock-markets';

export function TrendingMarketsSection() {
  const isLoading = useSimulatedLoading(550);

  return (
    <Card className="p-5 sm:p-6" aria-busy={isLoading}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-lg font-bold text-foreground">Trending Markets</h2>
          <MarketFilterTabs aria-controls="trending-markets-list" />
        </div>
        <Link href="/markets" prefetch={false} className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>

      <div className="mt-4 hidden grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid sm:px-4">
        <span className="opacity-0" aria-hidden="true">
          icon
        </span>
        <span>Market</span>
        <span className="text-right">Volume</span>
        <span>Yes %</span>
        <span aria-hidden="true" />
        <ChevronRight className="h-4 w-4 justify-self-end" aria-hidden="true" />
      </div>

      <div id="trending-markets-list">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <MarketRowSkeleton key={i} />)
          : MOCK_TRENDING_MARKETS.map((market) => <MarketRow key={market.id} market={market} />)}
      </div>

      <div className="mt-2 flex justify-center">
        <Link
          href="/markets"
          prefetch={false}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all trending markets
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
