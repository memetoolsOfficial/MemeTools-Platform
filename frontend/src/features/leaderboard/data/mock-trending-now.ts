export interface TrendingNowItemMock {
  rank: number;
  glyph: string;
  bgClassName: string;
  title: string;
  categoryName: string;
  percentage: number;
  direction: 'up' | 'down';
  volumeLabel: string;
}

/**
 * Local, static mock data only. This widget previews ranking-style
 * content; the full Leaderboard feature (ranked by user performance) is
 * introduced in Phase 10 per docs/Phase-0.7, backed by the Leaderboard
 * entity in docs/Phase-0.5-Database-Schema-Planning.md. This preview
 * reuses the same numbered-row pattern the full feature will extend.
 */
export const MOCK_TRENDING_NOW: TrendingNowItemMock[] = [
  {
    rank: 1,
    glyph: '🐸',
    bgClassName: 'bg-emerald-500/20',
    title: 'Will PEPE flip SHIB in market cap?',
    categoryName: 'Memecoins',
    percentage: 69,
    direction: 'up',
    volumeLabel: '$2.11M Vol.',
  },
  {
    rank: 2,
    glyph: '₿',
    bgClassName: 'bg-orange-500/20',
    title: 'Will Bitcoin hit $100K in 2024?',
    categoryName: 'Layer 1 & Majors',
    percentage: 64,
    direction: 'up',
    volumeLabel: '$1.98M Vol.',
  },
  {
    rank: 3,
    glyph: '◎',
    bgClassName: 'bg-slate-500/20',
    title: 'Will JUP airdrop in Q2 2024?',
    categoryName: 'Solana Ecosystem',
    percentage: 57,
    direction: 'up',
    volumeLabel: '$1.12M Vol.',
  },
  {
    rank: 4,
    glyph: '🏛️',
    bgClassName: 'bg-yellow-600/20',
    title: 'Will SEC approve a spot ETH ETF?',
    categoryName: 'Crypto Events',
    percentage: 46,
    direction: 'down',
    volumeLabel: '$987K Vol.',
  },
  {
    rank: 5,
    glyph: '🚀',
    bgClassName: 'bg-rose-500/20',
    title: 'Will a pump.fun token reach $10M in 24h?',
    categoryName: 'New Launches',
    percentage: 38,
    direction: 'down',
    volumeLabel: '$845K Vol.',
  },
];
