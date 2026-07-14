'use client';

import { motion, type Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'span';
}

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Subtle, single-purpose entrance animation — fade + small slide-up on
 * mount. Used sparingly (hero content, widget content after loading)
 * per Phase 2.3's "subtle animations only, no excessive movement"
 * instruction. Duration and easing are fixed here so every use of
 * Reveal across the app feels identical, rather than each usage
 * inventing its own timing.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const MotionTag = as === 'span' ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}
