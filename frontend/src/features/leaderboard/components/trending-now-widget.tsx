'use client';

import { WidgetCard } from '@/components/widget-card';
import { TrendingNowItem } from './trending-now-item';
import { TrendingNowItemSkeleton } from './trending-now-item-skeleton';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { MOCK_TRENDING_NOW } from '@/features/leaderboard/data/mock-trending-now';

export function TrendingNowWidget() {
  const isLoading = useSimulatedLoading(500);

  return (
    <WidgetCard title="Trending Now" viewAllHref="/leaderboard" isLoading={isLoading}>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => <TrendingNowItemSkeleton key={i} />)
        : MOCK_TRENDING_NOW.map((item) => <TrendingNowItem key={item.rank} item={item} />)}
    </WidgetCard>
  );
}
