export interface WatchlistPreviewItemMock {
  id: string;
  glyph: string;
  bgClassName: string;
  question: string;
  categoryName: string;
  yesPercentage: number;
  direction: 'up' | 'down';
  changeAmount: number;
}

/**
 * Local, static mock data only. This widget previews the Watchlist
 * feature added ahead of schedule in Phase 2.2 (per the project owner's
 * explicit request for a "Watchlist preview" on the homepage) — the
 * full Watchlist feature (saving/removing markets, backed by a real
 * many-to-many relationship) is introduced in Phase 9 per
 * docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md, backed
 * by the Watchlist entity in docs/Phase-0.5-Database-Schema-Planning.md.
 *
 * NOTE: This widget does not appear in
 * assets/prototypes/homepage-prototype.png. It was added because Phase
 * 2.2's instructions explicitly required a "Watchlist preview" section;
 * see docs/Phase-2.2-Homepage-Completion.md, Known Limitations /
 * Disclosed Additions for detail. It reuses the exact same widget,
 * card, and row patterns already established by Trending Now and
 * Recent Activity, rather than introducing any new visual language.
 */
export const MOCK_WATCHLIST: WatchlistPreviewItemMock[] = [
  {
    id: 'floki-2024',
    glyph: '🐕',
    bgClassName: 'bg-amber-500/20',
    question: 'Will FLOKI reach $0.0003 in 2024?',
    categoryName: 'Memecoins',
    yesPercentage: 41,
    direction: 'up',
    changeAmount: 3,
  },
  {
    id: 'sol-etf',
    glyph: '◎',
    bgClassName: 'bg-slate-500/20',
    question: 'Will a spot Solana ETF be approved in 2024?',
    categoryName: 'Solana Ecosystem',
    yesPercentage: 29,
    direction: 'down',
    changeAmount: 4,
  },
  {
    id: 'wif-binance',
    glyph: '🐶',
    bgClassName: 'bg-orange-500/20',
    question: 'Will Binance list $WIF in May 2024?',
    categoryName: 'Memecoins',
    yesPercentage: 73,
    direction: 'up',
    changeAmount: 2,
  },
];
