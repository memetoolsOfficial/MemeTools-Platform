'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Wraps the app in a single MotionConfig so every framer-motion
 * animation anywhere in the tree automatically honors the user's
 * `prefers-reduced-motion` setting, without each individual animated
 * component needing to check for it itself.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
