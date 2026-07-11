# MemeTools — Master Project README

**Status:** Foundational Blueprint — Phase 1 (Initialization) Complete
**Type:** Full-Scale Web Application (Points-Based Prediction Market Platform)
**Owner / Solo Developer:** You
**Role of This Document:** Master blueprint and single source of truth for all current and future development sessions, phases, and decisions.

---

# Project Overview

MemeTools is a full-scale, multi-user, account-based web application built around a **virtual Points economy**. Users create accounts, browse prediction markets across categories like memecoins, Layer 1 protocols, Solana ecosystem tokens, and general crypto events, place predictions using Points, track their standing on a leaderboard, and manage a personal portfolio and watchlist.

This is **not** a landing page or marketing site — it is a real application with persistent accounts, ongoing state, and long-term data (points balances, prediction history, rankings).

A prototype image of the homepage has been provided. It was designed by the project owner and is treated as the **official visual specification** for the platform — not a rough draft, inspiration board, or placeholder. Every future UI decision must remain faithful to it unless the project owner explicitly instructs otherwise.

This project will be developed alone, across many separate sessions, over an extended period of time. This README exists so that every session — regardless of when it happens or who/what assists with it — starts from the same shared understanding of the product.

---

# Vision

To build a premium, trustworthy, highly polished prediction platform that feels like a funded fintech/trading product in terms of quality and UX — while remaining entirely risk-free, using Points instead of real money, and built incrementally and sustainably by a single developer.

---

# Goals

- Deliver a genuinely production-ready application, not a prototype or MVP that stays unfinished.
- Preserve 100% fidelity to the approved homepage prototype throughout development.
- Build strictly in phases, with each phase fully modular and production-ready before the next begins.
- Keep the codebase clean, scalable, and understandable enough that any future session (human or AI-assisted) can resume work without ambiguity.
- Guarantee the platform never introduces real currency, fiat, or cryptocurrency trading — Points remain the only unit of value, permanently.
- Avoid scope creep — nothing is built unless it is part of the approved design or an explicitly requested feature.

---

# Scope

**In scope:**
- User accounts: sign up, login, sessions, profile management
- Home Dashboard matching the approved prototype
- Markets, browsable and searchable, organized by Category
- Prediction mechanics using Points (Yes/No style, per the prototype)
- Portfolio (user's positions, history, points balance)
- Watchlist (saved markets)
- Leaderboard (ranked users)
- Recent Activity feed (global live feed of platform events)
- Rewards/XP system (as shown in the prototype)

**Out of scope (permanently, or until explicitly revisited by the project owner):**
- Any real-money functionality (fiat, Euro, or otherwise)
- Any actual cryptocurrency trading, wallet integration, or blockchain transactions
- Any feature, page, or UI element not present in the prototype or not explicitly requested
- Any redesign or simplification of the approved UI
- Speculative infrastructure or features not tied to a currently active phase

---

# Core Features

1. **Authentication** — Sign up, log in, log out, session management
2. **Home Dashboard** — Hero section, trending markets, category shortcuts, trending sidebar, recent activity, platform stats bar
3. **Markets** — Full browsable list, searchable, filterable (Top / New / by category)
4. **Categories** — Memecoins, Layer 1 & Majors, Solana Ecosystem, Crypto Events, New Launches, AI & Agents, plus additional categories marked "Soon"
5. **Market Detail View** — Individual market page with Yes/No pricing and prediction placement (fully specified in its own future phase)
6. **Portfolio** — Points balance, active/past predictions, performance history
7. **Watchlist** — User-saved markets for quick access
8. **Leaderboard** — Ranked list of users by points/performance
9. **Recent Activity** — Live global feed of platform actions
10. **User Profile** — Account info, stats, settings
11. **Rewards Program** — Points-based XP and perks system

---

# Non Goals

To avoid ambiguity in any future session, the following are explicitly **not** goals of this project, at any phase:

- This is **not** a real-money trading platform.
- This is **not** a cryptocurrency exchange, wallet, or DeFi product.
- This is **not** a platform where Points can be purchased, withdrawn, or converted to real currency.
- This is **not** a redesign exercise — improving on or reinterpreting the prototype's visual design is not a goal.
- This is **not** a "move fast and figure it out later" project — undocumented, ad hoc architecture decisions are not acceptable.
- This is **not** a single-session build — no phase should assume it needs to "finish everything now."

---

# Design Philosophy

- **The prototype is the specification, not a suggestion.** Implementation should match it as closely as technically possible.
- **Preserve exactly:**
  - Dark color palette with purple/violet accents, and green/red semantic colors for Yes/No and positive/negative movement
  - Layout structure: top navbar, left sidebar with categories, central content area, right sidebar (Trending Now / Recent Activity)
  - Hero section content, imagery, and call-to-action structure
  - Market card/row structure (icon, title, category tag, volume, Yes/No price pills, watchlist star)
  - Typography scale and spacing rhythm
  - Bottom platform statistics bar
  - Overall premium, data-dense, trading-platform aesthetic
- **No unrequested creative deviation.** Any new screen built in a later phase must extend the existing visual language (same cards, spacing, and color system) rather than introducing new patterns.
- Categories marked "Soon" remain visually present but inactive until their phase arrives.

---

# Development Philosophy

- **One developer, many sessions, one continuous plan.** This document exists to make that possible without losing context between sessions.
- **Strict phase discipline.** One phase is completed and made production-ready before the next phase begins. No jumping ahead, no partial parallel work across phases.
- **No speculative engineering.** Nothing is built "just in case" — only what the current phase requires.
- **Explicit over assumed.** Any decision that matters gets written down, either here or in a phase-specific document, rather than left as unstated context.
- **Clean, modular, scalable architecture** is prioritized over shortcuts, even though the project is solo — it must remain maintainable by one person over a long timeline.
- **Stability over speed.** A smaller feature set that works completely is preferred over a larger one that's half-finished.

---

# High-Level Folder Structure

> Conceptual overview here; the full, detailed architecture is locked in `docs/Phase-0.2-Project-Folder-Structure.md` and has since been implemented in Phase 1.

```
memetools/
├── docs/               # Documentation: phase specs, architecture decisions, changelogs
├── frontend/           # Frontend application (Next.js)
├── backend/            # Backend application / API (NestJS)
├── shared/             # Shared types, constants, and logic
├── assets/             # Raw source design assets (prototype, logo, iconography)
└── README.md           # This file — the master blueprint
```

---

# Development Roadmap

> High-level overview only. Full detail is locked in `docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md`. Order may be adjusted by the project owner, but phases are always executed one at a time, each fully completed before the next starts.

| Phase | Focus |
|-------|-------|
| 0 | Foundational documentation (README + standards, Phases 0.2–0.7) |
| 1 | Project initialization and static homepage, matching the prototype exactly |
| 2 | Authentication (sign up, login, sessions) |
| 3 | Core data layer (users, points balances, markets — schema & backend foundations) |
| 4 | Markets & Categories (browsing, filtering, search) |
| 5 | Market Detail & prediction placement using Points |
| 6 | Dashboard wiring (live trending markets, recent activity, sidebar data) |
| 7 | Portfolio |
| 8 | Leaderboard |
| 9 | Watchlist |
| 10 | User Profile & account settings |
| 11 | Rewards / XP Program |
| 12 | Final polish, QA, performance, accessibility, production hardening |

---

# Coding Standards

Fully locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`. Summary:

- Favor clean, self-documenting code over clever or overly compressed code.
- Every module should have a single, clear responsibility and be independently testable.
- No dead code and no commented-out blocks left in production files.
- Consistent formatting enforced by linting/formatting tools.
- All code paths that can fail must handle errors explicitly — no silent failures.
- No hardcoded "magic values" for product logic — use named constants or enums.
- Prefer small, composable modules/components over large monolithic ones.

---

# Naming Conventions

Fully locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`. Summary:

- **Files & folders:** kebab-case (e.g. `market-card.tsx`, `user-profile/`)
- **Components:** PascalCase (e.g. `MarketCard`, `TrendingSidebar`)
- **Variables & functions:** camelCase (e.g. `getUserPoints`, `marketVolume`)
- **Constants & enums:** UPPER_SNAKE_CASE (e.g. `MARKET_STATUS`, `DEFAULT_POINTS_BALANCE`)
- **Database tables/fields:** snake_case (e.g. `user_id`, `market_category`)
- **Branches:** `phase-<number>-<short-description>` (e.g. `phase-2-authentication`)
- Naming must always reflect the Points-only economy — never use terms implying real money.

---

# Git Workflow

Fully locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md` and `docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md`. Summary:

- Commit small, logical, working units of change — never an entire phase in a single commit.
- Conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`.
- Every commit should leave the project in a working state.
- Each completed phase ends with a clearly tagged milestone commit (e.g. `phase-1-complete`).

---

# Documentation Standards

- Every new phase gets its own short **Phase Spec** document before code is written, stored under `/docs`.
- Any deviation from this README (design, scope, or rules) must first be proposed, discussed, and then explicitly documented as an amendment — never silently implemented.
- Any new naming convention, folder addition, or architectural pattern must be recorded so future sessions don't have to guess the standard.
- This README stays high-level and permanent; phase-specific detail lives in its own document.

---

# Getting Started

*(Added as a Phase 1 amendment — see `docs/Phase-1-Initialization.md` for full detail.)*

The codebase was initialized in Phase 1 following the folder structure, technology stack, and standards locked in `docs/Phase-0.2` through `docs/Phase-0.7`. To set up a local development environment:

```bash
pnpm install
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
pnpm dev:frontend   # http://localhost:3000
pnpm dev:backend    # http://localhost:4000 (GET /health to verify)
```

See `docs/Phase-1-Initialization.md` for the complete explanation of what was created, why, and the full development workflow (linting, formatting, type checking, building).

---

# Future AI Collaboration Rules

Fully locked in `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`. If you are an AI assistant joining this project in a future session:

1. This README, and every numbered Phase 0.x / Phase N document under `docs/`, is **binding project context**, not background flavor text.
2. The homepage prototype (`assets/prototypes/homepage-prototype.png`) is the **final, approved design**. Never redesign, restyle, simplify, or creatively reinterpret it.
3. Do not generate code, folder structures, or features for any phase other than the one explicitly active in the current request.
4. The platform is **Points-only, permanently**. Never introduce real currency, fiat symbols, payment processors, or cryptocurrency-trading logic.
5. If any instruction in a session conflicts with existing documentation, surface the conflict explicitly rather than silently prioritizing the newer instruction.
6. Assume you're working with a solo developer maintaining this project long-term — prioritize clarity, modularity, and documentation over speed or cleverness.
7. When scope is unclear, ask, or default to the narrower, already-documented interpretation.

---

# Important Rules That Must Never Be Broken

- The platform never implements real money, fiat currency, or cryptocurrency trading — Points are the only unit of value, in every phase, forever.
- The approved prototype's visual identity is never redesigned or reinterpreted.
- Development always proceeds in strict, sequential phases — never skipped, merged, or built out of order without explicit approval.
- No feature, page, or module is added unless it is part of the approved design or explicitly requested by the project owner.
- This README is never silently overridden — it may only be updated through explicit, documented amendment (as demonstrated by the Getting Started section added in Phase 1).
- Code, naming, and architecture standards defined across the `docs/Phase-0.x` series remain in force across all sessions unless formally revised.

---

*This README is a living master document. It should be updated deliberately and incrementally as the project evolves — never overwritten wholesale or contradicted without explicit, documented revision.*
