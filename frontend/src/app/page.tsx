import { AppShell } from '@/app-shell/app-shell';
import { DashboardPage } from '@/features/dashboard/components/dashboard-page';
import { TrendingNowWidget } from '@/features/leaderboard/components/trending-now-widget';
import { RecentActivityWidget } from '@/features/activity-feed/components/recent-activity-widget';
import { WatchlistPreviewWidget } from '@/features/watchlist/components/watchlist-preview-widget';

// The MemeTools homepage — implemented to match
// assets/prototypes/homepage-prototype.png, per
// docs/Phase-0.4-Design-System-and-UI-Standards.md, and completed in
// Phase 2.2 (docs/Phase-2.2-Homepage-Completion.md). All data below is
// local mock data (see feature `data/` folders); there is no API,
// database, or authentication in this phase.

export default function HomePage() {
  return (
    <AppShell
      activeNavItem="Home"
      activeNavTab="Markets"
      rightRail={
        <>
          <TrendingNowWidget />
          <RecentActivityWidget />
          <WatchlistPreviewWidget />
        </>
      }
    >
      <DashboardPage />
    </AppShell>
  );
}
