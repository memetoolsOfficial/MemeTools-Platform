import { formatCents } from '@/lib/format';

interface MarketPricePillsProps {
  yesCents: number;
  noCents: number;
}

/**
 * The Yes/No price pill pair shown on every market row. Green/red are
 * reserved exclusively for this Yes/No semantic across the entire
 * product, per docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 2.
 */
export function MarketPricePills({ yesCents, noCents }: MarketPricePillsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-lg bg-positive/15 px-3 py-1.5 text-sm font-semibold text-positive">
        Yes {formatCents(yesCents)}
      </span>
      <span className="rounded-lg bg-negative/15 px-3 py-1.5 text-sm font-semibold text-negative">
        No {formatCents(noCents)}
      </span>
    </div>
  );
}
