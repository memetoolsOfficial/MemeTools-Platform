'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { SidebarNavItem } from './sidebar-nav-item';
import { SidebarCategoryItem } from './sidebar-category-item';
import { SidebarCta } from './sidebar-cta';
import { PRIMARY_NAV_ITEMS, type PrimaryNavLabel } from '../nav-items';
import { MOCK_CATEGORIES } from '@/features/dashboard/data/mock-categories';

interface MobileNavProps {
  activeItem?: PrimaryNavLabel;
}

/**
 * The mobile/tablet equivalent of the persistent desktop Sidebar, per
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 8 (Mobile):
 * "The left sidebar collapses into a mobile-appropriate navigation
 * pattern (e.g. a bottom navigation bar or a slide-out menu) while
 * preserving the same navigation items, icons, and active-state
 * treatment." Reuses the exact same nav-item and category-item
 * components as the desktop sidebar — no new visual pattern introduced.
 */
export function MobileNav({ activeItem = 'Home' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative flex h-full w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto border-r border-border bg-background px-4 py-6">
            <div className="flex items-center justify-between">
              <BrandMark />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <SidebarNavItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  isActive={item.label === activeItem}
                />
              ))}
            </nav>

            <div className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </p>
              {MOCK_CATEGORIES.map((category) => (
                <SidebarCategoryItem key={category.id} category={category} />
              ))}
            </div>

            <div className="mt-auto">
              <SidebarCta />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
