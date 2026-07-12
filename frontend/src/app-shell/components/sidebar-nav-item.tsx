import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
}

export function SidebarNavItem({ label, href, icon: Icon, isActive = false }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary/15 text-primary'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
