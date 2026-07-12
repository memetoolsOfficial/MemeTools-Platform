import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, viewAllHref, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {children}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          prefetch={false}
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      )}
    </div>
  );
}
