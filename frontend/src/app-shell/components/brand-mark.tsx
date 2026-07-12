import Link from 'next/link';
import { Skull } from 'lucide-react';

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="MemeTools — Home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <Skull className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-foreground">
        MEME<span className="italic">TOOLS</span>
        <span className="text-primary">&apos;</span>
      </span>
    </Link>
  );
}
