import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names conditionally, resolving conflicting
 * utility classes in favor of the last one applied. Standard shadcn/ui
 * tooling helper — required by any future shadcn component, but not a
 * UI component itself.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
