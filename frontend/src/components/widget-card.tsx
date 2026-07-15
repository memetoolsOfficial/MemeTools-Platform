'use client';

import { AnimatePresence, m } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';

interface WidgetCardProps {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

/**
 * The reusable "sidebar widget" pattern — header with title + optional
 * "View all" link, and a divided list of rows below — per
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 4.
 *
 * Phase 2.3 added a soft crossfade (via AnimatePresence, keyed on
 * `isLoading`) between the skeleton and loaded states, and a subtle
 * hover elevation on the card itself. Phase 2.4 adds a tiny hover
 * scale (1.005 — barely perceptible, intentionally subtle) alongside
 * the shadow, per the "cards: subtle lift, subtle shadow, tiny scale"
 * micro-interaction requirement.
 */
export function WidgetCard({ title, viewAllHref, children, isLoading = false }: WidgetCardProps) {
  return (
    <Card
      aria-busy={isLoading}
      className="transition-all duration-200 hover:scale-[1.005] hover:shadow-md hover:shadow-black/10"
    >
      <CardHeader className="pb-0">
        <SectionHeader title={title} viewAllHref={viewAllHref} />
      </CardHeader>
      <CardContent className="pt-2">
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={isLoading ? 'loading' : 'loaded'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="divide-y divide-border"
          >
            {children}
          </m.ul>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
