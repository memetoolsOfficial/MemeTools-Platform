import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import type { PrimaryNavLabel } from './nav-items';

interface AppShellProps {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
  activeNavItem?: PrimaryNavLabel;
  activeNavTab?: React.ComponentProps<typeof Navbar>['activeTab'];
}

/**
 * The permanent app shell: persistent navbar + sidebar, present on every
 * page, per docs/Phase-0.2-Project-Folder-Structure.md and
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 4. The right
 * rail is an optional slot — pages without one (e.g. a future focused
 * Market Detail view) simply omit it. Below the `lg` breakpoint, the
 * Sidebar is replaced by the Navbar's MobileNav slide-out drawer, per
 * Phase 0.4 Section 8 (Responsive Design Rules).
 */
export function AppShell({ children, rightRail, activeNavItem, activeNavTab }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar activeTab={activeNavTab} activeNavItem={activeNavItem} />
      <div className="mx-auto flex w-full max-w-[1800px] flex-1 gap-6 px-4 py-6 sm:px-6">
        <Sidebar activeItem={activeNavItem} />
        <main className="min-w-0 flex-1">{children}</main>
        {rightRail && (
          <aside className="hidden w-80 shrink-0 flex-col gap-6 xl:flex">{rightRail}</aside>
        )}
      </div>
    </div>
  );
}
