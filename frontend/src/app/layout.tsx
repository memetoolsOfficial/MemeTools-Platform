import type { Metadata } from 'next';
import '@/styles/globals.css';

// NOTE: This is a placeholder root layout, required for the Next.js App
// Router to build. It intentionally contains no design system styling,
// navigation, or components — per docs/Phase-0.7, UI implementation is
// scoped to its own future phase, not this initialization phase.

export const metadata: Metadata = {
  title: 'MemeTools',
  description: 'Predict the future. Points-based prediction markets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
