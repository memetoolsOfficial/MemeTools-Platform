# Phase 2.3 — Homepage Polish, Responsiveness & Production Quality

**Phase:** 2.3 — Homepage Polish, Responsiveness & Production Quality
**Type:** Static UI Polish (No New Pages, No Backend, No Auth, No API)
**Depends On:** `README.md`, `docs/Phase-0.2` through `docs/Phase-0.7`, `docs/Phase-1-Initialization.md`, `docs/Phase-2.1-Static-Homepage.md`, `docs/Phase-2.2-Homepage-Completion.md`
**Visual Source of Truth:** `assets/prototypes/homepage-prototype.png` (unchanged — no redesign)
**Status:** Complete — frontend-only; no business logic

---

## Objectives

Take the functionally complete Phase 2.2 homepage to production quality: responsiveness across nine specific breakpoints, subtle animation, tightened accessibility, polished loading states, and measurable performance practices — without redesigning, rebranding, recoloring the approved prototype, or changing its layout/section order. Every section stays exactly where it was; this phase is refinement, not restructuring.

---

## Completed Improvements

### Responsive Layout — including two real bugs found and fixed
Tested at all nine required widths (320, 375, 390, 412, 768, 1024, 1280, 1440, 1920px) using an automated check (`document.documentElement.scrollWidth` vs `clientWidth`) rather than eyeballing. This surfaced **three genuine, pre-existing overflow bugs**, all now fixed:

1. **Category strip caused page-level horizontal scroll below 768px.** Its scrollable inner container was a flex child without `min-w-0`, so instead of scrolling internally it expanded the whole page. Fixed by adding `min-w-0` to the scroll container (the classic "flex child needs `min-w-0` for `overflow-x-auto` to actually clip" issue).
2. **Trending Markets' filter tabs didn't fit at narrow widths** and weren't wrapped or scrollable, causing overflow. Made the tab row horizontally scrollable (`overflow-x-auto`, `min-w-0`, non-shrinking buttons) — consistent with the pattern the category strip already established.
3. **The navbar's right-side button group didn't fit at 320–412px** even after Phase 2.2's mobile-nav work. Fixed by: hiding "Log in" below `sm` (moved into the mobile drawer instead), shrinking "Sign up" to a compact size below `sm`, and removing the header-level mobile search icon in favor of a search field inside the mobile drawer — freeing enough width to fit cleanly at 320px.

After these fixes, all nine breakpoints report zero horizontal overflow, verified programmatically, not just visually.

### Hero Section
Added a staggered fade/slide-up entrance (badge → headline → subtext → CTAs, via the new `Reveal` component) and a slightly larger max heading size at `lg` (`lg:text-6xl`). Layout, copy, spacing, and colors are unchanged from Phase 2.2.

### Market Cards (Rows)
- Now genuinely clickable: a stretched `Link` (pointing to a future per-market route) covers the row, with a subtle hover lift (`y: -2`, via framer-motion) and soft shadow — "clickable appearance" backed by real navigation intent, not just a `cursor-pointer` fake-out.
- The Watchlist star button is deliberately kept as a *sibling* of the stretched link (`relative z-10`), never nested inside it — nesting a `<button>` inside an `<a>` is invalid HTML and breaks keyboard/screen-reader semantics.
- Skeletons upgraded with a shimmer sweep (see below) and memoized (`React.memo`) since they render in a static, unchanging list.

### Sidebar
- Refined active-state styling: a left accent bar + filled background (previously background-only).
- Added genuine **collapse behavior** — a toggle button shrinks the sidebar to an icon-only rail (mascot promo, categories, and CTA hide; nav items keep their icon with a native tooltip and an `sr-only` label for screen readers). Since layout uses normal flex flow rather than fixed positioning, the main content area reflows automatically — no coordination needed with `AppShell`.
- Tuned hover/transition durations to a consistent 150ms across all sidebar interactive elements.

### Navbar
- Added a scroll shadow (`useScrollShadow` hook): the sticky navbar gains a border/shadow once the page scrolls beneath it, clarifying it's now floating above content.
- Fixed the real mobile overflow bug described above; search remains reachable below `md` via the mobile drawer instead of a header-level toggle.
- Mobile drawer (`MobileNav`) refined: animated slide-in/backdrop-fade (previously instant), Escape-to-close, and focus management (focus moves into the drawer on open, returns to the trigger button on close).

### Widgets (Trending Now, Recent Activity, Watchlist)
- Extracted a shared `WidgetCard` (already done in Phase 2.2) now also handles a smooth **crossfade** (via `AnimatePresence`) between skeleton and loaded content, instead of an abrupt swap.
- All three widgets already shared identical padding/header structure from Phase 2.2; this phase adds the crossfade and a subtle hover elevation on the card itself.

### Footer
Tuned hover-transition durations for consistency with the rest of the polish pass. Layout, columns, and copy are unchanged from Phase 2.2 (already responsive: `grid-cols-2` → `sm:grid-cols-4`).

### Skeleton Loading
Replaced the plain `animate-pulse`-only skeleton with a shimmer sweep (a moving gradient highlight layered via a `::before` pseudo-element, driven by a new Tailwind `shimmer` keyframe/animation) on the base `Skeleton` primitive — every composed skeleton (market row, activity item, trending-now item, watchlist item) inherits it automatically.

### Accessibility
- Ran an automated **axe-core** audit (WCAG 2 A/AA ruleset) via Playwright against the live rendered page — not just a manual read-through.
- **Found and fixed a real, systemic color-contrast failure**: the violet used for readable text (links, active nav/tab state, "Active" category badges) measured only 2.4–2.6:1 contrast against the dark background — well under the 4.5:1 AA requirement for text. Fixed by brightening the existing `--accent` token (previously used only for hover glows) to a WCAG-verified value and redirecting all *text* uses of the violet to it, while leaving `--primary` (button fills, borders, pill backgrounds) untouched, since those only need to meet the lower 3:1 non-text/UI-component threshold and already did. Also nudged `--negative` (red) from 57% to 62% lightness — it measured 4.3:1 on its own pill background, just under threshold.
- Re-ran the audit after the fix: **zero violations, 28 passing checks** — confirmed clean at desktop width, at 390px with the mobile drawer open, and with the sidebar collapsed.
- Skip-to-content link, semantic landmarks, and focus-visible rings (carried from Phase 2.2) remain in place; this phase adds `aria-expanded`/`role="dialog"`/`aria-modal` to the mobile drawer, Escape-key handling, and focus-trap-on-open/return-on-close.
- Hero mascot images now carry descriptive alt text (`"MemeTools flame-spirit mascot"`) since they're meaningful brand imagery; the smaller, repeated sidebar-promo copy of the same asset remains `alt=""`/`aria-hidden` as intentionally decorative (avoids a screen reader announcing the same description twice per page).

### Performance
- **Memoized** every component that renders repeatedly inside a static list with stable props: `IconBadge`, `MarketRow`, `TrendingNowItem`, `ActivityItem`, `WatchlistPreviewItem`, `CategoryPillCard`.
- **Moved a derived array to module scope** (`CategoryStrip`'s featured-category lookup) instead of recomputing it on every render — a genuine, measurable win since both source arrays are static constants.
- Considered `next/dynamic` for the mobile drawer, but rejected it: since the hamburger button is above-the-fold, disabling SSR for it would cause a layout shift/missing-button flash on first paint for a negligible bundle saving. Documented here rather than forcing an ill-fitting optimization for its own sake.
- **Honest bundle-size note**: adding framer-motion (explicitly required by this phase) grew the homepage's First Load JS from ~114KB (Phase 2.2) to ~153KB. This is expected and within normal range for a production Next.js app, but is disclosed here rather than left unmentioned.

### Animation
Used framer-motion only for: the hero's staggered entrance, market-row hover lift, widget/list loading↔loaded crossfades, the mobile drawer's slide/fade, and the watchlist star's toggle "pop." All root motion respects `prefers-reduced-motion` automatically via a single `MotionConfig reducedMotion="user"` provider wrapping the app — no individual animated component needs its own reduced-motion check. No animation exceeds ~350ms or moves more than a few pixels, per this phase's "subtle only" instruction.

---

## Performance Improvements (Summary)
- `React.memo` on six list-rendered presentational components.
- Module-scope computation instead of per-render computation for `CategoryStrip`'s derived array.
- Deliberately *not* over-optimizing where it would cost more (UX regression) than it saves (bundle bytes) — see the `next/dynamic` note above.

## Accessibility Improvements (Summary)
- Automated axe-core audit integrated into the verification workflow for this phase (WCAG 2 A/AA), not just manual spot-checks.
- Fixed a real, multi-location color-contrast failure (19 nodes) down to zero violations.
- Mobile drawer: focus trap on open, focus return on close, Escape-to-close, proper dialog semantics.
- Sidebar collapse: icon-only state keeps every nav item's accessible name via `sr-only` text + native tooltip.
- Descriptive alt text added to meaningful (non-decorative) images.

## Responsive Improvements (Summary)
- Verified overflow-free at all nine required breakpoints via automated `scrollWidth`/`clientWidth` comparison, not visual inspection alone.
- Fixed three real bugs: category-strip page-level overflow, non-scrollable filter tabs, and navbar button overflow at ≤412px.

## Animation Improvements (Summary)
- `Reveal` component (hero entrance), `AnimatePresence` crossfades (widgets, trending markets, mobile drawer), hover-lift on market rows, and a spring "pop" on the watchlist star toggle — all under `MotionConfig reducedMotion="user"`.

---

## Known Limitations (Carried Forward, Unchanged)

All Known Limitations from `docs/Phase-2.1-Static-Homepage.md` and `docs/Phase-2.2-Homepage-Completion.md` (mascot as a raster crop, emoji as icon stand-ins, system font stack, pixel-sampled base color calibration, only `/` route implemented, Watchlist/Footer not present in the literal prototype image) still apply unchanged. This phase's color adjustments (`--accent`, `--negative`) are narrow, WCAG-driven exceptions to "do not change colors," applied only where an automated audit found a genuine accessibility failure — not a stylistic choice.

---

## Completion Criteria

Phase 2.3 is considered complete when:

1. `pnpm --filter frontend typecheck`, `pnpm --filter frontend lint`, and `pnpm --filter frontend build` all pass with zero errors.
2. All nine required breakpoints (320–1920px) render with zero horizontal overflow, verified programmatically.
3. An automated axe-core WCAG 2 A/AA audit reports zero violations at desktop width, at mobile width with the drawer open, and with the sidebar collapsed.
4. No console errors, hydration warnings, or unexpected failed requests occur at any tested breakpoint.
5. No `TODO`/`FIXME` comments or dead code remain (verified by search; one genuinely dead export from Phase 2.1, `PLATFORM_STATS`, was found and removed).
6. Every homepage section remains in its original position with its original branding and (apart from the two disclosed WCAG fixes) its original colors.
7. This document exists at `docs/Phase-2.3-Homepage-Polish.md`.

Once these conditions are met, Phase 2.3 is closed.

---

*This document is permanent project documentation, following the standards locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`.*
