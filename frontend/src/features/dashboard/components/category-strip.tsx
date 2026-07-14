'use client';

import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { CategoryPillCard } from './category-pill-card';
import { MOCK_CATEGORIES, FEATURED_CATEGORY_IDS } from '@/features/dashboard/data/mock-categories';

// Computed once at module scope (not on every render) since both
// source arrays are static, module-level constants — a small, genuine
// performance win over recomputing this derived array per render.
const FEATURED_CATEGORIES = FEATURED_CATEGORY_IDS.map((id) =>
  MOCK_CATEGORIES.find((category) => category.id === id),
).filter((category): category is NonNullable<typeof category> => Boolean(category));

export function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollClick = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center gap-3">
      <div
        ref={scrollRef}
        className="scrollbar-none flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth"
      >
        {FEATURED_CATEGORIES.map((category) => (
          <CategoryPillCard key={category.id} category={category} />
        ))}
      </div>
      <button
        type="button"
        onClick={handleScrollClick}
        aria-label="Scroll categories right"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
