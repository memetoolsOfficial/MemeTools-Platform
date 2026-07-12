import Image from 'next/image';

// NOTE: mascot.png is a direct crop of the approved prototype
// (assets/prototypes/homepage-prototype.png), reused here since no
// isolated/vector brand asset exists yet. See
// docs/Phase-2.1-Static-Homepage.md, Known Limitations.

export function SidebarMascotPromo() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-hero-gradient px-4 pb-4 pt-6 text-center">
      <div className="relative mx-auto h-28 w-28">
        <div className="absolute inset-0 bg-mascot-glow" aria-hidden="true" />
        <Image
          src="/mascot.png"
          alt=""
          fill
          className="relative object-contain"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 text-[11px] font-semibold tracking-widest text-muted-foreground">
        EXPLORE &bull; ANALYZE &bull; CONQUER
      </p>
    </div>
  );
}
