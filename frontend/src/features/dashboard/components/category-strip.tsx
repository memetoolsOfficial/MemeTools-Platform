import { ChevronRight } from 'lucide-react';
import { CategoryPillCard } from './category-pill-card';
import { MOCK_CATEGORIES, FEATURED_CATEGORY_IDS } from '@/features/dashboard/data/mock-categories';

export function CategoryStrip() {
  const featured = FEATURED_CATEGORY_IDS.map((id) =>
    MOCK_CATEGORIES.find((category) => category.id === id),
  ).filter((category): category is NonNullable<typeof category> => Boolean(category));

  return (
    <div className="relative flex items-center gap-3">
      <div className="scrollbar-none flex flex-1 gap-3 overflow-x-auto">
        {featured.map((category) => (
          <CategoryPillCard key={category.id} category={category} />
        ))}
      </div>
      <button
        type="button"
        aria-label="Scroll categories"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
