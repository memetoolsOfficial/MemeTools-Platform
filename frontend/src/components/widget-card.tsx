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
 * docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 4 ("The
 * right rail's two widgets... use identical internal padding and
 * spacing rhythm to each other, establishing a reusable 'sidebar
 * widget' pattern for any future right-rail content").
 *
 * Introduced in Phase 2.2 to remove the duplicated Card/CardHeader/
 * SectionHeader markup that Trending Now and Recent Activity each
 * implemented separately in Phase 2.1. Renders `children` (each
 * expected to be an <li>) inside a semantic <ul>, so list structure is
 * conveyed natively rather than through ARIA role overrides.
 */
export function WidgetCard({ title, viewAllHref, children, isLoading = false }: WidgetCardProps) {
  return (
    <Card aria-busy={isLoading}>
      <CardHeader className="pb-0">
        <SectionHeader title={title} viewAllHref={viewAllHref} />
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="divide-y divide-border">{children}</ul>
      </CardContent>
    </Card>
  );
}
