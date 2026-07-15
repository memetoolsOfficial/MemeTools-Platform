import type { Metadata } from 'next';
import '@/styles/globals.css';
import { MotionProvider } from '@/components/providers/motion-provider';

// Single, clean, modern sans-serif typeface used throughout the entire
// product, per docs/Phase-0.4-Design-System-and-UI-Standards.md, Section 3
// (Font Family Philosophy) — no serif or decorative display face anywhere.
//
// Uses the platform's native system font stack (configured in
// tailwind.config.ts) rather than a fetched web font, so the app has no
// external network dependency at build or render time.

export const metadata: Metadata = {
  title: 'MemeTools — Predict the future.',
  description:
    'From memecoins to major events. All markets. One platform. A Points-based prediction market — no real money, ever.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen overflow-x-hidden font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
