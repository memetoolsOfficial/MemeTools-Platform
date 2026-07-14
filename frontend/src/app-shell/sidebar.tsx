'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { SidebarMascotPromo } from './components/sidebar-mascot-promo';
import { SidebarNavItem } from './components/sidebar-nav-item';
import { SidebarCategoryItem } from './components/sidebar-category-item';
import { SidebarCta } from './components/sidebar-cta';
import { PRIMARY_NAV_ITEMS, type PrimaryNavLabel } from './nav-items';
import { MOCK_CATEGORIES } from '@/features/dashboard/data/mock-categories';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeItem?: PrimaryNavLabel;
}

/**
 * Phase 2.3 adds a collapse toggle (icon-only mode) to the desktop
 * sidebar, refined active-state styling (delegated to
 * SidebarNavItem), and tightened spacing. Collapse state is local to
 * this component — since layout uses normal flex flow (not fixed
 * positioning), the main content area reflows automatically as the
 * sidebar's width changes, with no coordination needed from AppShell.
 */
export function Sidebar({ activeItem = 'Home' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        'relative hidden shrink-0 flex-col gap-6 border-r border-border py-6 transition-[width] duration-200 ease-out lg:flex',
        isCollapsed ? 'w-20 px-2' : 'w-64 px-4',
      )}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isCollapsed}
        className="absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all duration-150 hover:text-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft
          className={cn('h-3.5 w-3.5 transition-transform duration-200', isCollapsed && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {!isCollapsed && <SidebarMascotPromo />}

      <nav aria-label="Primary" className="flex flex-col gap-1">
        {PRIMARY_NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={item.label === activeItem}
            collapsed={isCollapsed}
          />
        ))}
      </nav>

      {!isCollapsed && (
        <nav aria-label="Categories" className="flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          {MOCK_CATEGORIES.map((category) => (
            <SidebarCategoryItem key={category.id} category={category} />
          ))}
          <Link
            href="/markets"
            prefetch={false}
            className="rounded-lg px-3 pt-1 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all categories
          </Link>
        </nav>
      )}

      {!isCollapsed && (
        <div className="mt-auto">
          <SidebarCta />
        </div>
      )}
    </aside>
  );
}
