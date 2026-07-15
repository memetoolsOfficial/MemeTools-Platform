import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Footer } from './footer';
import { Reveal } from '@/components/reveal';
import type { PrimaryNavLabel } from './nav-items';

interface AppShellProps {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
  activeNavItem?: PrimaryNavLabel;
  activeNavTab?: React.ComponentProps<typeof Navbar>['activeTab'];
}

/**
 * The permanent app shell: persistent navbar + sidebar + footer, present
 * on every page, per docs/Phase-0.2-Project-Folder-Structure.md and
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 4. The right
 * rail is an optional slot — pages without one (e.g. a future focused
 * Market Detail view) simply omit it. Below the `lg` breakpoint, the
 * Sidebar is replaced by the Navbar's MobileNav slide-out drawer, per
 * Phase 0.4 Section 8 (Responsive Design Rules).
 *
 * Includes a "skip to main content" link and semantic landmarks
 * (nav/main/aside/footer), added in Phase 2.2's accessibility pass.
 *
 * Phase 2.4: `main` now has `tabIndex={-1}` so activating the skip
 * link actually moves keyboard focus there (not just scroll position),
 * and `scroll-mt-20` so it lands below the sticky navbar instead of
 * partially hidden beneath it — "proper anchor behavior, no jump."
 */
export function AppShell({ children, rightRail, activeNavItem, activeNavTab }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <Navbar activeTab={activeNavTab} activeNavItem={activeNavItem} />

      <div className="mx-auto flex w-full max-w-[1800px] flex-1 gap-6 px-4 py-6 sm:px-6">
        <Sidebar activeItem={activeNavItem} />

        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 scroll-mt-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {children}
        </main>

        {rightRail && (
          <aside
            aria-label="Highlights"
            className="hidden w-80 shrink-0 flex-col gap-6 xl:flex"
          >
            {rightRail}
          </aside>
        )}
      </div>

      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
}
