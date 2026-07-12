import Link from 'next/link';
import { IconBadge } from '@/components/icon-badge';
import type { CategoryMock } from '@/features/dashboard/data/mock-categories';

interface SidebarCategoryItemProps {
  category: CategoryMock;
}

export function SidebarCategoryItem({ category }: SidebarCategoryItemProps) {
  return (
    <Link
      href={`/markets?category=${category.id}`}
      prefetch={false}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
    >
      <IconBadge glyph={category.glyph} bgClassName={category.bgClassName} size="sm" />
      <span className="flex-1 truncate text-foreground">{category.name}</span>
      {category.status === 'active' ? (
        <span className="text-xs font-medium text-primary">Active</span>
      ) : (
        <span className="text-xs font-medium text-muted-foreground">Soon</span>
      )}
    </Link>
  );
}
