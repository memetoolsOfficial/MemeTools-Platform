import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconBadge } from '@/components/icon-badge';
import type { ActivityItemMock } from '@/features/activity-feed/data/mock-activity';

interface ActivityItemProps {
  item: ActivityItemMock;
}

const ACTION_COLOR: Record<NonNullable<ActivityItemMock['actionVariant']>, string> = {
  positive: 'text-positive',
  negative: 'text-negative',
  neutral: 'text-muted-foreground',
};

export function ActivityItem({ item }: ActivityItemProps) {
  const actionColor = ACTION_COLOR[item.actionVariant ?? 'neutral'];

  return (
    <li>
      <Link
        href="/markets"
        prefetch={false}
        className="-mx-1 flex items-start gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <IconBadge glyph={item.glyph} bgClassName={item.bgClassName} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-foreground">
            <span className="font-semibold">{item.actorLabel}</span>{' '}
            <span className={cn('font-medium', actionColor)}>{item.actionLabel}</span>
          </p>
          <p className="truncate text-xs text-muted-foreground">{item.marketTitle}</p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{item.relativeTime}</span>
      </Link>
    </li>
  );
}
