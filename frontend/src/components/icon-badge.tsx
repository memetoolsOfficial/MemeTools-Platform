import { memo } from 'react';
import { cn } from '@/lib/utils';

interface IconBadgeProps {
  glyph: string;
  bgClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-14 w-14 text-2xl',
};

/**
 * Renders a colorful, circular, per-subject icon (market or category),
 * matching the prototype's token-style icons. Uses representative emoji
 * glyphs rather than exact brand SVG assets, since no icon-asset pipeline
 * exists yet — see docs/Phase-2.1-Static-Homepage.md, Known Limitations.
 *
 * Memoized in Phase 2.3 since it renders many times per list (market
 * rows, category cards, widget items) with stable, simple props.
 */
function IconBadgeComponent({ glyph, bgClassName, size = 'md', className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full',
        sizeClasses[size],
        bgClassName ?? 'bg-secondary',
        className,
      )}
      aria-hidden="true"
    >
      <span className="leading-none">{glyph}</span>
    </div>
  );
}

export const IconBadge = memo(IconBadgeComponent);
