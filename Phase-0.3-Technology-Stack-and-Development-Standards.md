# Phase 0.3 — Technology Stack and Development Standards

**Phase:** 0.3 — Technology Stack and Development Standards
**Type:** Permanent Technical Foundation Document (No Code)
**Depends On:** `README.md` (Master Project README), `docs/Phase-0.2-Project-Folder-Structure.md`
**Status:** Locked — this document defines binding technical decisions for all future phases

---

## Purpose of This Document

This document permanently locks the technology stack and defines the coding, development, security, performance, and Git standards that every future phase of MemeTools must follow. It builds directly on the Master README and the Phase 0.2 folder architecture, and does not contradict or replace either.

Once approved, the technology choices in this document are **final** for the lifetime of the project unless the project owner explicitly reopens this document through a documented amendment, per the README's Documentation Standards. No future phase, session, or AI assistant may substitute, add, or remove a core technology without such an explicit amendment.

---

# 1. Project Technology Stack

The stack covers every layer of the platform:

- **Frontend** — the client application rendering the approved prototype UI
- **Backend** — the server application implementing business logic and APIs
- **Database** — persistent storage for users, markets, predictions, and points
- **Authentication** — account creation, login, and session management
- **Storage** — file/asset storage (e.g. profile images, category icons)
- **Package Manager** — dependency management across frontend and backend
- **Version Control** — source code history and collaboration workflow
- **Deployment** — hosting for frontend, backend, and data layer
- **Domain** — the public-facing address of the platform
- **DNS** — routing and management of the domain

Each of these layers has exactly one approved technology, defined in Section 2. No layer is left ambiguous.

---

# 2. Official Technologies (Locked)

The following stack is **approved and permanently locked** for this project. It is not open for comparison, substitution, or debate in any future phase or session.

| Layer | Technology |
|---|---|
| Frontend Framework | **Next.js** |
| Frontend Language | **TypeScript** |
| Frontend Styling | **Tailwind CSS** |
| Backend Framework | **NestJS** |
| Backend Language | **TypeScript** |
| Database | **PostgreSQL** |
| ORM | **Prisma** |
| Authentication | **Supabase Auth** |
| Storage | **Supabase Storage** |
| Version Control | **Git + GitHub** |
| Package Manager | **pnpm** |
| Frontend Deployment | **Vercel** |
| Backend Deployment | **Railway** |
| Database / Auth / Storage Hosting | **Supabase** |
| Domain | **Custom Domain** |
| DNS | **Cloudflare** |

### Binding Notes

- **TypeScript is mandatory** across both `frontend/` and `backend/` — no plain JavaScript files in application code.
- **Tailwind CSS** is the only styling approach used; it must be applied in a way that preserves the approved prototype's exact visual design (colors, spacing, typography) as defined in the README's Design Philosophy — Tailwind is an implementation tool, not a license to reinterpret the design.
- **Prisma** is the only data-access layer between the backend and PostgreSQL — no raw SQL query building outside of Prisma except where Prisma cannot express a necessary query, and any such exception must be documented when it occurs.
- **Supabase Auth** handles all identity and session concerns — no custom-built authentication system is introduced.
- **pnpm** is the only package manager used in this project — no `npm` or `yarn` lockfiles are introduced.
- This stack contains **no blockchain libraries, no crypto wallet SDKs, no payment processors, and no fiat currency handling of any kind**, consistent with the README's permanent rule that Points are the only unit of value.

This table is the definitive answer to "what technology do we use for X" for the rest of the project's lifetime.

---

# 3. Coding Standards

These standards apply uniformly across `frontend/`, `backend/`, and `shared/`, as defined in Phase 0.2.

### Naming Conventions
- **Folders:** kebab-case (e.g. `market-detail/`, `activity-feed/`) — consistent with Phase 0.2.
- **Files:** kebab-case for non-component files (e.g. `points-formatter.ts`); PascalCase for component files (e.g. `MarketCard.tsx`).
- **Components:** PascalCase (e.g. `MarketCard`, `LeaderboardTable`).
- **Variables & functions:** camelCase (e.g. `getUserPoints`, `formatMarketVolume`).
- **Types & interfaces:** PascalCase, no `I` prefix (e.g. `Market`, `PointsTransaction`, not `IMarket`).
- **Constants & enums:** UPPER_SNAKE_CASE (e.g. `MARKET_STATUS`, `DEFAULT_POINTS_BALANCE`).
- **Database tables & columns (Prisma models):** snake_case at the database level, camelCase in Prisma's generated client, per Prisma convention.
- **API endpoints:** kebab-case, resource-based (e.g. `/api/markets/:id`, `/api/points-transactions`), never verb-based (avoid `/api/getMarkets`).
- **Environment variables:** UPPER_SNAKE_CASE, prefixed by concern (e.g. `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`). Any variable exposed to the frontend bundle must use the `NEXT_PUBLIC_` prefix explicitly and deliberately — never by accident.

### Import Order
Imports within any file follow a consistent, four-group order, separated by a blank line:
1. External/third-party packages (e.g. `next`, `react`, `@nestjs/common`)
2. Shared package imports (`shared/`)
3. Internal feature/module imports (relative to the current layer)
4. Local relative imports (same folder or immediate children)

### Formatting Rules
- Formatting is enforced automatically via a project-wide formatter and linter (tool selection finalized during Phase 1 setup, applied consistently thereafter).
- No manually inconsistent formatting is committed — if the formatter disagrees with a manual choice, the formatter wins.
- Line length, quote style, semicolon usage, and indentation are standardized once at setup and never debated per-file afterward.

### Code Organization
- Code is organized **feature-first**, per Phase 0.2 — a feature's components, logic, and (on the backend) routes live together under that feature's folder, not scattered across technical-type folders.
- Shared logic used by more than one feature is promoted to `shared/`, `frontend/components/`, `frontend/hooks/`, or `backend/core/` as appropriate — never duplicated across features.
- No file should mix unrelated responsibilities (e.g. a single file should not contain both API-calling logic and unrelated UI rendering logic).

### Error Handling Philosophy
- Errors are handled explicitly, never silently swallowed.
- User-facing errors are translated into clear, Points-economy-appropriate language (e.g. "Not enough Points" rather than a raw stack trace).
- Backend errors are logged with enough context to debug without exposing sensitive internals to the client.
- Every API boundary (frontend calling backend) assumes the call can fail and handles that case deliberately.

---

# 4. Development Standards

- **Single responsibility:** Every module, component, service, and function does one clearly nameable thing.
- **Reusable components:** UI elements used in more than one place are built once, in the appropriate shared location (per Phase 0.2), and reused — never copy-pasted.
- **Feature-first architecture:** Organization follows product features (Markets, Portfolio, Leaderboard, etc.), matching Phase 0.2's folder structure exactly — no reversion to purely technical-type organization (e.g. no global `all-components/` dumping ground).
- **No duplicated code:** If logic is needed in two places, it is extracted and shared, not duplicated.
- **Strict typing:** TypeScript's strict mode is enabled project-wide. `any` is avoided except in rare, explicitly justified cases. All API boundaries (frontend↔backend, backend↔database) are fully typed using `shared/types/`.
- **Modular development:** Each phase's module is built so it could, in principle, be understood, tested, and reasoned about independently of unrelated modules.
- **Readable code:** Code is written to be read by the solo developer months later, or by a future AI session with no prior memory — clarity always outweighs brevity or cleverness.
- **Maintainability first:** Every decision defaults toward what's easiest to maintain long-term, not what's fastest to hack together today.
- **Scalability first:** Structures are chosen so that adding new categories, markets, or features later does not require reworking existing code.
- **Production-ready only:** No phase is considered "done" while it contains placeholder logic, TODOs left unresolved, or known broken behavior — per the README's phase-completion philosophy.

---

# 5. Security Standards

- **Environment variables:** All secrets, keys, and environment-specific values live exclusively in environment variables — never hardcoded in source files, never committed to Git.
- **Secrets:** No API keys, database credentials, or Supabase service keys are ever written directly into any file tracked by Git. `.env` files (or equivalents) are excluded from version control at the tooling level.
- **API keys:** Public-safe keys (e.g. Supabase anon key) are clearly distinguished from private/service-role keys. Service-role or elevated-privilege keys are used only in backend contexts, never shipped to the frontend bundle.
- **Authentication:** Handled exclusively through Supabase Auth, per Section 2 — no parallel or custom authentication mechanism is introduced.
- **Authorization:** Every backend endpoint that touches user-specific data (points balance, portfolio, watchlist) verifies that the requesting user is authorized to access that specific data — no endpoint trusts client-supplied identity without server-side verification.
- **Validation:** All input from the client (forms, API payloads) is validated on the backend, regardless of any frontend-side validation already performed. The backend never trusts the frontend.
- **Never expose sensitive values:** No internal error details, stack traces, database structure, or secrets are ever returned in an API response to the client.

---

# 6. Performance Standards

- **Lazy loading:** Non-critical UI (e.g. below-the-fold sections, secondary feature screens) is loaded on demand rather than bundled into the critical initial load, using Next.js's built-in support for this.
- **Code splitting:** Feature modules are split so that a user browsing Markets does not need to download code for Leaderboard, Portfolio, or Admin until those areas are visited, leveraging Next.js's automatic route-based splitting.
- **Caching philosophy:** Data that changes infrequently (e.g. category lists) is cached more aggressively than data that changes constantly (e.g. live trending market prices). Caching strategy is decided per data type when that feature's phase is implemented, but the general philosophy — cache what's stable, refresh what's live — is locked here.
- **Image optimization:** All images (mascot art, category icons, user-uploaded content) are served through Next.js's image optimization pipeline rather than as raw unoptimized files.
- **Bundle optimization:** Dependencies are chosen deliberately and audited for size; unused libraries are not left in the dependency tree.
- **Database optimization philosophy:** Queries are designed around known access patterns (e.g. "get trending markets sorted by volume") from the start, with indexing considered as soon as a given query pattern is introduced — not retrofitted only after performance problems appear.

---

# 7. Git Standards

- **Commit message format:** Conventional commit style, consistent with the README:
  - `feat:` new feature
  - `fix:` bug fix
  - `refactor:` internal restructuring, no behavior change
  - `style:` formatting/visual-only changes that do not alter the approved design
  - `docs:` documentation updates
  - `chore:` tooling, config, or dependency changes
  - Example: `feat(markets): add category filter to markets list`
- **Branch naming:** `phase-<number>-<short-description>` (e.g. `phase-1-static-homepage`), matching the README's convention exactly.
- **Merge policy:** A branch is merged into `main` only when its corresponding phase (or a clearly defined unit within a phase) is complete and production-ready, per the README's phase-completion philosophy. `main` should always represent a working state of the project.
- **One feature per commit:** Commits represent single, logical, reviewable units of change — not entire phases bundled into one commit, and not unrelated changes mixed into a single commit.
- **Documentation before implementation:** Per the README's Documentation Standards, each phase's spec document is written and committed (as a `docs:` commit) before implementation commits for that phase begin.

---

# 8. AI Collaboration Rules

Any AI assistant working on this project in any future session must:

1. **Read previous documents first** — `README.md`, `docs/Phase-0.2-Project-Folder-Structure.md`, and this document — before taking any action.
2. **Never redesign the approved prototype** — the homepage prototype remains the exact visual specification, regardless of how a request is phrased.
3. **Never replace or "improve" the technology stack** — the stack locked in Section 2 is final; no substituting frameworks, databases, or services, and no presenting alternative stacks for consideration.
4. **Never generate code for future phases** — only the currently active, explicitly opened phase is worked on.
5. **Only work on the currently active phase** — if asked to jump ahead, flag that the requested work belongs to a later phase rather than proceeding silently.
6. **Never silently change architecture** — any suggested deviation from the folder structure (Phase 0.2) or this technology/standards document must be explicitly proposed and confirmed by the project owner, then documented as a formal amendment, never applied quietly.

---

# 9. Out of Scope for Phase 0.3

This document defines technology and standards only. It explicitly does **not** define or produce:

- No UI
- No Components
- No APIs
- No Database Schema
- No Authentication Flow
- No Backend Logic
- No Frontend Logic
- No Routing
- No Pages
- No Code of any kind

Any of the above will be introduced only in their designated future phase (starting with Phase 1), and only by extending — never contradicting — this document.

---

# 10. Completion Criteria

Phase 0.3 is considered complete when:

1. This document exists at `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md` and is committed with a `docs:` commit, per Git Standards.
2. Every layer listed in Section 1 has exactly one locked technology assigned in Section 2, with no ambiguity or open alternatives remaining.
3. Coding, Development, Security, Performance, and Git standards are fully defined and require no further clarification before Phase 1 begins.
4. The document contains no application code, configuration files, schema, or folder-structure changes — it is documentation only.
5. The document has been reviewed and explicitly approved by the project owner as the permanent technical foundation for all subsequent phases.

Once these conditions are met, Phase 0.3 is closed, and Phase 1 (Static Homepage) may begin under the technology and standards locked here.

---

*This document is permanent project documentation. It may only be changed through an explicit, documented amendment approved by the project owner — never silently overridden by a future session, request, or AI assistant.*
