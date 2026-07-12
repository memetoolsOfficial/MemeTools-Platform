export interface CategoryMock {
  id: string;
  name: string;
  glyph: string;
  bgClassName: string;
  marketCount: number;
  status: 'active' | 'soon';
}

/**
 * Local, static mock data only. Real Category records are introduced in
 * Phase 5 (Categories) per docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md,
 * backed by the Categories entity defined in docs/Phase-0.5-Database-Schema-Planning.md.
 */
export const MOCK_CATEGORIES: CategoryMock[] = [
  {
    id: 'memecoins',
    name: 'Memecoins',
    glyph: '🐸',
    bgClassName: 'bg-emerald-500/20',
    marketCount: 12400,
    status: 'active',
  },
  {
    id: 'layer-1-majors',
    name: 'Layer 1 & Majors',
    glyph: 'Ξ',
    bgClassName: 'bg-blue-500/20',
    marketCount: 8700,
    status: 'active',
  },
  {
    id: 'solana-ecosystem',
    name: 'Solana Ecosystem',
    glyph: '◎',
    bgClassName: 'bg-teal-500/20',
    marketCount: 6300,
    status: 'active',
  },
  {
    id: 'crypto-events',
    name: 'Crypto Events',
    glyph: '🎉',
    bgClassName: 'bg-violet-500/20',
    marketCount: 4200,
    status: 'active',
  },
  {
    id: 'new-launches',
    name: 'New Launches',
    glyph: '🚀',
    bgClassName: 'bg-orange-500/20',
    marketCount: 0,
    status: 'soon',
  },
  {
    id: 'ai-agents',
    name: 'AI & Agents',
    glyph: '🤖',
    bgClassName: 'bg-slate-500/20',
    marketCount: 0,
    status: 'soon',
  },
  {
    id: 'ethereum-l2s',
    name: 'Ethereum & L2s',
    glyph: 'Ξ',
    bgClassName: 'bg-indigo-500/20',
    marketCount: 0,
    status: 'soon',
  },
  {
    id: 'bnb-chain-ecosystem',
    name: 'BNB Chain Ecosystem',
    glyph: '🟡',
    bgClassName: 'bg-yellow-500/20',
    marketCount: 0,
    status: 'soon',
  },
  {
    id: 'defi-tokens',
    name: 'DeFi Tokens',
    glyph: '💠',
    bgClassName: 'bg-cyan-500/20',
    marketCount: 0,
    status: 'soon',
  },
  {
    id: 'gamefi-metaverse',
    name: 'GameFi / Metaverse',
    glyph: '🎮',
    bgClassName: 'bg-pink-500/20',
    marketCount: 0,
    status: 'soon',
  },
];

/** The subset shown in the homepage's horizontal category strip. */
export const FEATURED_CATEGORY_IDS = [
  'memecoins',
  'layer-1-majors',
  'solana-ecosystem',
  'crypto-events',
  'new-launches',
  'ai-agents',
];
