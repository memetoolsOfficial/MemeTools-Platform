import { memo } from 'react';
import Link from 'next/link';
import { IconBadge } from '@/components/icon-badge';
import { formatCount } from '@/lib/format';
import type { CategoryMock } from '@/features/dashboard/data/mock-categories';

interface CategoryPillCardProps {
  category: CategoryMock;
}

/** Memoized in Phase 2.3 — renders inside a static, unchanging list. */
function CategoryPillCardComponent({ category }: CategoryPillCardProps) {
  return (
    <Link
      href={`/markets?category=${category.id}`}
      prefetch={false}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

export const CategoryPillCard = memo(CategoryPillCardComponent);
