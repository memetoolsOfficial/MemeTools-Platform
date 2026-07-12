import Link from 'next/link';
import { BarChart2, Users, Boxes, CheckCircle2, Gift, ChevronRight } from 'lucide-react';

const STATS = [
  { label: 'Total Volume', value: '$24.7M+', icon: BarChart2 },
  { label: 'Traders', value: '512K+', icon: Users },
  { label: 'Markets', value: '2,341+', icon: Boxes },
  { label: 'Avg. Accuracy', value: '78.6%', icon: CheckCircle2 },
] as const;

export function StatsBar() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <stat.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/rewards"
        prefetch={false}
        className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 transition-colors hover:bg-primary/15"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Gift className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-primary">Rewards Program</p>
          <p className="text-xs text-muted-foreground">Earn XP &amp; unlock perks</p>
        </div>
        <ChevronRight className="ml-2 h-4 w-4 text-primary" aria-hidden="true" />
      </Link>
    </div>
  );
}
