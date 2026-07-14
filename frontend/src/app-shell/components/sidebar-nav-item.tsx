import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
  collapsed?: boolean;
}

/**
 * Phase 2.3: refined active state (left accent bar + filled
 * background, instead of background-only) and tunable hover
 * transition. Supports a `collapsed` (icon-only) mode for the
 * Sidebar's collapse behavior — the label remains in the DOM for
 * screen readers (sr-only) and as a native tooltip (title attribute)
 * rather than disappearing entirely.
 */
export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  isActive = false,
  collapsed = false,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isActive ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        'relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        collapsed ? 'justify-center px-2' : 'px-3',
        isActive
          ? 'bg-primary/15 text-accent'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-0 top-1 w-1 rounded-full bg-primary"
        />
      )}
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className={collapsed ? 'sr-only' : undefined}>{label}</span>
    </Link>
  );
}
