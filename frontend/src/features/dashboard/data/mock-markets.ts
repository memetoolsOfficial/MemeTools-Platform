export interface MarketMock {
  id: string;
  glyph: string;
  bgClassName: string;
  question: string;
  categoryName: string;
  volumeLabel: string;
  volumeSubLabel: string;
  yesPercentage: number;
  changeDirection: 'up' | 'down';
  changeAmount: number;
  yesCents: number;
  noCents: number;
}

/**
 * Local, static mock data only. Real Market and Market Option records are
 * introduced in Phase 6 (Markets) per
 * docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md, backed by
 * the entities defined in docs/Phase-0.5-Database-Schema-Planning.md.
 */
export const MOCK_TRENDING_MARKETS: MarketMock[] = [
  {
    id: 'doge-2024',
    glyph: '🐕',
    bgClassName: 'bg-amber-500/20',
    question: 'Will DOGE reach $1.00 in 2024?',
    categoryName: 'Memecoins',
    volumeLabel: '$3.21M',
    volumeSubLabel: '124K vol.',
    yesPercentage: 68,
    changeDirection: 'up',
    changeAmount: 8,
    yesCents: 68,
    noCents: 32,
  },
  {
    id: 'btc-100k',
    glyph: '₿',
    bgClassName: 'bg-orange-500/20',
    question: 'Will Bitcoin hit $100K in 2024?',
    categoryName: 'Layer 1 & Majors',
    volumeLabel: '$2.88M',
    volumeSubLabel: '98K vol.',
    yesPercentage: 64,
    changeDirection: 'up',
    changeAmount: 6,
    yesCents: 64,
    noCents: 36,
  },
  {
    id: 'jup-airdrop-q2',
    glyph: '◎',
    bgClassName: 'bg-slate-500/20',
    question: 'Will JUP airdrop in Q2 2024?',
    categoryName: 'Solana Ecosystem',
    volumeLabel: '$1.74M',
    volumeSubLabel: '67K vol.',
    yesPercentage: 57,
    changeDirection: 'up',
    changeAmount: 4,
    yesCents: 57,
    noCents: 43,
  },
  {
    id: 'sec-eth-etf',
    glyph: '🏛️',
    bgClassName: 'bg-yellow-600/20',
    question: 'Will SEC approve a spot ETH ETF?',
    categoryName: 'Crypto Events',
    volumeLabel: '$987K',
    volumeSubLabel: '45K vol.',
    yesPercentage: 46,
    changeDirection: 'down',
    changeAmount: 5,
    yesCents: 46,
    noCents: 54,
  },
  {
    id: 'pumpfun-10m',
    glyph: '🚀',
    bgClassName: 'bg-rose-500/20',
    question: 'Will a pump.fun token reach $10M in 24h?',
    categoryName: 'New Launches',
    volumeLabel: '$845K',
    volumeSubLabel: '32K vol.',
    yesPercentage: 38,
    changeDirection: 'down',
    changeAmount: 7,
    yesCents: 38,
    noCents: 62,
  },
  {
    id: 'eth-ath',
    glyph: 'Ξ',
    bgClassName: 'bg-indigo-500/20',
    question: 'Will ETH hit a new all-time high in 2024?',
    categoryName: 'Layer 1 & Majors',
    volumeLabel: '$754K',
    volumeSubLabel: '21K vol.',
    yesPercentage: 55,
    changeDirection: 'up',
    changeAmount: 5,
    yesCents: 55,
    noCents: 45,
  },
];

export const MARKET_FILTER_TABS = ['Top', 'New', 'Memecoins', 'Solana', 'Events'] as const;
