import { IconBadge } from '@/components/icon-badge';
import { PercentageIndicator } from '@/components/percentage-indicator';
import { MarketPricePills } from '@/components/market-price-pills';
import { WatchlistButton } from '@/components/watchlist-button';
import type { MarketMock } from '@/features/dashboard/data/mock-markets';

interface MarketRowProps {
  market: MarketMock;
}

export function MarketRow({ market }: MarketRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border px-2 py-4 last:border-b-0 sm:px-4">
      <IconBadge glyph={market.glyph} bgClassName={market.bgClassName} size="md" />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground sm:text-base">
          {market.question}
        </p>
        <p className="text-xs text-muted-foreground">{market.categoryName}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold text-foreground">{market.volumeLabel}</p>
        <p className="text-xs text-muted-foreground">{market.volumeSubLabel}</p>
      </div>

      <PercentageIndicator
        value={market.yesPercentage}
        changeDirection={market.changeDirection}
        changeAmount={market.changeAmount}
        align="right"
      />

      <div className="hidden md:block">
        <MarketPricePills yesCents={market.yesCents} noCents={market.noCents} />
      </div>

      <WatchlistButton marketTitle={market.question} />
    </div>
  );
}
