import { cn } from '@/lib/utils';
import { IconBadge } from '@/components/icon-badge';
import { formatPercentage } from '@/lib/format';
import type { TrendingNowItemMock } from '@/features/leaderboard/data/mock-trending-now';

interface TrendingNowItemProps {
  item: TrendingNowItemMock;
}

export function TrendingNowItem({ item }: TrendingNowItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="w-4 shrink-0 text-sm font-semibold text-muted-foreground">
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
    </div>
  );
}
