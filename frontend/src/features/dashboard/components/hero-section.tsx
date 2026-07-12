import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-hero-gradient px-8 py-10 sm:px-10">
      <div className="relative z-10 flex flex-col gap-6 lg:max-w-xl">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          LIVE
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
          Predict the <span className="text-primary">future.</span>
        </h1>

        <p className="max-w-md text-base text-muted-foreground">
          From memecoins to major events. All markets. One platform.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="lg" asChild>
            <Link href="/markets" prefetch={false}>Explore Markets</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/how-it-works" prefetch={false}>
              <Play className="h-4 w-4" aria-hidden="true" />
              How it works
            </Link>
          </Button>
        </div>
      </div>

      {/* Mascot artwork — cropped directly from the approved prototype;
          see docs/Phase-2.1-Static-Homepage.md, Known Limitations. */}
      <div className="pointer-events-none absolute -right-6 bottom-0 top-0 hidden w-[420px] sm:block">
        <div className="absolute inset-0 bg-mascot-glow" aria-hidden="true" />
        <Image
          src="/mascot.png"
          alt=""
          fill
          priority
          className="relative object-contain object-bottom"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
