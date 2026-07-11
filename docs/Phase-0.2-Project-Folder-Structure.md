# Phase 0.2 — Project Folder Structure

**Phase:** 0.2 — Project Folder Structure
**Type:** Architecture Documentation (No Code)
**Depends On:** `README.md` (Master Blueprint)
**Governs:** All future phases (1 through 12+), starting with Phase 1 (Static Homepage)

---

## 1. Purpose of This Document

This document defines the complete, high-level folder architecture for the MemeTools platform. It exists so that every future development phase — regardless of which session builds it — has a single, agreed-upon place to put its code, and so that no phase has to invent structure on the fly.

This document does **not** contain any code, configuration, package manifests, database schema, or implementation of any kind. It defines **where things will go**, not what they contain internally.

This document is bound by, and must not contradict, `README.md`. In particular:

- The platform is Points-only — no folder, module, or naming implies real money or cryptocurrency trading.
- The approved homepage prototype remains the visual reference — this structure exists to support that UI faithfully, not to reshape it.
- Development proceeds in strict phases — this structure is designed so each phase can be added without restructuring what came before.

---

## 2. Why This Architecture Was Selected

MemeTools is being built by a solo developer across many sessions over a long period of time. The architecture is therefore optimized for three things, in this order of priority:

1. **Predictability** — Given any feature request, it should be obvious where the code belongs without needing to re-derive the structure from scratch.
2. **Isolation** — Frontend, backend, and shared logic are cleanly separated so that a change in one does not force unrelated changes in another.
3. **Growth without restructuring** — Every module named in the README's Core Features (Authentication, Markets, Portfolio, Leaderboard, Watchlist, Profile, Market Detail, Activity Feed) and the future Admin module already has an obvious "home" in this structure, even before they're built.

This is a **feature-oriented, layered structure**: each major layer (frontend, backend, shared) is organized internally by feature/domain rather than by technical type alone, which scales far better than "one giant folder of components" or "one giant folder of routes" as the platform grows.

### How this avoids technical debt

- No folder is created "just in case" — every folder listed here maps directly to a feature already named in the README's Core Features or Development Roadmap.
- Feature-based organization means that when a phase (e.g. Leaderboard) is completed, its code lives in one predictable location rather than being scattered across many technical folders.
- Shared logic (types, constants, utilities used by both frontend and backend) lives in one place (`shared/`), preventing duplicated or drifting definitions of core concepts like `PointsBalance` or `MarketStatus`.
- Documentation lives alongside the code it describes (`docs/`), with a required Phase Spec per phase, so historical context is never lost between sessions.

### How this supports scaling

- New categories, markets, or features slot into existing feature folders without requiring new top-level structure.
- The separation between `frontend/`, `backend/`, and `shared/` means the backend could later be split into services, or the frontend could add new client targets, without disturbing the other layers.
- The `admin/` module (future) can be added as a new feature folder inside both `frontend/` and `backend/` without any restructuring of existing modules.

---

## 3. Root Structure

```
memetools/
├── frontend/
├── backend/
├── shared/
├── docs/
├── assets/
└── README.md
```

### `frontend/`
- **Why it exists:** Houses the entire client-facing application — everything the user sees and interacts with, including the homepage that must match the approved prototype.
- **Responsibility:** Rendering UI, managing client-side state, calling backend APIs, and presenting all Core Features (Dashboard, Markets, Portfolio, Leaderboard, Watchlist, Profile, Activity Feed).
- **Stored inside:** UI components, pages/screens, client-side routing, client state management, client-side styling, static UI assets specific to the app shell.
- **Never stored inside:** Business logic that determines point calculations, market resolution, or authentication rules — that belongs in `backend/`. No database access code.
- **Future phases using it:** Phase 1 (Static Homepage) onward — every phase from 2–12 has a frontend component.

### `backend/`
- **Why it exists:** Houses all server-side logic — the source of truth for data, business rules, and security.
- **Responsibility:** Authentication, points ledger logic, market data, leaderboard computation, API endpoints, and enforcement of all platform rules (including the Points-only rule at the data layer).
- **Stored inside:** API route handlers, business logic/services, data models, backend configuration, backend utilities.
- **Never stored inside:** UI code, styling, or anything presentation-related. No hardcoded UI copy.
- **Future phases using it:** Phase 2 (Authentication) onward — every phase from 2–12 has a backend component.

### `shared/`
- **Why it exists:** Prevents duplication of concepts that both the frontend and backend need to agree on, such as a `Market` shape or a `PointsBalance` type.
- **Responsibility:** Single source of truth for cross-cutting types, constants, and pure (non-framework-specific) logic used by both layers.
- **Stored inside:** Shared TypeScript types/interfaces, shared enums/constants (e.g. market categories, market status values), pure utility functions with no dependency on frontend or backend frameworks.
- **Never stored inside:** Anything that depends on a specific framework (no React code, no server framework code), no environment-specific configuration, no secrets.
- **Future phases using it:** Every phase from Phase 3 onward (Core Data Layer) — this is where the definitions of `User`, `Market`, `Prediction`, `PointsTransaction`, etc. conceptually live.

### `docs/`
- **Why it exists:** Preserves project memory across sessions. Since this project spans many sessions with potentially long gaps, undocumented context is effectively lost context.
- **Responsibility:** Hosting the Phase Spec for each development phase, architecture decision records, and any supporting reference material.
- **Stored inside:** Phase Spec documents (e.g. `Phase-1-Static-Homepage.md`), architecture decision records, this document, changelogs.
- **Never stored inside:** Source code, secrets, credentials, or anything executable.
- **Future phases using it:** Every phase — each phase begins by adding its Phase Spec here before any code is written, per the README's Documentation Standards.

### `assets/`
- **Why it exists:** Central home for the platform's shared visual assets tied to brand identity (the MemeTools logo, mascot/character art, category icons) that may be used across multiple contexts (frontend app, documentation, future marketing).
- **Responsibility:** Storing raw source design assets that are not tied to one specific frontend build pipeline.
- **Stored inside:** Prototype reference images (e.g. the approved homepage prototype), logo files, mascot artwork, category iconography source files.
- **Never stored inside:** Compiled/bundled frontend output, user-uploaded content, anything generated at runtime.
- **Future phases using it:** Phase 1 (Static Homepage) for initial brand assets; referenced by later phases whenever new iconography (e.g. new categories) is introduced.

### `README.md`
- Remains at the root as the permanent master blueprint, as defined in Phase 0.

---

## 4. Frontend Subfolder Hierarchy

```
frontend/
├── app-shell/
├── features/
│   ├── dashboard/
│   ├── auth/
│   ├── markets/
│   ├── market-detail/
│   ├── portfolio/
│   ├── watchlist/
│   ├── leaderboard/
│   ├── activity-feed/
│   ├── profile/
│   └── admin/
├── components/
├── styles/
├── hooks/
├── services/
└── assets/
```

### `app-shell/`
- **Why it exists:** Holds the elements that appear on every page, matching the prototype's persistent layout — top navbar, left sidebar, right sidebar containers.
- **Responsibility:** Global layout, navigation, and page-frame composition.
- **Stored inside:** Navbar, sidebar, page layout wrapper components.
- **Never stored inside:** Feature-specific logic (e.g. market-fetching logic does not belong here).
- **Future phases using it:** Phase 1 onward — this is built first since it frames every other feature.

### `features/`
- **Why it exists:** Groups all UI by product feature rather than by technical type, matching the README's Core Features one-to-one. This is the primary organizing principle of the frontend.
- **Responsibility:** Each subfolder owns everything specific to its feature's screens and feature-local logic.
- **Stored inside:** Feature-specific screens/pages, feature-local components not reused elsewhere, feature-local state.
- **Never stored inside:** Logic or components genuinely shared across multiple features (those go in `components/` or `hooks/` instead).
- **Future phases using it:**
  - `dashboard/` → Phase 1, 6
  - `auth/` → Phase 2
  - `markets/` → Phase 4
  - `market-detail/` → Phase 5
  - `portfolio/` → Phase 7
  - `leaderboard/` → Phase 8
  - `watchlist/` → Phase 9
  - `profile/` → Phase 10
  - `activity-feed/` → Phase 6 (dashboard wiring) and reused elsewhere
  - `admin/` → Future phase, post-Phase 12, reserved now so it has a defined home

### `components/`
- **Why it exists:** Houses genuinely reusable UI pieces used across more than one feature (e.g. a market card, a Yes/No price pill, a points badge) — matching the prototype's consistent card and pill styling.
- **Responsibility:** Presentation-only, reusable building blocks.
- **Stored inside:** Shared visual components with no feature-specific business logic baked in.
- **Never stored inside:** Feature-specific screens, data-fetching logic, routing logic.
- **Future phases using it:** Phase 1 onward, growing as more shared visual patterns emerge.

### `styles/`
- **Why it exists:** Central home for the design tokens that encode the approved prototype's visual identity — color palette, typography scale, spacing units.
- **Responsibility:** Ensuring visual consistency is defined once and reused everywhere, so no feature can silently drift from the approved design.
- **Stored inside:** Design tokens/theme definitions, global style baseline.
- **Never stored inside:** One-off, feature-specific style overrides that contradict the approved design system.
- **Future phases using it:** Phase 1 (established first), referenced by every subsequent phase.

### `hooks/`
- **Why it exists:** Houses reusable client-side logic (e.g. "get current user," "get points balance") that multiple features need but that isn't itself a visual component.
- **Responsibility:** Reusable, cross-feature client-side logic.
- **Stored inside:** Shared reusable logic hooks.
- **Never stored inside:** Feature-specific one-off logic, direct UI markup.
- **Future phases using it:** Phase 2 onward, as authentication and points-balance state become needed across multiple features.

### `services/`
- **Why it exists:** Centralizes how the frontend communicates with the backend, so API access patterns are consistent and not duplicated per feature.
- **Responsibility:** Defining how features talk to backend APIs.
- **Stored inside:** API client logic organized by domain (e.g. markets service, auth service).
- **Never stored inside:** Business logic that should live in the backend; UI code.
- **Future phases using it:** Phase 2 onward, growing with each backend-integrated feature.

### `assets/` (frontend-local)
- **Why it exists:** Holds frontend-build-specific processed assets (as distinct from the root-level `assets/`, which holds raw source assets).
- **Responsibility:** Assets consumed directly by the frontend build.
- **Stored inside:** Optimized/processed images and icons used directly in the UI.
- **Never stored inside:** Raw, unprocessed source design files (those belong in root `assets/`).
- **Future phases using it:** Phase 1 onward.

---

## 5. Backend Subfolder Hierarchy

```
backend/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── markets/
│   ├── market-detail/
│   ├── predictions/
│   ├── portfolio/
│   ├── watchlist/
│   ├── leaderboard/
│   ├── activity-feed/
│   ├── profile/
│   ├── rewards/
│   └── admin/
├── core/
├── middleware/
└── config/
```

### `modules/`
- **Why it exists:** Mirrors the frontend's feature-oriented organization on the backend side, so each Core Feature has one clear owner of its business logic, matching the README's Core Features and Roadmap one-to-one.
- **Responsibility:** Each subfolder owns the business logic, data access, and API surface for its domain.
- **Stored inside:** Domain-specific logic, data access for that domain, API route definitions for that domain.
- **Never stored inside:** Logic belonging to a different domain (e.g. leaderboard-ranking logic does not belong inside `predictions/`); no UI code of any kind.
- **Future phases using it:**
  - `auth/`, `users/` → Phase 2, 3
  - `markets/` → Phase 4
  - `market-detail/`, `predictions/` → Phase 5 (predictions are always denominated in Points, per README)
  - `portfolio/` → Phase 7
  - `watchlist/` → Phase 9
  - `leaderboard/` → Phase 8
  - `activity-feed/` → Phase 6
  - `profile/` → Phase 10
  - `rewards/` → Phase 11
  - `admin/` → Future phase, reserved now

### `core/`
- **Why it exists:** Houses cross-cutting backend logic that doesn't belong to any single feature module — e.g. the points-ledger engine that every points-earning/points-spending feature relies on.
- **Responsibility:** Foundational, domain-agnostic backend logic used by multiple modules.
- **Stored inside:** Core points-transaction logic, core domain rules that multiple modules depend on.
- **Never stored inside:** Feature-specific logic that belongs in a single `modules/` subfolder.
- **Future phases using it:** Phase 3 onward, as soon as Points logic needs to be shared across modules (e.g. Predictions and Rewards both touch a user's points balance).

### `middleware/`
- **Why it exists:** Centralizes cross-cutting request-handling concerns (e.g. authentication checks, request validation) so they aren't reimplemented per module.
- **Responsibility:** Request-level cross-cutting concerns applied across API routes.
- **Stored inside:** Auth verification logic, request validation logic, error handling.
- **Never stored inside:** Feature-specific business logic.
- **Future phases using it:** Phase 2 onward.

### `config/`
- **Why it exists:** Provides one predictable location for backend configuration concepts (as concepts only — no actual config files or secrets are created in this phase).
- **Responsibility:** Defining how backend configuration is organized once implementation begins.
- **Stored inside:** (In future phases) environment-specific settings, non-secret configuration.
- **Never stored inside:** Actual secrets or credentials at any point — those are managed outside version control entirely.
- **Future phases using it:** Introduced concretely starting Phase 1/2 backend setup, per the README's Coding Standards.

---

## 6. Shared Subfolder Hierarchy

```
shared/
├── types/
├── constants/
└── utils/
```

### `types/`
- **Why it exists:** Guarantees the frontend and backend never define conflicting shapes for core concepts like `User`, `Market`, `Prediction`, or `PointsTransaction`.
- **Responsibility:** Single definition of every cross-cutting data shape.
- **Stored inside:** Shared type/interface definitions.
- **Never stored inside:** Framework-specific types (e.g. no React-specific or server-framework-specific types).
- **Future phases using it:** Phase 3 onward, growing with each new domain concept introduced.

### `constants/`
- **Why it exists:** Prevents "magic values" (per the README's Coding Standards) from being duplicated or drifting between frontend and backend — e.g. category names, market status values, points-related constants.
- **Responsibility:** Single source of truth for enumerable, cross-cutting values.
- **Stored inside:** Category definitions, market status enums, default points values (all conceptually — no implementation yet).
- **Never stored inside:** Environment-specific or secret values.
- **Future phases using it:** Phase 3 onward.

### `utils/`
- **Why it exists:** Houses pure logic (e.g. formatting a points value for display) that both frontend and backend can use identically, avoiding duplicated implementations that could drift apart.
- **Responsibility:** Pure, framework-agnostic helper logic used by both layers.
- **Stored inside:** Pure functions with no side effects and no framework dependency.
- **Never stored inside:** Anything with a side effect, a network call, or a framework dependency.
- **Future phases using it:** Introduced as soon as a genuine cross-layer utility need arises — likely Phase 3 onward.

---

## 7. Docs Subfolder Hierarchy

```
docs/
├── phase-specs/
├── architecture/
└── changelog/
```

### `phase-specs/`
- **Why it exists:** Enforces the README's Documentation Standards rule that every phase gets its own spec document before code is written.
- **Responsibility:** One document per phase, describing that phase's exact scope, before implementation begins.
- **Stored inside:** `Phase-1-Static-Homepage.md`, `Phase-2-Authentication.md`, etc. — one file per phase, including this document's sibling files.
- **Never stored inside:** Code, or specs for phases that have not yet been approved to begin.
- **Future phases using it:** Every phase, starting now with this document.

### `architecture/`
- **Why it exists:** Preserves the reasoning behind structural decisions (like this document) separately from phase-specific feature specs, so architectural intent isn't lost among feature details.
- **Responsibility:** Housing documents like this one, plus any future architecture decision records (e.g. if a major structural change is approved later).
- **Stored inside:** This document, future architecture decision records.
- **Never stored inside:** Feature-specific specs (those belong in `phase-specs/`).
- **Future phases using it:** Referenced by every future phase; updated only when an explicit, documented architectural amendment is approved.

### `changelog/`
- **Why it exists:** Gives future sessions a quick, chronological view of what has changed and why, without needing to re-read every phase spec in full.
- **Responsibility:** Lightweight, dated log of major decisions and completed phases.
- **Stored inside:** Dated entries summarizing what was completed or decided.
- **Never stored inside:** Detailed specs (those belong in `phase-specs/`) or source code.
- **Future phases using it:** Updated at the end of every completed phase.

---

## 8. Future Phase Compatibility Summary

Every module named in the README's Core Features and Roadmap already has a defined, unambiguous home in this structure:

| Module | Frontend Location | Backend Location |
|---|---|---|
| Authentication | `frontend/features/auth/` | `backend/modules/auth/`, `backend/modules/users/` |
| Home Dashboard | `frontend/features/dashboard/`, `frontend/app-shell/` | `backend/modules/activity-feed/` (for live feed data) |
| Markets | `frontend/features/markets/` | `backend/modules/markets/` |
| Market Detail | `frontend/features/market-detail/` | `backend/modules/market-detail/`, `backend/modules/predictions/` |
| Portfolio | `frontend/features/portfolio/` | `backend/modules/portfolio/` |
| Watchlist | `frontend/features/watchlist/` | `backend/modules/watchlist/` |
| Leaderboard | `frontend/features/leaderboard/` | `backend/modules/leaderboard/` |
| Recent Activity | `frontend/features/activity-feed/` | `backend/modules/activity-feed/` |
| Profile | `frontend/features/profile/` | `backend/modules/profile/` |
| Rewards / XP | (extends `profile/` or `dashboard/` UI) | `backend/modules/rewards/` |
| Admin (future) | `frontend/features/admin/` (reserved) | `backend/modules/admin/` (reserved) |

No restructuring is anticipated as these phases are built — each simply populates its already-designated folder.

---

## 9. Rules Carried Forward From the README

This architecture exists in service of the Master README and does not override it. In particular, this structure:

- Introduces no folder, file name, or module that implies real money, fiat currency, or cryptocurrency trading. All points-related concepts are named around **Points** (e.g. `points_balance`, not `wallet_balance`).
- Introduces no restructuring of the approved homepage prototype's visual design — `assets/` and `frontend/app-shell/` exist specifically to preserve it faithfully.
- Does not front-load implementation for any phase beyond what is currently approved (Phase 0.2). Every folder above is currently **empty scaffolding-in-concept only** — no files are created by this document.
- Remains subordinate to the README: if any future instruction conflicts with this structure, the conflict must be raised and resolved explicitly, per the README's Future AI Collaboration Rules.

---

*This document defines architecture only. No code, configuration, schema, or implementation files are created as part of Phase 0.2. Implementation begins only when a specific future phase (starting with Phase 1) is explicitly opened.*
