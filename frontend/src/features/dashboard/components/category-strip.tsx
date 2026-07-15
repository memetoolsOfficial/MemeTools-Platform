'use client';

import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { CategoryPillCard } from './category-pill-card';
import { CategoryPillCardSkeleton } from './category-pill-card-skeleton';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { MOCK_CATEGORIES, FEATURED_CATEGORY_IDS } from '@/features/dashboard/data/mock-categories';

// Computed once at module scope (not on every render) since both
// source arrays are static, module-level constants — a small, genuine
// performance win over recomputing this derived array per render.
const FEATURED_CATEGORIES = FEATURED_CATEGORY_IDS.map((id) =>
  MOCK_CATEGORIES.find((category) => category.id === id),
).filter((category): category is NonNullable<typeof category> => Boolean(category));

/**
 * Phase 2.4: now has its own loading skeleton (previously the one
 * homepage data section without one), crossfading in via
 * AnimatePresence once the simulated load completes — no layout
 * shift, since CategoryPillCardSkeleton matches the real card's
 * dimensions exactly.
 */
export function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = useSimulatedLoading(450);

  const handleScrollClick = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center gap-3" aria-busy={isLoading}>
      <div
        ref={scrollRef}
        className="scrollbar-none flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={isLoading ? 'loading' : 'loaded'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex gap-3"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <CategoryPillCardSkeleton key={i} />)
              : FEATURED_CATEGORIES.map((category) => (
                  <CategoryPillCard key={category.id} category={category} />
                ))}
          </m.div>
        </AnimatePresence>
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
