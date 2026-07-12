'use client';

import { WidgetCard } from '@/components/widget-card';
import { ActivityItem } from './activity-item';
import { ActivityItemSkeleton } from './activity-item-skeleton';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { MOCK_ACTIVITY } from '@/features/activity-feed/data/mock-activity';

export function RecentActivityWidget() {
  const isLoading = useSimulatedLoading(700);

  return (
    <WidgetCard title="Recent Activity" viewAllHref="/activity" isLoading={isLoading}>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => <ActivityItemSkeleton key={i} />)
        : MOCK_ACTIVITY.map((item) => <ActivityItem key={item.id} item={item} />)}
    </WidgetCard>
  );
}
