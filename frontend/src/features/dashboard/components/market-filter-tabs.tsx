'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MARKET_FILTER_TABS } from '@/features/dashboard/data/mock-markets';

interface MarketFilterTabsProps {
  'aria-controls'?: string;
}

/**
 * Visual-only tab state in this phase — selecting a tab does not filter
 * the mock data shown below it. Real filtering arrives with the Markets
 * API module (docs/Phase-0.6) in Phase 6, per docs/Phase-0.7.
 *
 * Phase 2.4: the active-tab fill is now a single shared element
 * (`layoutId`) that smoothly slides/resizes between tabs on selection,
 * instead of an abrupt background swap — the same visual end state as
 * before (a solid violet pill on the active tab), just animated
 * between positions.
 */
export function MarketFilterTabs({ 'aria-controls': ariaControls }: MarketFilterTabsProps) {
  const [active, setActive] = useState<(typeof MARKET_FILTER_TABS)[number]>('Top');

  return (
    <div
      role="tablist"
      aria-label="Filter trending markets"
      className="scrollbar-none flex min-w-0 items-center gap-2 overflow-x-auto"
    >
      {MARKET_FILTER_TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={ariaControls}
            onClick={() => setActive(tab)}
            className={cn(
              'relative shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              !isActive &&
                'border border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            {isActive && (
              <m.span
                layoutId="filter-tab-indicator"
                className="absolute inset-0 rounded-lg bg-primary"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className={cn('relative z-10', isActive && 'text-primary-foreground')}>
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
