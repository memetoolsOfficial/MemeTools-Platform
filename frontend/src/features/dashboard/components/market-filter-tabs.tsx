'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MARKET_FILTER_TABS } from '@/features/dashboard/data/mock-markets';

interface MarketFilterTabsProps {
  'aria-controls'?: string;
}

/**
 * Visual-only tab state in this phase — selecting a tab does not filter
 * the mock data shown below it. Real filtering arrives with the Markets
 * API module (docs/Phase-0.6) in Phase 6, per docs/Phase-0.7.
 */
export function MarketFilterTabs({ 'aria-controls': ariaControls }: MarketFilterTabsProps) {
  const [active, setActive] = useState<(typeof MARKET_FILTER_TABS)[number]>('Top');

  return (
    <div role="tablist" aria-label="Filter trending markets" className="flex items-center gap-2">
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
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
