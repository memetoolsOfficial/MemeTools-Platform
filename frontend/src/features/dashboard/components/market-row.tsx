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
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 8: "Market
 * rows restructure into a more vertically stacked card format on
 * narrow screens while preserving the same information... and the
 * same color semantics." (Phase 2.1's version hid the Volume column
 * and price pills below `sm`/`md` instead of restacking them — this
 * revision corrects that.)
 */
export function MarketRow({ market }: MarketRowProps) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      {/* Desktop / tablet: single-row grid, per the approved prototype */}
      <div className="hidden items-center gap-4 px-2 sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto_auto] sm:px-4">
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

        <WatchlistButton marketTitle={market.question} />
      </div>

      {/* Mobile: stacked card — same information, restacked rather than hidden */}
      <div className="flex flex-col gap-3 px-2 sm:hidden">
        <div className="flex items-start gap-3">
          <IconBadge glyph={market.glyph} bgClassName={market.bgClassName} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{market.question}</p>
            <p className="text-xs text-muted-foreground">{market.categoryName}</p>
          </div>
          <WatchlistButton marketTitle={market.question} />
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
    </div>
  );
}
