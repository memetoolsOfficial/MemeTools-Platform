'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
 * Phase 2.3 adds a soft crossfade (via AnimatePresence, keyed on
 * `isLoading`) between the skeleton and loaded states, instead of an
 * abrupt swap, and a subtle hover elevation on the card itself.
 */
export function WidgetCard({ title, viewAllHref, children, isLoading = false }: WidgetCardProps) {
  return (
    <Card
      aria-busy={isLoading}
      className="transition-shadow duration-200 hover:shadow-md hover:shadow-black/10"
    >
      <CardHeader className="pb-0">
        <SectionHeader title={title} viewAllHref={viewAllHref} />
      </CardHeader>
      <CardContent className="pt-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={isLoading ? 'loading' : 'loaded'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="divide-y divide-border"
          >
            {children}
          </motion.ul>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
