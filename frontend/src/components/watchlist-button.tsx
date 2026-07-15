'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
  marketTitle: string;
  defaultSaved?: boolean;
  className?: string;
}

/**
 * Visual-only toggle in this phase — there is no backend, authentication,
 * or Watchlist API yet (per docs/Phase-0.7, Watchlist is its own future
 * phase). Local component state gives the control a real interactive feel
 * without persisting anything or implying a working feature.
 */
export function WatchlistButton({ marketTitle, defaultSaved = false, className }: WatchlistButtonProps) {
  const [isSaved, setIsSaved] = useState(defaultSaved);

  return (
    <button
      type="button"
      onClick={() => setIsSaved((prev) => !prev)}
      aria-pressed={isSaved}
      aria-label={
        isSaved ? `Remove ${marketTitle} from watchlist` : `Add ${marketTitle} to watchlist`
      }
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-150 hover:scale-105 hover:bg-secondary hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <m.span
        key={isSaved ? 'saved' : 'unsaved'}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="flex"
      >
        <Star
          className={cn('h-4 w-4', isSaved && 'fill-primary text-accent')}
          aria-hidden="true"
        />
      </m.span>
    </button>
  );
}
