'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';

/**
 * Phase 2.4 performance optimization: LazyMotion + domAnimation loads
 * framer-motion's animation engine as a separate, smaller async chunk
 * instead of bundling the full library synchronously — the single
 * biggest lever for reducing the bundle-size cost that Phase 2.3
 * flagged as a tradeoff. This requires every animated element in the
 * app to use the lightweight `m` component (not `motion`) — enforced
 * here via `strict`, which throws a clear error at runtime if `motion`
 * is used by mistake anywhere in the tree.
 *
 * Also wraps everything in MotionConfig so every animation
 * automatically honors the user's `prefers-reduced-motion` setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
