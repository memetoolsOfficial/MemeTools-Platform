import Link from 'next/link';
import { SidebarMascotPromo } from './components/sidebar-mascot-promo';
import { SidebarNavItem } from './components/sidebar-nav-item';
import { SidebarCategoryItem } from './components/sidebar-category-item';
import { SidebarCta } from './components/sidebar-cta';
import { PRIMARY_NAV_ITEMS, type PrimaryNavLabel } from './nav-items';
import { MOCK_CATEGORIES } from '@/features/dashboard/data/mock-categories';

interface SidebarProps {
  activeItem?: PrimaryNavLabel;
}

export function Sidebar({ activeItem = 'Home' }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-border px-4 py-6 lg:flex">
      <SidebarMascotPromo />

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
        <Link
          href="/markets"
          prefetch={false}
          className="px-3 pt-1 text-sm font-medium text-primary hover:underline"
        >
          View all categories
        </Link>
      </div>

      <div className="mt-auto">
        <SidebarCta />
      </div>
    </aside>
  );
}
