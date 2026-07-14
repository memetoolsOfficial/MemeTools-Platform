'use client';

import Link from 'next/link';
import { BrandMark } from './components/brand-mark';
import { SearchBar } from './components/search-bar';
import { MobileNav } from './components/mobile-nav';
import { Button } from '@/components/ui/button';
import { useScrollShadow } from '@/hooks/use-scroll-shadow';
import { cn } from '@/lib/utils';
import type { PrimaryNavLabel } from './nav-items';

const NAV_TABS = [
  { label: 'Markets', href: '/markets' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Activity', href: '/activity' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Leaderboard', href: '/leaderboard' },
] as const;

interface NavbarProps {
  activeTab?: (typeof NAV_TABS)[number]['label'];
  activeNavItem?: PrimaryNavLabel;
}

/**
 * Phase 2.3 adds: a subtle shadow/border-strengthening once the page
 * scrolls beneath the sticky navbar (useScrollShadow), and a mobile
 * search toggle so search remains reachable below `md` (where the
 * desktop SearchBar is hidden).
 */
export function Navbar({ activeTab = 'Markets', activeNavItem = 'Home' }: NavbarProps) {
  const isScrolled = useScrollShadow();

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-20 w-full items-center gap-2 border-b bg-background/95 px-3 backdrop-blur transition-shadow duration-200 sm:gap-4 sm:px-6',
        'relative',
        isScrolled ? 'border-border shadow-lg shadow-black/20' : 'border-transparent',
      )}
    >
      <MobileNav activeItem={activeNavItem} />

      <BrandMark />

      <SearchBar />

      <nav aria-label="Primary" className="ml-2 hidden flex-1 items-center justify-center gap-8 lg:flex">
        {NAV_TABS.map((tab) => {
          const isActive = tab.label === activeTab;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              prefetch={false}
              className={cn(
                'relative rounded py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive && 'text-accent',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
        <Button variant="secondary" size="default" className="hidden sm:inline-flex" asChild>
          <Link href="/login" prefetch={false}>
            Log in
          </Link>
        </Button>
        <Button variant="primary" size="sm" className="sm:hidden" asChild>
          <Link href="/signup" prefetch={false}>
            Sign up
          </Link>
        </Button>
        <Button variant="primary" size="default" className="hidden sm:inline-flex" asChild>
          <Link href="/signup" prefetch={false}>
            Sign up
          </Link>
        </Button>
      </div>
    </header>
  );
}
