import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { ActivityItem } from './activity-item';
import { MOCK_ACTIVITY } from '@/features/activity-feed/data/mock-activity';

export function RecentActivityWidget() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <SectionHeader title="Recent Activity" viewAllHref="/activity" />
      </CardHeader>
      <CardContent className="divide-y divide-border pt-2">
        {MOCK_ACTIVITY.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
