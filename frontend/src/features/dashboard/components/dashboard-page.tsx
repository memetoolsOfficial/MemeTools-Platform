import { HeroSection } from './hero-section';
import { CategoryStrip } from './category-strip';
import { TrendingMarketsSection } from './trending-markets-section';
import { StatsBar } from './stats-bar';

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <HeroSection />
      <CategoryStrip />
      <TrendingMarketsSection />
      <StatsBar />
    </div>
  );
}
