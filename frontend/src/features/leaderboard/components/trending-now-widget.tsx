import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { TrendingNowItem } from './trending-now-item';
import { MOCK_TRENDING_NOW } from '@/features/leaderboard/data/mock-trending-now';

export function TrendingNowWidget() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <SectionHeader title="Trending Now" viewAllHref="/leaderboard" />
      </CardHeader>
      <CardContent className="divide-y divide-border pt-2">
        {MOCK_TRENDING_NOW.map((item) => (
          <TrendingNowItem key={item.rank} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
