# Phase 2.1 — Static Homepage

**Phase:** 2.1 — Static Homepage
**Type:** Static UI Implementation (No Backend, No Auth, No API, No Database)
**Depends On:** `README.md`, `docs/Phase-0.2-Project-Folder-Structure.md`, `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`, `docs/Phase-0.4-Design-System-and-UI-Standards.md`, `docs/Phase-0.5`, `docs/Phase-0.6`, `docs/Phase-0.7`, `docs/Phase-1-Initialization.md`
**Visual Source of Truth:** `assets/prototypes/homepage-prototype.png`
**Status:** Complete — static homepage only; no business logic

---

## Purpose

This phase implements the complete MemeTools homepage as a static, pixel-faithful replica of the approved prototype, using Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui conventions on top of the codebase initialized in Phase 1. Every visual element from the prototype is implemented — navbar, sidebar, hero, category strip, trending markets table, right-rail leaderboard preview and activity feed, and the bottom stats bar — using local mock data only. There is no backend, authentication, API, or database involved anywhere in this phase.

---

## Files Created

### Design tokens & app config
- `frontend/src/styles/globals.css` — real dark/violet design tokens (replacing Phase 1's neutral placeholders), calibrated against pixel samples taken directly from the prototype image.
- `frontend/tailwind.config.ts` — added `positive`/`negative` semantic color tokens and a system-font `fontFamily` stack.
- `frontend/src/app/layout.tsx` — applies the dark theme and system font stack; no external font fetch dependency.
- `frontend/src/app/page.tsx` — composes `AppShell` + `DashboardPage` + right-rail widgets into the actual homepage route.
- `frontend/public/mascot.png` — the flame-spirit mascot artwork, cropped directly from `assets/prototypes/homepage-prototype.png` (see Known Limitations).

### UI primitives (`frontend/src/components/ui/`)
`button.tsx`, `badge.tsx`, `card.tsx`, `input.tsx`, `skeleton.tsx` — shadcn/ui-style primitives styled to the approved palette.

### Shared domain components (`frontend/src/components/`)
`icon-badge.tsx`, `market-price-pills.tsx`, `percentage-indicator.tsx`, `watchlist-button.tsx`, `section-header.tsx`.

### App Shell (`frontend/src/app-shell/`)
`app-shell.tsx`, `navbar.tsx`, `sidebar.tsx`, `nav-items.ts`, and `components/`: `brand-mark.tsx`, `search-bar.tsx`, `mobile-nav.tsx`, `sidebar-mascot-promo.tsx`, `sidebar-nav-item.tsx`, `sidebar-category-item.tsx`, `sidebar-cta.tsx`.

### Dashboard feature (`frontend/src/features/dashboard/`)
`components/`: `dashboard-page.tsx`, `hero-section.tsx`, `category-strip.tsx`, `category-pill-card.tsx`, `trending-markets-section.tsx`, `market-filter-tabs.tsx`, `market-row.tsx`, `market-row-skeleton.tsx`, `stats-bar.tsx`.
`data/`: `mock-categories.ts`, `mock-markets.ts`.

### Leaderboard-preview feature (`frontend/src/features/leaderboard/`)
`components/`: `trending-now-widget.tsx`, `trending-now-item.tsx`, `trending-now-item-skeleton.tsx`.
`data/`: `mock-trending-now.ts`.

### Activity-feed feature (`frontend/src/features/activity-feed/`)
`components/`: `recent-activity-widget.tsx`, `activity-item.tsx`, `activity-item-skeleton.tsx`.
`data/`: `mock-activity.ts`.

### Utilities
`frontend/src/lib/format.ts` — pure formatting helpers (volume, count, percentage, cents).

---

## Components Created

Every component listed above is a small, single-responsibility, reusable unit, per Phase 0.3's Coding Standards. Notably reusable across the app (not tied to one screen): `IconBadge`, `MarketPricePills`, `PercentageIndicator`, `WatchlistButton`, `SectionHeader`, and every `components/ui/` primitive. `MarketRow`, `TrendingNowItem`, and `ActivityItem` all share the same underlying anatomy (leading icon → primary label → secondary metadata → right-aligned value), per Phase 0.4 Section 10 (UI Consistency Rules).

---

## Folder Usage

Every file lands exactly where Phase 0.2 specifies: `app-shell/` holds only persistent-shell elements (navbar, sidebar, mobile drawer); `features/dashboard`, `features/leaderboard`, and `features/activity-feed` each own their own components and mock `data/`; shared, cross-feature UI lives in `components/` (with `components/ui/` for primitives); pure helpers live in `lib/`.

Two small, disclosed deviations (consistent with the two already disclosed in Phase 1):
- **Category data lives in `features/dashboard/data/`**, not a dedicated `features/categories/` folder — Phase 0.2's frontend feature list does not include a `categories` folder (Categories becomes its own phase, Phase 5, per Phase 0.7). Since categories are only consumed by the sidebar and homepage in this phase, placing the mock data under `dashboard` avoids inventing new architecture; this can move to a dedicated location when Phase 5 introduces the real Categories feature.
- **`app-shell/nav-items.ts`** was added as a small shared data file so the desktop `Sidebar` and the new `MobileNav` drawer render the exact same navigation items from one source — not a new architectural pattern, just avoiding duplicating a literal array in two files.

---

## Responsive Behavior

Implemented per `docs/Phase-0.4-Design-System-and-UI-Standards.md`, Section 8:

- **Desktop (≥ 1280px, `xl`):** Full three-column layout — sidebar, main content, right rail (Trending Now + Recent Activity).
- **Tablet / small desktop (< 1280px):** Right rail hides (`xl:flex`); main content and category strip reflow; sidebar remains visible down to `lg` (1024px).
- **Below `lg` (1024px):** The persistent desktop `Sidebar` and navbar's text tabs hide. A hamburger button (`MobileNav`) appears in the navbar instead, opening a slide-out drawer that reuses the **exact same** nav items, category items, and CTA components as the desktop sidebar — this was added during this phase after testing revealed the initial tablet/mobile layout left no way to reach primary navigation at all below `lg`, which directly contradicted Phase 0.4 Section 8's requirement that the sidebar "collapses into a mobile-appropriate navigation pattern... while preserving the same navigation items."
- **Market rows, category cards, and widgets** reflow their internal spacing at smaller widths (e.g. the Volume column hides below `sm`, price pills hide below `md`) while preserving the same information hierarchy and color semantics, per Phase 0.4's guiding responsive rule.

Verified visually via automated screenshots at 1536×1024 (desktop), 834×1194 (tablet), and 390×844 (mobile), and via a full Next.js production build + browser console check (no errors, no failed requests).

---

## Known Limitations

Disclosed transparently rather than silently smoothed over:

1. **Mascot artwork is a flattened raster crop**, not an isolated/transparent vector asset — `frontend/public/mascot.png` is cropped directly from the approved prototype screenshot (the only source available), reused in both the hero and sidebar promo. Edge blending against each surface's background is close but not pixel-perfect in every context.
2. **Market and category icons use representative emoji glyphs** (via `IconBadge`) rather than exact custom brand SVG icons — no icon-asset pipeline exists yet, and emoji were the closest practical approximation of the prototype's colorful circular icons for mock data.
3. **Typography uses a system font stack**, not a fetched web font — this sandbox environment cannot reach Google Fonts at build time, and removing the external font dependency entirely is arguably more robust for production regardless. The prototype's exact typeface was not identifiable from the flattened image; the system stack matches Phase 0.4's "clean, modern sans-serif" requirement.
4. **Design token colors were calibrated by sampling pixel values** directly from the prototype PNG (via Python/PIL) and converting to HSL, not extracted from an original design file — very close to the source image, but not guaranteed to be the exact original hex values.
5. **Only the `/` route exists.** Every other link (Markets, Rankings, Activity, Portfolio, Leaderboard, Watchlist, Log in, Sign up, How it works, Rewards, category links) points to a real future path with `prefetch={false}` set (since those routes don't exist yet) but will 404 if clicked — expected and correct for this phase, resolved in the phases named in `docs/Phase-0.7`.
6. **Filter tabs, the watchlist star, and the mobile nav drawer are visually and locally interactive** (React state) but not functionally wired to anything — no filtering, no persistence, no real watchlist. This matches the phase's explicit "no business logic" scope.
7. **Loading skeleton components exist** (`market-row-skeleton.tsx`, `activity-item-skeleton.tsx`, `trending-now-item-skeleton.tsx`, plus the base `ui/skeleton.tsx`) but are **not rendered anywhere by default** — since all data in this phase is local and synchronous, there is no real loading state to show. They are shipped as ready-to-use scaffolding for the future phases that introduce real API calls.

---

## Completion Criteria

Phase 2.1 is considered complete when:

1. The homepage at `/` visually matches `assets/prototypes/homepage-prototype.png` in structure, layout, color palette, and content, within the limitations disclosed above.
2. `pnpm --filter frontend typecheck`, `pnpm --filter frontend lint`, and `pnpm --filter frontend build` all pass with zero errors.
3. The homepage renders correctly at desktop, tablet, and mobile viewport widths, with the mobile/tablet navigation drawer providing access to every primary nav item, category, and the CTA, per Phase 0.4 Section 8.
4. No console errors, hydration warnings, or failed network requests occur on initial load, at any tested viewport.
5. All content is sourced from local mock data (`features/*/data/`) — no API calls, no database access, no authentication, no Supabase usage anywhere in the code.
6. Every file lives in the folder Phase 0.2 specifies for it (or one of the two explicitly disclosed, minor deviations in this document).
7. This document exists at `docs/Phase-2.1-Static-Homepage.md`.

Once these conditions are met, Phase 2.1 is closed. The next phase, per `docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md`, is Phase 2 (Authentication) or continued static-page buildout, at the project owner's direction.

---

*This document is permanent project documentation, following the standards locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`.*
