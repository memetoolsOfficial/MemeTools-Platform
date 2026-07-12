# Phase 2.2 — Homepage UI Completion

**Phase:** 2.2 — Homepage UI Completion
**Type:** Static UI Implementation (No Backend, No Auth, No API, No Database, No WebSocket, No Blockchain)
**Depends On:** `README.md`, `docs/Phase-0.2` through `docs/Phase-0.7`, `docs/Phase-1-Initialization.md`, `docs/Phase-2.1-Static-Homepage.md`
**Visual Source of Truth:** `assets/prototypes/homepage-prototype.png`
**Status:** Complete — frontend-only; no business logic

---

## Purpose

Phase 2.1 delivered a complete, structurally faithful static homepage. Phase 2.2 finishes it to production quality: it corrects a real responsive gap found during review, removes duplicated markup across the sidebar widgets, actually puts the previously-unused loading skeletons to work, adds the two sections explicitly requested that don't appear in the literal prototype image (Watchlist preview, Footer), and tightens accessibility (landmarks, focus states, keyboard reachability) across the whole shell. No backend, authentication, API, database, websocket, or blockchain code is introduced anywhere in this phase — mock data only, exactly as in Phase 2.1.

---

## Summary of Changes

1. **Fixed a real mobile responsive defect.** `MarketRow` previously *hid* the Volume column and Yes/No price pills below `sm`/`md` instead of restacking them — directly contradicting Phase 0.4 Section 8's rule that mobile market rows must restructure "while preserving the same information." Rewrote it with two explicit layouts (grid row for `sm:` and up, stacked card below `sm`) so every field is visible at every width. Updated `MarketRowSkeleton` to match.
2. **Added the mobile/tablet navigation drawer's remaining polish** and fixed the hero mascot disappearing entirely on mobile (now shown smaller, centered, below the copy — per Phase 0.4 Section 8) instead of vanishing.
3. **Refactored duplicated widget markup.** `TrendingNowWidget` and `RecentActivityWidget` each independently implemented the same `Card` + `CardHeader` + `SectionHeader` + `CardContent` structure in Phase 2.1. Extracted a shared `WidgetCard` component; both widgets (and the new Watchlist preview widget) now use it.
4. **Put the loading skeletons to actual use.** Phase 2.1 shipped skeleton components that were never rendered. Added `useSimulatedLoading` (a small local-only timing hook, `frontend/src/hooks/`) and wired it into `TrendingMarketsSection`, `TrendingNowWidget`, `RecentActivityWidget`, and the new `WatchlistPreviewWidget`, so each genuinely shows its skeleton briefly on mount before revealing mock content.
5. **Completed the Watchlist preview** (`features/watchlist/`) — previously empty scaffolding from Phase 1. Includes an empty-state path (shown if the mock watchlist array is empty) as well as the populated path.
6. **Completed the Footer** (`app-shell/footer.tsx`) — brand mark, link columns, and a copyright/disclaimer line, added to the persistent `AppShell` below the three-column layout.
7. **Accessibility pass**: skip-to-content link, semantic landmarks (`nav`/`main`/`aside`/`footer` with `aria-label`s), focus-visible rings on every interactive element that lacked one (sidebar items, category pills, footer links, nav tabs), proper `<ul>`/`<li>` list semantics (replacing an initial `role` attribute approach that would have conflicted with anchor semantics), and `aria-controls`/`aria-busy` wiring between the filter tabs, the loading state, and the list they affect.

---

## New Files

```
frontend/src/hooks/use-simulated-loading.ts
frontend/src/components/widget-card.tsx
frontend/src/app-shell/footer.tsx
frontend/src/app-shell/components/footer-link-column.tsx
frontend/src/features/watchlist/data/mock-watchlist.ts
frontend/src/features/watchlist/components/watchlist-preview-item.tsx
frontend/src/features/watchlist/components/watchlist-preview-item-skeleton.tsx
frontend/src/features/watchlist/components/watchlist-preview-widget.tsx
docs/Phase-2.2-Homepage-Completion.md
```

## Modified Files

```
frontend/src/features/dashboard/components/market-row.tsx            (mobile layout rewrite — no more hidden fields)
frontend/src/features/dashboard/components/market-row-skeleton.tsx    (matches the new dual layout)
frontend/src/features/dashboard/components/trending-markets-section.tsx (wired to useSimulatedLoading; header cleanup)
frontend/src/features/dashboard/components/market-filter-tabs.tsx     (aria-controls support)
frontend/src/features/dashboard/components/hero-section.tsx           (mascot now visible on mobile; type scale)
frontend/src/features/dashboard/components/category-pill-card.tsx     (focus-visible ring)
frontend/src/features/leaderboard/components/trending-now-widget.tsx  (refactored onto WidgetCard + loading)
frontend/src/features/leaderboard/components/trending-now-item.tsx    (li root, hover/focus, whole-row link)
frontend/src/features/leaderboard/components/trending-now-item-skeleton.tsx (li root)
frontend/src/features/activity-feed/components/recent-activity-widget.tsx  (refactored onto WidgetCard + loading)
frontend/src/features/activity-feed/components/activity-item.tsx      (li root, hover/focus, whole-row link)
frontend/src/features/activity-feed/components/activity-item-skeleton.tsx (li root)
frontend/src/components/watchlist-button.tsx                          (added defaultSaved prop)
frontend/src/app-shell/app-shell.tsx                                  (skip link, landmarks, Footer mount)
frontend/src/app-shell/sidebar.tsx                                    (nav landmarks, focus-visible)
frontend/src/app-shell/navbar.tsx                                     (nav landmark, focus-visible)
frontend/src/app-shell/components/sidebar-nav-item.tsx                (focus-visible ring)
frontend/src/app-shell/components/sidebar-category-item.tsx           (focus-visible ring)
frontend/src/app/page.tsx                                             (added WatchlistPreviewWidget to right rail)
```

No files outside `frontend/` were touched. `README.md` and `docs/Phase-0.x`/`Phase-1`/`Phase-2.1` documents are unmodified, per this phase's instruction not to regenerate existing files.

---

## Folder Usage

Every new file lands in the location Phase 0.2 already specifies: `features/watchlist/components/` and `features/watchlist/data/` (previously empty scaffolding, now populated), `hooks/` (used for the first time), and `components/` for the new cross-feature `WidgetCard`. No new top-level folder or architectural pattern was introduced.

---

## Responsive Behavior (Changes Since Phase 2.1)

- **Mobile market rows now show every field** (icon, question, category, volume, percentage, Yes/No pills, watchlist star) via a restacked card layout, rather than hiding the volume and price pills as Phase 2.1 did.
- **The hero mascot no longer disappears on mobile** — a smaller, centered version renders below the hero copy, consistent with Phase 0.4's explicit mobile rule.
- Desktop/tablet layout is otherwise unchanged from Phase 2.1, which already matched the prototype closely.

---

## Known Limitations / Disclosed Additions

Carried over from Phase 2.1, plus two new, explicitly disclosed additions:

1. **Watchlist preview and Footer do not appear in `assets/prototypes/homepage-prototype.png`.** The prototype image shows no content below the platform stats bar, and no watchlist-specific section on the homepage. Both were added because this phase's instructions explicitly required "Complete watchlist preview" and "Complete footer." Both are built entirely from the design tokens and component patterns already locked in Phase 0.4 (same card style, same row anatomy, same colors, same spacing) — nothing new was invented visually. This is disclosed here rather than silently presented as part of the "pixel-perfect" prototype match.
2. **The Watchlist preview's "saved" state is illustrative**, not persisted — it reads from local mock data (`MOCK_WATCHLIST`) and the star toggle (`WatchlistButton`) is still purely local component state, per this phase's explicit "no backend" scope. The real Watchlist feature (Phase 9, per `docs/Phase-0.7`) will replace this with genuine persisted state.
3. All Known Limitations from `docs/Phase-2.1-Static-Homepage.md` (mascot as a raster crop, emoji as icon stand-ins, system font stack, pixel-sampled color calibration, only `/` route implemented) still apply unchanged.

---

## Completion Criteria

Phase 2.2 is considered complete when:

1. `pnpm --filter frontend typecheck`, `pnpm --filter frontend lint`, and `pnpm --filter frontend build` all pass with zero errors.
2. Every homepage section listed in this phase's requirements (sidebar, trending markets, leaderboard preview, activity feed, watchlist preview, footer) is present and functional at a visual level.
3. Mobile market rows show every field without hiding any of them.
4. No duplicated `Card`/`CardHeader`/`SectionHeader` markup remains across the sidebar widgets — all three use `WidgetCard`.
5. Loading skeletons are actually rendered (briefly, via `useSimulatedLoading`) rather than existing as unused dead code.
6. A skip-to-content link, semantic landmarks, and visible focus states exist across the navbar, sidebar, mobile drawer, and footer.
7. No console errors, hydration warnings, or unexpected failed requests occur at desktop, tablet, or mobile viewport widths.
8. This document exists at `docs/Phase-2.2-Homepage-Completion.md`.

Once these conditions are met, Phase 2.2 is closed. Phase 3 is **not** started as part of this phase, per explicit instruction.

---

*This document is permanent project documentation, following the standards locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`.*
