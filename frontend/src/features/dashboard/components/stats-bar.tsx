'use client';

import Link from 'next/link';
import { BarChart2, Users, Boxes, CheckCircle2, Gift, ChevronRight } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';

const STATS = [
  { label: 'Total Volume', value: '$24.7M+', icon: BarChart2 },
  { label: 'Traders', value: '512K+', icon: Users },
  { label: 'Markets', value: '2,341+', icon: Boxes },
  { label: 'Avg. Accuracy', value: '78.6%', icon: CheckCircle2 },
] as const;

/**
 * Phase 2.4: the platform stat figures now have a loading skeleton
 * (previously always rendered immediately), crossfading in once the
 * simulated load completes. The Rewards Program card is intentionally
 * left out of the loading treatment — it's evergreen promotional
 * chrome, not fetched data, the same judgment already applied to the
 * Hero section.
 */
export function StatsBar() {
  const isLoading = useSimulatedLoading(400);

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
      aria-busy={isLoading}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={isLoading ? 'loading' : 'loaded'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))
            : STATS.map((stat) => (
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
        </m.div>
      </AnimatePresence>

      <Link
        href="/rewards"
        prefetch={false}
        className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary/15 hover:shadow-md hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-accent">
          <Gift className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-accent">Rewards Program</p>
          <p className="text-xs text-muted-foreground">Earn XP &amp; unlock perks</p>
        </div>
        <ChevronRight className="ml-2 h-4 w-4 text-accent" aria-hidden="true" />
      </Link>
    </div>
  );
}
