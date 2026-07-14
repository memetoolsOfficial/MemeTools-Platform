'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, LogIn, Search } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { SidebarNavItem } from './sidebar-nav-item';
import { SidebarCategoryItem } from './sidebar-category-item';
import { SidebarCta } from './sidebar-cta';
import { Input } from '@/components/ui/input';
import { PRIMARY_NAV_ITEMS, type PrimaryNavLabel } from '../nav-items';
import { MOCK_CATEGORIES } from '@/features/dashboard/data/mock-categories';

interface MobileNavProps {
  activeItem?: PrimaryNavLabel;
}

/**
 * The mobile/tablet equivalent of the persistent desktop Sidebar, per
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 8 (Mobile).
 * Reuses the exact same nav-item and category-item components as the
 * desktop sidebar — no new visual pattern introduced.
 *
 * Phase 2.3 refinements: animated slide-in/backdrop-fade (instead of
 * an instant appearance), Escape-to-close, and focus management
 * (focus moves into the drawer on open and returns to the trigger
 * button on close) for proper keyboard/screen-reader support.
 */
export function MobileNav({ activeItem = 'Home' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex h-full w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto border-r border-border bg-background px-4 py-6"
            >
              <div className="flex items-center justify-between">
                <BrandMark />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Close navigation menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  placeholder="Search markets..."
                  aria-label="Search markets"
                  className="rounded-full pl-9"
                />
              </div>

              <nav aria-label="Primary" className="flex flex-col gap-1">
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

              <nav aria-label="Categories" className="flex flex-col gap-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                {MOCK_CATEGORIES.map((category) => (
                  <SidebarCategoryItem key={category.id} category={category} />
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href="/login"
                  prefetch={false}
                  onClick={handleClose}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Log in
                </Link>
                <SidebarCta />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
