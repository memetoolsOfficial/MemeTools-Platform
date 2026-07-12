import Link from 'next/link';
import { IconBadge } from '@/components/icon-badge';
import { formatCount } from '@/lib/format';
import type { CategoryMock } from '@/features/dashboard/data/mock-categories';

interface CategoryPillCardProps {
  category: CategoryMock;
}

export function CategoryPillCard({ category }: CategoryPillCardProps) {
  return (
    <Link
      href={`/markets?category=${category.id}`}
      prefetch={false}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-secondary"
    >
      <IconBadge glyph={category.glyph} bgClassName={category.bgClassName} size="md" />
      <div className="whitespace-nowrap">
        <p className="text-sm font-semibold text-foreground">{category.name}</p>
        <p className="text-xs text-muted-foreground">
          {category.status === 'active' ? `${formatCount(category.marketCount)} Markets` : 'Coming Soon'}
        </p>
      </div>
    </Link>
  );
}
