'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconBadge } from '@/components/icon-badge';
import { PercentageIndicator } from '@/components/percentage-indicator';
import { MarketPricePills } from '@/components/market-price-pills';
import { WatchlistButton } from '@/components/watchlist-button';
import type { MarketMock } from '@/features/dashboard/data/mock-markets';

interface MarketRowProps {
  market: MarketMock;
}

/**
 * The platform's standard market row. Uses two layouts controlled by
 * breakpoint (not hidden columns) so that every field — icon, question,
 * category, volume, percentage, Yes/No pills, watchlist star — remains
 * visible at every viewport size, per
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 8.
 *
 * Phase 2.3 makes the row genuinely clickable (a stretched Link
 * covering the row, pointing to a future Market Detail route) with a
 * subtle hover lift + soft shadow (via framer-motion). The Watchlist
 * button is deliberately kept as a sibling of the stretched Link
 * (with `relative z-10`), not a descendant of it — nesting a real
 * <button> inside an <a> is invalid HTML and breaks keyboard/screen
 * reader semantics. The component is memoized since it renders inside
 * a static, unchanging list.
 */
function MarketRowComponent({ market }: MarketRowProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="relative rounded-xl border-b border-border py-4 transition-shadow duration-150 last:border-b-0 hover:border-b-transparent hover:bg-secondary/40 hover:shadow-md hover:shadow-black/20"
    >
      <Link
        href={`/markets/${market.id}`}
        prefetch={false}
        aria-label={`View market: ${market.question}`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      {/* Desktop / tablet: single-row grid, per the approved prototype */}
      <div className="relative z-[1] hidden items-center gap-4 px-2 sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto_auto] sm:px-4">
        <IconBadge glyph={market.glyph} bgClassName={market.bgClassName} size="md" />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground sm:text-base">
            {market.question}
          </p>
          <p className="text-xs text-muted-foreground">{market.categoryName}</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">{market.volumeLabel}</p>
          <p className="text-xs text-muted-foreground">{market.volumeSubLabel}</p>
        </div>

        <PercentageIndicator
          value={market.yesPercentage}
          changeDirection={market.changeDirection}
          changeAmount={market.changeAmount}
          align="right"
        />

        <MarketPricePills yesCents={market.yesCents} noCents={market.noCents} />

        <WatchlistButton marketTitle={market.question} className="relative z-10" />
      </div>

      {/* Mobile: stacked card — same information, restacked rather than hidden */}
      <div className="relative z-[1] flex flex-col gap-3 px-2 sm:hidden">
        <div className="flex items-start gap-3">
          <IconBadge glyph={market.glyph} bgClassName={market.bgClassName} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{market.question}</p>
            <p className="text-xs text-muted-foreground">{market.categoryName}</p>
          </div>
          <WatchlistButton marketTitle={market.question} className="relative z-10" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{market.volumeLabel}</p>
            <p className="text-xs text-muted-foreground">{market.volumeSubLabel}</p>
          </div>
          <PercentageIndicator
            value={market.yesPercentage}
            changeDirection={market.changeDirection}
            changeAmount={market.changeAmount}
            align="right"
          />
        </div>

        <MarketPricePills yesCents={market.yesCents} noCents={market.noCents} />
      </div>
    </motion.div>
  );
}

export const MarketRow = memo(MarketRowComponent);
