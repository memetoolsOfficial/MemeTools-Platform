# Phase 0.5 — Database Schema Planning

**Phase:** 0.5 — Database Schema Planning
**Type:** Permanent Data Architecture Documentation (No Code)
**Depends On:** `README.md`, `docs/Phase-0.2-Project-Folder-Structure.md`, `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`, `docs/Phase-0.4-Design-System-and-UI-Standards.md`
**Status:** Locked — this document defines the binding conceptual data model for every future backend phase

---

## Purpose of This Document

This document defines the conceptual database model for MemeTools: every core entity, its responsibilities, its relationships, and the rules governing how data is created, updated, preserved, and deleted. It is written entirely in plain language — no SQL, no Prisma schema, no Supabase table definitions, no migrations.

This document exists so that when Phase 3 (Core Data Layer) and every subsequent backend phase are implemented using PostgreSQL and Prisma (per Phase 0.3), the actual schema is a direct, faithful translation of what is defined here — not a set of decisions invented at implementation time.

This document is bound by, and does not contradict, the README's permanent rule that the platform is Points-only. No entity, field, or relationship described here represents real money, fiat currency, cryptocurrency holdings, or blockchain wallet data.

---

# 1. Database Philosophy

### Normalization Philosophy
- Data is modeled in normalized form by default: each fact is stored once, owned by exactly one entity, and referenced (not duplicated) wherever else it's needed.
- Denormalization (e.g. caching a computed leaderboard rank) is only introduced deliberately, for specific performance needs identified in a later phase, and must be documented as an explicit exception when it happens — never applied by default.

### Scalability Philosophy
- Every entity is designed assuming it may eventually hold millions of rows (users, predictions, activity events). Entities are not designed around "how much data exists today" but around "how this entity behaves at scale."
- High-write, high-growth entities (Predictions, Points Transactions, Activity Feed) are conceptually separated from low-write, stable entities (Categories, Users) so that growth in one does not degrade the performance characteristics of another.

### Maintainability Philosophy
- Every entity has one clear owner responsibility (Section 3) so that a developer — or a future AI session — can always determine which entity is authoritative for a given piece of data without ambiguity.
- Naming and structure follow the conventions locked in Phase 0.3 (e.g. snake_case at the database level) so the schema itself reads consistently with the rest of the codebase once implemented.

### Consistency Philosophy
- The Points economy (Section 7) is treated as the most consistency-critical part of the data model — a user's points balance must always be derivable from, and consistent with, their full transaction history. Balance is never treated as the sole source of truth without a supporting transaction ledger.
- Every entity that represents a historical fact (a settled prediction, a completed points transaction, a past leaderboard period) is treated as immutable once finalized — history is preserved, not overwritten, per Section 6.

---

# 2. Core Entities

The following are the core entities required to support the platform's Core Features, as defined in the README:

1. **Users** — core account identity
2. **Profiles** — public-facing user information
3. **Categories** — market groupings (Memecoins, Layer 1 & Majors, Solana Ecosystem, etc.)
4. **Markets** — individual prediction questions
5. **Market Options (Yes / No)** — the two outcomes of a market
6. **Predictions** — a user's placed position on a market
7. **Prediction History** — historical record of a user's resolved predictions
8. **Portfolio** — a user's current holdings/positions summary
9. **Portfolio History** — historical snapshot of portfolio value over time
10. **Watchlist** — markets a user has saved for tracking
11. **Leaderboard** — ranked standing of users, derived from underlying data
12. **Points Balance** — a user's current available Points
13. **Points Transactions** — the immutable ledger of all Points movements
14. **Rewards** — the XP/perks program entities
15. **Achievements** — milestone-based recognitions tied to Rewards
16. **Activity Feed** — global, chronological log of platform-visible actions
17. **Notifications** — user-specific, targeted alerts
18. **Sessions** — active authenticated session records
19. **User Settings** — account-level configuration and preferences
20. **Admin Users** — accounts with elevated platform permissions
21. **Admin Actions** — log of actions taken by Admin Users
22. **System Configuration** — platform-wide configurable values
23. **Audit Logs** — security- and integrity-focused record of sensitive changes
24. **Future Expansion Entities** — placeholder concept for entities not yet needed (see Section 12)

---

# 3. Entity Responsibilities

### Users
- **Purpose:** Represents the core, authoritative identity of an account holder.
- **Responsibilities:** Stores the minimal identity and authentication-linked information needed to uniquely identify a person using the platform.
- **Ownership:** Owns identity only — it does not own display preferences (Profiles) or configuration (User Settings).
- **Lifecycle:** Created at sign-up (Phase 2); may be deactivated but is never silently deleted while dependent historical data (predictions, transactions) exists, per Section 6.
- **Relationships:** One Users record relates to one Profile, one Points Balance, and many Predictions, Sessions, Notifications, and Points Transactions.

### Profiles
- **Purpose:** Represents the public-facing identity of a user (display name, avatar, public stats).
- **Responsibilities:** Owns everything about a user that is shown to other users (e.g. on the Leaderboard or Activity Feed).
- **Ownership:** Owns display/public data only; does not own authentication data (Users) or private settings (User Settings).
- **Lifecycle:** Created alongside the User record at sign-up; updated whenever a user edits their public profile (Phase 10).
- **Relationships:** One-to-one with Users.

### Categories
- **Purpose:** Represents a grouping of markets by theme (Memecoins, Layer 1 & Majors, Solana Ecosystem, Crypto Events, New Launches, AI & Agents, etc.), matching the sidebar structure defined in Phase 0.4.
- **Responsibilities:** Owns category metadata (name, icon reference, active/"Soon" status, display order).
- **Ownership:** Owns category identity only; does not own individual market data.
- **Lifecycle:** Created by an Admin User (Phase 4/10 Admin); rarely deleted, since Markets depend on Categories existing.
- **Relationships:** One Category relates to many Markets.

### Markets
- **Purpose:** Represents a single prediction question (e.g. "Will DOGE reach $1.00 in 2024?").
- **Responsibilities:** Owns the market's question text, category association, volume, current pricing (Yes/No percentages), and lifecycle status (open, closed, settled).
- **Ownership:** Owns market-level facts only; does not own individual user predictions.
- **Lifecycle:** Created (by an Admin or an automated process), remains open for predictions, closes at a defined time, and is eventually settled (see Section 8).
- **Relationships:** One Market belongs to one Category, has two Market Options (Yes/No), and relates to many Predictions.

### Market Options (Yes / No)
- **Purpose:** Represents the two possible outcomes of a binary market, matching the Yes/No pill pattern defined in Phase 0.4.
- **Responsibilities:** Owns the current price/percentage for that specific outcome and, after settlement, whether that outcome was the winning one.
- **Ownership:** Owns per-outcome pricing only; does not own the market's overall metadata (that belongs to Markets).
- **Lifecycle:** Created alongside its parent Market; updated continuously while the market is open; finalized at settlement.
- **Relationships:** Each Market Option belongs to exactly one Market; each Prediction references exactly one Market Option.

### Predictions
- **Purpose:** Represents a single user's placed position on a market (e.g. "User X predicted Yes on Market Y using Z Points").
- **Responsibilities:** Owns the amount of Points committed, the chosen Market Option, and the prediction's current status (active, settled-won, settled-lost).
- **Ownership:** Owns the fact that a specific user took a specific position — it does not own the user's overall portfolio summary (that belongs to Portfolio).
- **Lifecycle:** Created when a user places a prediction (Phase 5); transitions to a resolved state when its Market settles; never deleted once created (see Section 6).
- **Relationships:** Belongs to one User, one Market, and one Market Option; contributes to Prediction History once resolved.

### Prediction History
- **Purpose:** Represents the durable, queryable historical record of a user's resolved predictions.
- **Responsibilities:** Owns the long-term record used to compute past performance, accuracy, and portfolio history.
- **Ownership:** Owns historical/resolved prediction facts; does not own currently active predictions (that remains part of Predictions until resolution).
- **Lifecycle:** Populated at the moment a Prediction resolves; immutable thereafter.
- **Relationships:** Derived from, and linked to, the originating Prediction and its User.

### Portfolio
- **Purpose:** Represents a user's current, at-a-glance summary of active positions and overall standing.
- **Responsibilities:** Owns the aggregated, current-state view (e.g. total Points currently committed to active predictions, current unrealized standing).
- **Ownership:** Owns the current summary only; does not own the underlying individual predictions (Predictions) or historical snapshots (Portfolio History).
- **Lifecycle:** Continuously derived/updated as a user's Predictions change state.
- **Relationships:** One-to-one with Users; conceptually derived from a user's Predictions.

### Portfolio History
- **Purpose:** Represents point-in-time snapshots of a user's portfolio value over time, enabling trend visualization.
- **Responsibilities:** Owns historical snapshots only.
- **Ownership:** Owns time-series portfolio data; does not own the current live Portfolio state.
- **Lifecycle:** New snapshot entries are added over time (e.g. daily); existing entries are never modified.
- **Relationships:** Many Portfolio History entries belong to one User.

### Watchlist
- **Purpose:** Represents the set of markets a user has chosen to track, matching the star icon defined in Phase 0.4.
- **Responsibilities:** Owns the user-to-market "saved" relationship only.
- **Ownership:** Owns the save/unsave relationship; does not own market data itself.
- **Lifecycle:** Entries are created when a user saves a market and removed when they unsave it (a rare legitimate hard-delete case, see Section 6).
- **Relationships:** Many-to-many between Users and Markets.

### Leaderboard
- **Purpose:** Represents the ranked standing of users based on performance.
- **Responsibilities:** Owns the ranking logic's output — who is ranked where, for a given period or overall.
- **Ownership:** Owns computed ranking data; does not own the underlying performance facts (those live in Prediction History and Points Transactions).
- **Lifecycle:** Recalculated on a defined cadence (e.g. periodically) rather than updated on every single event, for performance reasons (see Section 11).
- **Relationships:** Derived from Users, Prediction History, and Points Transactions.

### Points Balance
- **Purpose:** Represents a user's current, spendable amount of Points.
- **Responsibilities:** Owns the single current balance value for a user.
- **Ownership:** Owns the current-state number only; the authoritative history behind that number belongs to Points Transactions (Section 7).
- **Lifecycle:** Updated every time a relevant Points Transaction occurs; must always remain mathematically consistent with the transaction ledger.
- **Relationships:** One-to-one with Users.

### Points Transactions
- **Purpose:** Represents the immutable, append-only ledger of every Points movement (earned, spent, awarded, refunded).
- **Responsibilities:** Owns the historical truth of how a user's Points Balance arrived at its current value.
- **Ownership:** Owns transaction history; never owns the "current balance" convenience value directly (that's a derived/cached figure in Points Balance).
- **Lifecycle:** Append-only — entries are created and never modified or deleted.
- **Relationships:** Many Points Transactions belong to one User; individual transactions may reference a related Prediction, Reward, or Admin Action as their cause.

### Rewards
- **Purpose:** Represents the XP/perks program described in the README's Core Features.
- **Responsibilities:** Owns the definitions of available rewards/perks and a user's progress/XP toward them.
- **Ownership:** Owns reward program logic and state; does not own the Points Transactions caused by claiming a reward (those live in Points Transactions).
- **Lifecycle:** Reward definitions are created by Admins; user progress accumulates over time; claimed rewards are recorded permanently.
- **Relationships:** Many Rewards relate to many Users through a join concept tracking progress/claims (see Section 4).

### Achievements
- **Purpose:** Represents specific milestone recognitions (e.g. "First Prediction," "10 Correct Predictions in a Row") tied to the Rewards program.
- **Responsibilities:** Owns achievement definitions and which users have earned them.
- **Ownership:** Owns milestone-tracking data; does not own the general XP/perk logic that isn't milestone-specific.
- **Lifecycle:** Definitions created by Admins; earned status is permanent once achieved.
- **Relationships:** Many-to-many between Users and Achievement definitions.

### Activity Feed
- **Purpose:** Represents the global, chronological log of platform-visible actions (market creation, predictions placed), matching the Recent Activity widget in Phase 0.4.
- **Responsibilities:** Owns the public, time-ordered record of notable platform events.
- **Ownership:** Owns the feed entries themselves; does not own the underlying entities being referenced (e.g. it references a Prediction, it doesn't own it).
- **Lifecycle:** Append-only; older entries may eventually be archived (not deleted) for performance reasons at very large scale.
- **Relationships:** Each Activity Feed entry references a User and typically a Market or Prediction.

### Notifications
- **Purpose:** Represents user-specific, targeted alerts (as distinct from the public Activity Feed).
- **Responsibilities:** Owns per-user notification content and read/unread state.
- **Ownership:** Owns individual delivery/read state; does not own the underlying event that triggered the notification.
- **Lifecycle:** Created when a relevant event occurs for a specific user; may be marked read or eventually archived.
- **Relationships:** Many Notifications belong to one User.

### Sessions
- **Purpose:** Represents an active authenticated session for a user, in coordination with Supabase Auth (per Phase 0.3).
- **Responsibilities:** Owns session-level metadata needed to maintain and validate a logged-in state.
- **Ownership:** Owns session facts only; identity itself remains owned by Users.
- **Lifecycle:** Created at login, expired/invalidated at logout or timeout.
- **Relationships:** Many Sessions belong to one User.

### User Settings
- **Purpose:** Represents account-level configuration and preferences (e.g. notification preferences).
- **Responsibilities:** Owns configurable, non-public account behavior.
- **Ownership:** Owns settings/preferences only; does not own public profile data (Profiles).
- **Lifecycle:** Created with sensible defaults at sign-up; updated whenever a user changes a preference.
- **Relationships:** One-to-one with Users.

### Admin Users
- **Purpose:** Represents accounts with elevated platform permissions.
- **Responsibilities:** Owns the fact that a given account has administrative capability, and at what level.
- **Ownership:** Owns admin-permission status only; an Admin User is still fundamentally a User (see Section 4 for relationship modeling).
- **Lifecycle:** Granted deliberately by existing administrators; revoked when no longer appropriate.
- **Relationships:** One-to-one (or one-to-zero) extension of a Users record.

### Admin Actions
- **Purpose:** Represents a record of actions taken by an Admin User (e.g. creating a Market, editing a Category, moderating content).
- **Responsibilities:** Owns the historical record of administrative activity.
- **Ownership:** Owns the "who did what, when" fact; does not own the resulting changed entity's current state.
- **Lifecycle:** Append-only.
- **Relationships:** Many Admin Actions belong to one Admin User; each references the entity that was acted upon.

### System Configuration
- **Purpose:** Represents platform-wide configurable values that affect behavior globally (e.g. default starting Points balance for new users, minimum prediction amount).
- **Responsibilities:** Owns global, non-user-specific configuration values.
- **Ownership:** Owns platform-level settings only; never owns any individual user's data.
- **Lifecycle:** Rarely changes; changes are typically made only by Admin Users and recorded in Admin Actions.
- **Relationships:** Referenced conceptually by many other entities' default behaviors, without being directly linked via foreign keys in most cases.

### Audit Logs
- **Purpose:** Represents a security- and integrity-focused record of sensitive changes across the platform (distinct from general Admin Actions, which are more product-facing).
- **Responsibilities:** Owns a tamper-evident trail of sensitive operations (e.g. changes to Points Balances outside normal transaction flow, permission changes).
- **Ownership:** Owns the security-relevant history; does not own the business-facing "what happened" story (that's Activity Feed/Admin Actions).
- **Lifecycle:** Append-only, retained long-term.
- **Relationships:** References the User/Admin User who performed the action and the entity affected.

### Future Expansion Entities
- **Purpose:** A conceptual placeholder acknowledging that additional entities (e.g. entities supporting new categories, social features, or the future Admin module's deeper needs) will be added in later phases.
- **Responsibilities:** None yet — this exists only to confirm that new entities are expected and must follow this document's philosophy (Section 1) and process (Section 10 of Phase 0.3's AI Collaboration Rules) when introduced.
- **Lifecycle:** N/A until a specific future phase defines a specific new entity.
- **Relationships:** N/A until defined.

---

# 4. Relationships

### One-to-One
- **Users ↔ Profiles** — every user has exactly one public profile.
- **Users ↔ Points Balance** — every user has exactly one current balance.
- **Users ↔ Portfolio** — every user has exactly one current portfolio summary.
- **Users ↔ User Settings** — every user has exactly one settings record.
- **Users ↔ Admin Users** — a user either has zero or one admin-permission record extending their identity.

### One-to-Many
- **Categories → Markets** — one category contains many markets.
- **Markets → Market Options** — one market has exactly two options (conceptually a fixed one-to-many, always exactly two: Yes and No).
- **Markets → Predictions** — one market receives many predictions from many users.
- **Users → Predictions** — one user places many predictions over time.
- **Users → Prediction History** — one user accumulates many historical resolved predictions.
- **Users → Portfolio History** — one user accumulates many historical portfolio snapshots.
- **Users → Points Transactions** — one user accumulates many ledger entries over time.
- **Users → Sessions** — one user may have many active/past sessions.
- **Users → Notifications** — one user receives many notifications.
- **Admin Users → Admin Actions** — one admin performs many actions over time.

### Many-to-Many
- **Users ↔ Markets (via Watchlist)** — many users can watch many markets, and a market can be watched by many users.
- **Users ↔ Achievements** — many users can earn many achievements, and each achievement can be earned by many users (tracked via a join concept capturing when it was earned).
- **Users ↔ Rewards** — many users can progress toward/claim many rewards, and each reward can be claimed by many users (tracked via a join concept capturing progress and claim status).

Every many-to-many relationship above is understood to be implemented, at schema time, through a join/associative entity (e.g. a "Watchlist Entry" concept connecting a specific User and a specific Market) — this document defines the relationship conceptually; the exact join-table naming is decided during implementation, consistent with the naming conventions in Phase 0.3.

---

# 5. Data Ownership

To prevent duplicated or ambiguous ownership, the following ownership boundaries are permanent:

- **Identity vs. Presentation:** Users owns identity; Profiles owns presentation. No display-only field (avatar, bio) is ever stored on Users.
- **Current State vs. History:** Points Balance and Portfolio own current-state summaries; Points Transactions, Prediction History, and Portfolio History own the historical record those summaries are derived from. A current-state value is always a derivable projection of its historical ledger — never an independently editable number.
- **Market Facts vs. User Positions:** Markets and Market Options own the facts about a question and its pricing; Predictions owns the fact that a specific user took a specific position. A market's aggregate volume/pricing is derived from its Predictions, not stored as a separately editable truth disconnected from them.
- **Public Activity vs. Private Notification:** Activity Feed owns the public, platform-wide narrative; Notifications owns what a specific user is privately alerted about. The same underlying event may produce one Activity Feed entry and multiple Notifications, but these are distinct entities with distinct ownership.
- **Product-Facing Admin History vs. Security-Facing History:** Admin Actions owns the general "what did an admin do" story used for product/moderation purposes; Audit Logs owns the stricter, security-focused trail. They may reference the same underlying event but serve different purposes and are never merged into a single entity.
- **Global Configuration vs. User Configuration:** System Configuration owns platform-wide defaults; User Settings owns individual user preferences. A user's setting always overrides the platform default for that user, never the reverse.

---

# 6. Deletion Rules

### Soft Delete Philosophy
- Entities that represent something another user may reference or that carry historical importance (Users, Markets, Predictions, Points Transactions, Prediction History, Portfolio History, Admin Actions, Audit Logs) are **never hard-deleted**. They are soft-deleted (marked inactive/deactivated) when a user or admin requests removal, preserving the underlying historical record.
- A soft-deleted User, for example, disappears from public-facing surfaces (Leaderboard, Activity Feed attribution) but their historical Predictions and Points Transactions remain intact for integrity and, where relevant, for other users' historical context (e.g. a settled market's history should remain accurate even if a participant later deactivates their account).

### Hard Delete Philosophy
- Hard deletes are reserved for genuinely ephemeral, non-historical data with no downstream integrity implications: **Watchlist** entries (unsaving a market), **Sessions** (expired sessions), and **Notifications** (once read and past a retention window, at the platform's discretion).
- Nothing that participates in the Points ledger, prediction history, or admin/audit trail is ever hard-deleted.

### Cascade Rules
- Deleting (soft-deleting) a **User** cascades to soft-deleting their **Sessions** and marking their **Profile** as inactive, but does **not** cascade to deleting their **Predictions**, **Points Transactions**, or **Prediction History** — those remain for platform integrity.
- Deleting (retiring) a **Market** cascades to closing its **Market Options** and finalizing associated **Predictions** through the normal settlement flow (Section 8) — a market is never simply removed once it has received predictions; it is settled or formally voided through a documented process.
- Removing a **Category** is only possible once it has no active **Markets** referencing it, preventing orphaned markets.

### Historical Preservation
- Every entity identified in Section 5 as a "history" entity (Prediction History, Portfolio History, Points Transactions, Admin Actions, Audit Logs) is treated as permanent and immutable once written, regardless of what happens to related current-state entities later.

---

# 7. Points Economy Data Model

- **Points Balance** stores a single current value per user, representing Points currently available to spend.
- **Points Earned** is represented as individual, positive-direction entries within Points Transactions (e.g. reward claim, prediction win payout, sign-up bonus) — never as a separate running total disconnected from the ledger.
- **Points Spent** is represented as individual, negative-direction entries within Points Transactions (e.g. placing a prediction) — same ledger, opposite direction.
- **Points History** is the full, immutable Points Transactions ledger for a user — the definitive source of truth for "how did this user get to their current balance."
- **Reward History** is captured through Points Transactions entries that reference their originating Reward/Achievement, so a user's reward-driven Points can always be traced back to the specific reward that granted them.
- **Leaderboard Calculations** are derived from aggregating Points Transactions and/or Prediction History over a given period — the Leaderboard entity stores the computed result, not an independently maintained score.
- **Portfolio Calculations** are derived from a user's currently active Predictions (committed Points, potential payout) combined with their Points Balance — again, Portfolio is a computed summary, not an independent source of truth.
- **No real-money fields exist anywhere in this model** — there is no currency code, no fiat amount, no wallet address, and no payment-processor reference anywhere in the Points Economy data model, consistent with the README's permanent rule.

---

# 8. Prediction Data Model

### Market Lifecycle
1. **Draft/Created** — a market is defined (question, category, options) but not yet open.
2. **Open** — the market accepts Predictions; pricing (Yes/No percentages) updates as Predictions are placed.
3. **Closed** — the market no longer accepts new Predictions but has not yet been resolved (e.g. the underlying real-world event hasn't concluded).
4. **Settled** — the market's outcome is finalized; all associated Predictions transition to their resolved state.

### Prediction Lifecycle
1. **Placed/Active** — a user commits Points to a chosen Market Option while the Market is Open.
2. **Locked** — once the Market closes, active Predictions become locked (no longer editable/cancelable) pending settlement.
3. **Resolved (Won/Lost)** — once the Market settles, each Prediction transitions to a final resolved state, triggering a corresponding Points Transaction (payout for a win, no payout for a loss) and a Prediction History entry.

### Prediction Result Lifecycle
- A resolved Prediction's outcome is permanent and immutable — it is never recalculated or reversed after settlement except through a formally documented correction process (e.g. an Admin Action responding to a data error), which itself would be recorded in Admin Actions and Audit Logs.

### Settlement Philosophy
- Settlement is treated as a single, authoritative event per Market: once a Market is settled, its outcome and all dependent Predictions are finalized together, ensuring the Points economy never has a market "partially" resolved.
- Settlement always produces a fully traceable set of Points Transactions — for every Points movement caused by settlement, there is a corresponding ledger entry referencing the Prediction and Market that caused it.

### History Preservation
- Every Prediction, once resolved, produces a permanent Prediction History entry — this is what powers a user's long-term accuracy statistics, Portfolio History, and Leaderboard standing over time.

---

# 9. User Data Model

- **Profile:** Public-facing identity (display name, avatar reference, public stats) — owned entirely by the Profiles entity (Section 3).
- **Settings:** Account-level configuration (e.g. notification preferences, display preferences) — owned by User Settings.
- **Preferences:** Conceptually part of User Settings; not modeled as a separate entity to avoid ownership ambiguity.
- **Sessions:** Active authentication sessions — owned by Sessions, coordinated with Supabase Auth per Phase 0.3.
- **Watchlist:** Saved markets — owned by the Watchlist many-to-many relationship (Section 4).
- **Portfolio:** Current holdings summary — owned by Portfolio, derived from active Predictions.
- **History:** Historical predictions and portfolio snapshots — owned by Prediction History and Portfolio History respectively.
- **Notifications:** Targeted alerts — owned by Notifications, distinct from the public Activity Feed.

Together, these entities give every future phase (Profile in Phase 10, Portfolio in Phase 7, Watchlist in Phase 9, etc.) a pre-defined, unambiguous data owner to build against.

---

# 10. Admin Data Model

- **Admin Permissions:** Represented by the Admin Users entity, which extends a normal User identity with elevated capability — an admin is still a user first, with additional permission data layered on top, not a wholly separate identity system.
- **Admin Activity:** Represented by Admin Actions — every meaningful administrative action (creating a Market, editing a Category, moderating content) is logged here.
- **Market Management:** Admin Users create and manage Markets and Market Options; every such action is captured in Admin Actions.
- **Category Management:** Admin Users create and manage Categories (including toggling "Active"/"Soon" status, per Phase 0.4's design system); logged in Admin Actions.
- **Moderation Logs:** Any moderation-specific action (e.g. removing inappropriate content, if introduced in a future phase) is a specialized type of Admin Action, sharing the same underlying entity rather than introducing a separate moderation-only log.
- **Audit Logs:** Reserved specifically for security- and integrity-sensitive operations (e.g. manual Points Balance corrections, permission grants/revocations) — a stricter, more tamper-evident record than the general-purpose Admin Actions log, as defined in Section 3.

---

# 11. Indexing Philosophy

Described conceptually, without SQL:

- **Primary identifiers:** Every core entity (Users, Markets, Predictions, etc.) has a single, stable, unique primary identifier that never changes for the lifetime of the record, and that all relationships reference.
- **Unique fields:** Fields that must be globally unique (e.g. a user's email/auth identifier, a category's name) are treated as requiring uniqueness enforcement at the database level, not just at the application level.
- **Searchable fields:** Fields users will search or filter by directly (market question text for the search bar, category name, username) are identified as needing efficient lookup support, since the prototype's search bar and category filters (Phase 0.4) depend on fast text/field matching.
- **Sorting philosophy:** Fields used to sort large lists — market volume and recency for Trending Markets, points/performance for Leaderboard, timestamp for Activity Feed and Notifications — are identified as needing efficient sort support, since these are core, high-traffic views of the product.
- **Performance considerations:** High-write entities (Points Transactions, Predictions, Activity Feed) are designed with the expectation that they will be queried primarily by recency and by user/market association — these are the two access patterns that must remain fast as these tables grow into the millions of rows.

---

# 12. Future Scalability

- **Millions of users:** The Users/Profiles/Points Balance split ensures that the frequently-read, small identity/summary records stay lean, while less frequently accessed detail can grow independently.
- **Millions of predictions:** Predictions and Prediction History are designed as high-volume, append-heavy entities from the start, always queried by clear access patterns (by user, by market, by recency) rather than requiring broad scans.
- **Large activity feeds:** Activity Feed is explicitly expected to grow very large; its philosophy of being queried by recency (and eventually archived rather than deleted) is designed in from the start rather than retrofitted.
- **Growing leaderboard:** Leaderboard is treated as a computed, periodically-refreshed projection rather than a live-updated-on-every-event entity, specifically so that leaderboard computation cost doesn't scale linearly with every single prediction placed platform-wide.
- **Additional crypto categories:** Because Categories and Markets are already normalized and decoupled from any specific category's data, adding new categories (e.g. new blockchain ecosystems) requires no structural change — only new Category rows.
- **Future platform expansion:** The Future Expansion Entities placeholder (Section 2) and the general ownership/relationship philosophy in this document (Sections 1, 5) ensure that new entities introduced later (e.g. supporting an Admin dashboard's deeper needs, or new social features) can be added without restructuring existing entities — they simply reference existing entities (typically Users or Markets) the same way every other entity here already does.

---

# 13. Out of Scope for Phase 0.5

This document defines the conceptual data model only, in written form. It explicitly does **not** define or produce:

- No SQL
- No Prisma schema
- No Supabase schema
- No Database code
- No Backend code
- No API code
- No Queries
- No Migrations
- No Triggers
- No Functions

Any of the above will be introduced only in their designated future phase (starting with Phase 3, Core Data Layer), implemented using PostgreSQL and Prisma as locked in Phase 0.3, and must faithfully implement — never contradict — the entities, relationships, and rules defined in this document.

---

# 14. Completion Criteria

Phase 0.5 is considered complete when:

1. This document exists at `docs/Phase-0.5-Database-Schema-Planning.md` and is committed with a `docs:` commit, per the Git Standards in Phase 0.3.
2. Every core entity listed in Section 2 has a fully written responsibility, ownership, lifecycle, and relationship description in Section 3.
3. All relationships between entities are explicitly documented in Section 4, with no ambiguous or undefined connections between core entities.
4. Data ownership boundaries (Section 5) leave no entity with unclear or overlapping authority over the same fact.
5. Deletion rules (Section 6), the Points Economy model (Section 7), and the Prediction lifecycle (Section 8) are specific enough that Phase 3 can translate them directly into a Prisma schema without inventing new rules.
6. The document contains no SQL, schema code, or implementation of any kind.
7. The document has been reviewed and explicitly approved by the project owner as the permanent database blueprint for all subsequent backend phases.

Once these conditions are met, Phase 0.5 is closed. Actual schema implementation begins only in Phase 3 (Core Data Layer), and must faithfully translate this document into Prisma models using the technology locked in Phase 0.3.

---

*This document is permanent project documentation. It may only be changed through an explicit, documented amendment approved by the project owner — never silently overridden or reinterpreted by a future session, request, or AI assistant.*

