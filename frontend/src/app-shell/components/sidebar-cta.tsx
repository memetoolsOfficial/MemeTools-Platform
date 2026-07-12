import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SidebarCta() {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4">
      <p className="text-sm leading-snug text-foreground">
        Trade predictions. Earn rewards. Shape the future.
      </p>
      <Button variant="primary" size="sm" className="mt-3 w-full" asChild>
        <Link href="/signup" prefetch={false}>Get Started</Link>
      </Button>
    </div>
  );
}
