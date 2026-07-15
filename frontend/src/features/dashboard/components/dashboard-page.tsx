import { HeroSection } from './hero-section';
import { CategoryStrip } from './category-strip';
import { TrendingMarketsSection } from './trending-markets-section';
import { StatsBar } from './stats-bar';
import { Reveal } from '@/components/reveal';

/**
 * Phase 2.4: each section below the hero (which animates itself via
 * an internal stagger) is wrapped in `Reveal`, so it fades/slides in
 * the moment it scrolls into view rather than all being fully visible
 * on initial paint — and, per `Reveal`'s `viewport={{ once: true }}`,
 * each section animates exactly once per visit, never replaying on
 * subsequent scroll up/down.
 */
export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <HeroSection />
      <Reveal>
        <CategoryStrip />
      </Reveal>
      <Reveal delay={0.05}>
        <TrendingMarketsSection />
      </Reveal>
      <Reveal delay={0.1}>
        <StatsBar />
      </Reveal>
    </div>
  );
}
