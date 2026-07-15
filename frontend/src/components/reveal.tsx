'use client';

import { m, type Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'span';
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Subtle, single-purpose entrance animation — fade + small slide-up.
 * Triggers via `whileInView` (not on mount), so above-the-fold content
 * animates immediately (it's already "in view") and below-the-fold
 * content animates the moment it scrolls into view — either way,
 * `viewport={{ once: true }}` ensures every section animates exactly
 * once, per Phase 2.4's "sections should animate once" requirement,
 * rather than replaying on every scroll up/down.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = as === 'span' ? m.span : m.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={itemVariants}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Parent container for a staggered reveal sequence — children should
 * be `StaggerItem`. Replaces the previous pattern of manually
 * incrementing a `delay` prop on each individual `Reveal` (as
 * HeroSection did originally), removing that duplication: the stagger
 * timing is defined once, here, rather than once per call site.
 */
export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={groupVariants}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={itemVariants} transition={{ duration: 0.35, ease: 'easeOut' }}>
      {children}
    </m.div>
  );
}
