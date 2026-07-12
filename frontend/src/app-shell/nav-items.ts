import { Home, BarChart3, Trophy, Activity, Briefcase, ListOrdered, Star } from 'lucide-react';

export const PRIMARY_NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Markets', href: '/markets', icon: BarChart3 },
  { label: 'Rankings', href: '/rankings', icon: Trophy },
  { label: 'Activity', href: '/activity', icon: Activity },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { label: 'Leaderboard', href: '/leaderboard', icon: ListOrdered },
  { label: 'Watchlist', href: '/watchlist', icon: Star },
] as const;

export type PrimaryNavLabel = (typeof PRIMARY_NAV_ITEMS)[number]['label'];
