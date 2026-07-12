export interface ActivityItemMock {
  id: string;
  glyph: string;
  bgClassName: string;
  actorLabel: string;
  actionLabel: string;
  actionVariant?: 'positive' | 'negative' | 'neutral';
  marketTitle: string;
  relativeTime: string;
}

/**
 * Local, static mock data only. Real Activity Feed entries are introduced
 * in Phase 13 per docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md,
 * backed by the Activity Feed entity in docs/Phase-0.5-Database-Schema-Planning.md.
 */
export const MOCK_ACTIVITY: ActivityItemMock[] = [
  {
    id: 'activity-1',
    glyph: '🐸',
    bgClassName: 'bg-emerald-500/20',
    actorLabel: '0xAbc...deF',
    actionLabel: 'created',
    actionVariant: 'neutral',
    marketTitle: 'Will FLOKI reach $0.0003 in 2024?',
    relativeTime: '2m ago',
  },
  {
    id: 'activity-2',
    glyph: '🦊',
    bgClassName: 'bg-orange-500/20',
    actorLabel: '0x123...8a9',
    actionLabel: 'traded Yes 68¢',
    actionVariant: 'positive',
    marketTitle: 'Will DOGE reach $1.00 in 2024?',
    relativeTime: '3m ago',
  },
  {
    id: 'activity-3',
    glyph: '🚀',
    bgClassName: 'bg-rose-500/20',
    actorLabel: '0xB45...f7e',
    actionLabel: 'traded No 32¢',
    actionVariant: 'negative',
    marketTitle: 'Will ETH hit a new all-time high in 2024?',
    relativeTime: '5m ago',
  },
  {
    id: 'activity-4',
    glyph: '🧔',
    bgClassName: 'bg-red-500/20',
    actorLabel: '0x98d...7c1',
    actionLabel: 'created',
    actionVariant: 'neutral',
    marketTitle: 'Will Binance list $WIF in May 2024?',
    relativeTime: '7m ago',
  },
  {
    id: 'activity-5',
    glyph: '🐸',
    bgClassName: 'bg-emerald-500/20',
    actorLabel: '0x7aa...91b',
    actionLabel: 'traded Yes 55¢',
    actionVariant: 'positive',
    marketTitle: 'Will PEPE flip SHIB in market cap?',
    relativeTime: '8m ago',
  },
];
