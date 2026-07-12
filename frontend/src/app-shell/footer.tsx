import { BrandMark } from './components/brand-mark';
import { FooterLinkColumn } from './components/footer-link-column';

// NOTE: assets/prototypes/homepage-prototype.png does not show any
// content below the platform stats bar. This footer was added because
// Phase 2.2's instructions explicitly required a completed footer
// section; it introduces no new colors, spacing scale, or component
// style — only the existing card/border/muted-text language already
// locked in docs/Phase-0.4-Design-System-and-UI-Standards.md. See
// docs/Phase-2.2-Homepage-Completion.md, Known Limitations / Disclosed
// Additions.

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Markets', href: '/markets' },
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Rewards', href: '/rewards' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-xs">
            <BrandMark />
            <p className="mt-3 text-sm text-muted-foreground">
              Predict the future with Points. No real money, no cryptocurrency trading —
              ever.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <FooterLinkColumn key={column.title} title={column.title} links={[...column.links]} />
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} MemeTools. All rights reserved.</p>
          <p>Points-based platform. No real money, ever.</p>
        </div>
      </div>
    </footer>
  );
}
