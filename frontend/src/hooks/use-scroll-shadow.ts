'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `true` once the page has scrolled past `threshold` pixels.
 * Used by the sticky Navbar to apply a subtle shadow/border once
 * content has scrolled beneath it — a common production-UI affordance
 * that clarifies the navbar is now floating above content rather than
 * sitting flush against it.
 */
export function useScrollShadow(threshold = 8): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
