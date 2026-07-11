# Phase 0.4 — Design System and UI Standards

**Phase:** 0.4 — Design System and UI Standards
**Type:** Permanent Design Documentation (No Code)
**Depends On:** `README.md`, `docs/Phase-0.2-Project-Folder-Structure.md`, `docs/Phase-0.3-Technology-Stack-and-Development-Standards.md`
**Design Source:** Approved homepage prototype (official visual specification)
**Status:** Locked — this document defines binding visual standards for every current and future page

---

## Purpose of This Document

This document translates the approved homepage prototype into a permanent, written design system. It exists so that every future page, component, and feature — built in any session, by any developer or AI assistant — inherits the exact same visual language already established, without needing to re-derive it from the image each time.

This document does not redesign, modernize, simplify, or reinterpret the prototype in any way. It only **describes, in words, what is already visible in the approved design**, so that description can be implemented consistently later using the locked technology stack (Next.js, TypeScript, Tailwind CSS) from Phase 0.3.

No visual decision in this document may contradict the prototype. Where this document is silent on a detail, the prototype itself remains the final authority once implementation begins.

---

# 1. Design Philosophy

The platform's visual identity, as established by the prototype, is best described as **premium dark-mode trading/analytics aesthetic** — the same visual register as professional crypto data platforms and trading terminals, applied to a gamified, Points-based prediction product.

Core characteristics observed in the approved design:

- **Dark-first, never light-first.** The entire interface is built on a near-black, purple-tinted dark background. There is no light theme in scope.
- **Data-dense but organized.** The homepage presents many simultaneous data points (prices, percentages, volumes, rankings) without feeling cluttered, through consistent card structure and generous internal spacing.
- **Purple/violet as the signature accent.** A single, consistent violet accent color ties together the brand mark, primary actions, active states, and the hero's glowing mascot artwork — this is the platform's visual signature and must never be substituted with a different accent hue.
- **Confidence through restraint.** Visual flourishes are minimal; the premium feeling comes from consistency, spacing, and typographic hierarchy rather than decoration.
- **Trading-platform semantics.** Green and red are used exactly as a trader would expect them — green for "Yes" / positive movement, red for "No" / negative movement — and this convention is never reversed or reinterpreted anywhere in the product.
- **Mascot-driven brand personality.** The glowing flame/spirit mascot character in the hero section is a recurring brand asset and establishes a slightly mysterious, "explore/analyze/conquer" tone, as reflected in the sidebar tagline.

Every future page must feel like it was designed in the same sitting as this homepage.

---

# 2. Color System

Colors below are described as they function in the approved prototype. Representative hex values are provided to lock a consistent, implementable palette; exact values may be fine-tuned only slightly during implementation to match the prototype pixel-for-pixel, never to change the visual intent.

### Background Colors
- **Base app background:** Near-black with a subtle purple/blue undertone (approx. `#0A0912`–`#0C0B16`). Used behind the entire application shell.
- **Hero background:** A deeper, richer purple-to-black radial/gradient treatment (approx. `#1A0F35` fading to the base background), used only within the hero section to create depth behind the mascot artwork.

### Surface / Card Colors
- **Card / surface background:** A slightly lighter dark tone than the base background (approx. `#14121F`–`#171526`), used for all cards: category pills, trending market rows, sidebar promo box, right-rail widgets.
- **Sidebar background:** Matches or very closely matches the base app background, distinguishing itself from content cards through spacing and item states rather than a strongly contrasting fill.
- **Header / navbar background:** Matches the base app background, kept visually seamless with the page rather than styled as a separate floating bar.

### Accent Colors
- **Primary accent (violet/purple):** The signature brand color (approx. `#7C3AED`–`#8B5CF6`), used for: the "Sign Up" button, "Explore Markets" button, active navigation underline/label, the "future" highlight word in the hero headline, category tag icon backgrounds, and the "View all" links.
- **Accent gradient:** A violet-to-lighter-violet or violet-to-white glow effect is used specifically for the hero mascot artwork and the "LIVE" badge dot — reserved for moments of emphasis, not general UI decoration.

### Positive / Negative Semantic Colors
- **Positive (green):** Used exclusively for "Yes" price pills, upward percentage indicators, and positive movement arrows (approx. `#22C55E`–`#16A34A` range). Always paired with an upward arrow or the word "Yes."
- **Negative (red):** Used exclusively for "No" price pills, downward percentage indicators, and negative movement arrows (approx. `#EF4444`–`#DC2626` range). Always paired with a downward arrow or the word "No."
- These two colors are **never used for any other purpose** in the interface — they are reserved permanently for Yes/No and positive/negative semantics so users can trust them at a glance.

### Border Colors
- Borders are subtle, low-contrast dividers (approx. `#242138`–`#2A2740`), used to separate cards from the background without introducing harsh lines — visible mainly as thin outlines around cards, buttons, and input fields, and as row separators in tables/lists.

### Text Colors
- **Primary text (headings, key values):** Near-white (approx. `#F5F5F7`–`#FFFFFF`).
- **Secondary text (labels, category tags, timestamps):** Muted gray-purple (approx. `#8B899C`–`#A0A0B8`), used for supporting information that should recede behind primary content.

### Hover Philosophy
- Interactive elements lighten slightly and/or gain a subtle border/background shift on hover — never a jarring color change, never a shift to an unrelated hue. Hover states communicate "this is interactive" without competing with the semantic green/red system.

### Active State Philosophy
- Active navigation items and active filter tabs (e.g. "Top" in Trending Markets) are indicated using the primary accent color as a filled background or underline, combined with brightened text — active state is always communicated via the accent color, consistently across every tab/filter pattern in the product.

### Disabled State Philosophy
- Disabled or "Coming Soon" elements (e.g. New Launches, AI & Agents categories) remain visible but visually muted — reduced text opacity and a secondary "Soon" label — never hidden entirely, and never using the negative/red color (disabled is not an error state).

---

# 3. Typography

### Font Family Philosophy
- A single, clean, modern sans-serif typeface family is used throughout the entire product — no serif fonts, no decorative display fonts anywhere. The typeface should read as neutral and highly legible at small sizes, since the interface displays a large amount of numeric and tabular data.

### Heading Hierarchy
- **Hero headline ("Predict the future."):** Largest text on the page, bold weight, establishes the top of the visual hierarchy.
- **Section titles ("Trending Markets," "Trending Now," "Recent Activity"):** Clearly smaller than the hero headline, bold weight, consistent size across all section headers site-wide.
- **Card/row titles (market questions, e.g. "Will DOGE reach $1.00 in 2024?"):** Medium weight, sized for quick scanning, consistent across every market row and card.

### Body Text
- Supporting copy (hero subtext, descriptions) uses a regular weight, medium-gray tone, and a comfortably readable size — never competing with headings or numeric data for attention.

### Button Text
- Bold or semi-bold weight, always paired with sufficient horizontal padding so buttons never feel cramped; primary buttons (violet fill) and secondary buttons (outlined) use the same text weight and size for visual consistency.

### Navigation Text
- Top navbar and sidebar navigation items use medium weight text, consistent sizing across every item, with the active item distinguished only by color/underline (per Section 2), never by a different font size or weight.

### Leaderboard / Ranking Text
- Numeric rank and score values use a slightly heavier weight than surrounding labels, so rankings remain scannable at a glance (this pattern is established by the numbered "Trending Now" list and must extend to the full Leaderboard feature).

### Market Card Text
- Within a market row: the question title is the visually dominant text; volume, category tag, and percentage are all secondary in weight but the **percentage value itself is bold and colored** (green/red) so it remains the fastest thing to read in the row.

### Spacing Philosophy
- Generous line-height on all multi-line text (e.g. hero subtext) to maintain readability against the dark background.
- Consistent vertical rhythm between a heading and its supporting text/content — the same spacing pattern used in the hero (headline → subtext → buttons) should repeat in any future page with a similar heading-then-content structure.

### Readability Rules
- Text color against the dark background must always meet strong contrast (see Section 9, Accessibility). Muted/secondary text is muted in tone, never muted to the point of being hard to read.
- Numeric data (prices, percentages, volumes) is never justified or aligned in a way that makes scanning down a column difficult — consistent alignment (right-aligned for numeric columns) is expected as the product grows tables in future phases.

---

# 4. Layout System

### Desktop Layout Philosophy
- The approved prototype is a **three-column desktop layout**: a fixed left sidebar (navigation + categories), a flexible central content area (hero, trending markets), and a fixed right rail (Trending Now, Recent Activity). This three-column structure is the platform's signature layout and should be preserved as the default desktop pattern for any future page that reasonably fits it (e.g. Markets, Leaderboard).
- Pages that don't need a right rail (e.g. a focused Market Detail view, in a future phase) may drop it, but the left sidebar and top navbar remain constant across every page in the application — they are part of the permanent app shell (per Phase 0.2's `app-shell/`).

### Sidebar Behavior
- The left sidebar is persistent and always visible on desktop, containing: brand mark, primary navigation (Home, Markets, Rankings, Activity, Portfolio, Leaderboard, Watchlist), a "Categories" section with per-category status (Active / Soon), and a promotional call-to-action box pinned near the bottom.
- Sidebar items use icon + label pairs consistently — no navigation item appears as icon-only or label-only elsewhere in the sidebar.

### Top Navigation Behavior
- The top navbar spans the full width of the content area (to the right of the sidebar) and contains: search bar, primary page-level navigation tabs (Markets, Rankings, Activity, Portfolio, Leaderboard), and auth actions (Log in / Sign up) aligned to the right.
- The top navbar remains fixed/persistent across all pages; only the active tab indicator changes based on current page.

### Content Container Rules
- Central content is organized into clearly bounded sections (hero, category strip, Trending Markets table) with consistent horizontal margins matching the sidebar/right-rail gutters — content never touches the edges of its container.

### Grid Philosophy
- The category strip beneath the hero uses a **horizontal row of equally-sized pill cards**, scrollable/paginated via the arrow control shown at its right edge — this pattern is reserved specifically for category browsing and should not be reused as a generic layout for unrelated content.
- The Trending Markets section uses a **table-like row grid** (icon, title/category, volume, percentage, Yes/No pills, watchlist star) with consistent column alignment across every row — this exact column structure is the platform's standard pattern for any future list of markets.

### Card Spacing, Margins, Padding, Section Spacing
- Cards maintain consistent internal padding on all sides — content never touches a card's border.
- Consistent vertical spacing separates major sections (hero → category strip → Trending Markets → footer stats bar) — sections are clearly distinct without needing heavy divider lines to separate them.
- The right rail's two widgets (Trending Now, Recent Activity) use identical internal padding and spacing rhythm to each other, establishing a reusable "sidebar widget" pattern for any future right-rail content.
- A full-width statistics bar anchors the bottom of the page, with evenly spaced stat groups (icon + value + label) — this pattern is reserved for platform-wide summary statistics.

---

# 5. Component Design Rules

### Buttons
- **Primary button** (e.g. "Sign Up," "Explore Markets," "Get Started"): solid violet accent fill, white text, rounded corners, no border.
- **Secondary button** (e.g. "Log in," "How it works"): transparent/dark fill with a visible border, white or light text, same rounded corner radius as the primary button for visual consistency.
- Buttons never appear without adequate horizontal padding; icon-inclusive buttons (e.g. "How it works" with a play icon) keep the icon at the same visual weight as the text.

### Cards
- All cards (category pills, market rows, sidebar widgets, stat items) share the same corner radius and border treatment, establishing one consistent "card language" across the entire product regardless of the specific content inside.

### Tables / Rows
- The Trending Markets list behaves as a table conceptually even though rendered as styled rows: consistent column positions for icon, title/category, volume, percentage, action pills, and watchlist star across every single row, with no row deviating from this structure.

### Inputs
- The search bar uses a dark, bordered, rounded input with a leading icon and a subtle keyboard-shortcut hint (`/`) trailing on the right — this pattern (leading icon, trailing hint) is the standard input style for any future search or filter input.

### Search Bar
- Always positioned in the top navbar, always paired with the same leading search icon, and always styled consistently regardless of which page is active.

### Tabs / Filters
- The "Top / New / Memecoins / Solana / Events" filter tabs use a pill-shaped, horizontally-arranged control with the active tab filled in the accent color and inactive tabs shown as muted, bordered pills — this exact pattern is the standard for any future filterable list.

### Sidebar Items
- Each sidebar navigation item pairs one icon with one label at consistent size and spacing; the active item is distinguished by a filled/highlighted background state, consistent with the general Active State philosophy in Section 2.

### Navbar
- The top navbar's page-level tabs use text-only labels (no icons), with the active tab shown via accent-colored text and an underline — distinct from the sidebar's icon+label pattern, and this distinction (navbar = text-only, sidebar = icon+label) is intentional and permanent.

### Badges
- Category "Active" and "Soon" badges, and the "LIVE" hero badge, share a small, pill-shaped badge style with a colored dot or short label — badges are always compact and never compete visually with primary content.

### Category Cards
- Each category card pairs an icon (colored per-category, e.g. green frog for Memecoins, orange coin for Layer 1 & Majors), a category name, and a market count — this three-part structure (icon, name, count) is the permanent template for any future category card.

### Market Rows
- Each market row follows the fixed structure: leading icon → market question (with category tag beneath) → volume (with sub-label) → percentage (with movement arrow) → Yes/No price pills → watchlist star. No future market listing should reorder or omit these elements without an explicit design amendment.

### Leaderboard
- Numbered ranking rows (as previewed in "Trending Now") — number, icon/avatar, title/name, category or context line, and a right-aligned key metric — form the base pattern the full Leaderboard feature (Phase 8) must extend, keeping the same numbering and right-aligned metric convention.

### Portfolio Cards
- Portfolio items (future phase) must reuse the same card and row conventions established here — icon, title, contextual metadata, right-aligned value — rather than introducing a new visual pattern specific to Portfolio.

### Activity Feed
- Each activity row pairs a user avatar/icon, a short action description (e.g. "created," "traded Yes 68¢"), the related market title, and a right-aligned relative timestamp ("2m ago") — this exact structure is permanent for any activity-feed content anywhere in the product.

### Watchlist
- The watchlist star icon appearing on market rows is the single, consistent affordance for adding/removing a market from the Watchlist feature (Phase 9) — no alternative "save" pattern should be introduced elsewhere.

---

# 6. Icon Rules

### Icon Size Philosophy
- Icons are sized proportionally to their context: navigation icons are small and consistent with their adjacent text height; market/category icons (circular token-style icons) are slightly larger to serve as visual anchors for each row/card; the hero mascot artwork is the single large-scale illustrative asset on the page and is not a "component icon."

### Icon Placement
- Navigation icons are always leading (left of their label), never trailing.
- Market and category icons are always leading, appearing before the title/name text, establishing left-to-right scanning consistent with the text direction.

### Crypto / Token Icons
- Each market or category is represented by a distinct, recognizable circular icon (e.g. Bitcoin's orange circle, a stylized frog for Memecoins) — icons are colorful and specific to their subject, contrasting intentionally against the muted dark UI so they remain quickly scannable.

### Category Icons
- Category icons follow the same circular/rounded icon treatment as market icons, reinforcing that categories and markets belong to the same visual family.

### Navigation Icons
- Sidebar navigation icons are simple, single-color line or filled icons (not colorful token-style icons), keeping a clear visual distinction between "navigate the app" (sidebar icons) and "identify a market/category" (colorful token icons).

### Consistency Rules
- No two icons representing the same concept (e.g. "watchlist") may use different iconography in different parts of the product — one icon, one meaning, everywhere.
- Icon color usage follows Section 2's semantic rules: icons are never given green/red coloring unless they are directly indicating a positive/negative movement.

---

# 7. Animation Philosophy

- **Hover animations:** Subtle, fast transitions only — background/border lightening, slight opacity or color shifts. No bouncing, scaling, or attention-grabbing motion on hover.
- **Transitions:** Any state change (tab switching, active filter changing) uses a short, smooth transition rather than an instant snap or a slow, noticeable animation — motion should feel responsive, not decorative.
- **Loading behavior:** Loading states (introduced in later phases when live data is wired in) should use calm, minimal indicators (e.g. subtle skeleton placeholders or a simple spinner) consistent with the dark, restrained aesthetic — no elaborate loading animations.
- **Button interaction:** Buttons provide immediate, subtle visual feedback on press/hover (slight brightness or scale change at most) — feedback should be felt, not performed.
- **Card interaction:** Interactive cards/rows (e.g. a market row) may show a subtle border or background highlight on hover to indicate interactivity, consistent with the general Hover Philosophy in Section 2.
- **No excessive animation:** Consistent with the "confidence through restraint" principle in Section 1 — motion always serves usability (indicating interactivity or state change), never decoration for its own sake.

---

# 8. Responsive Design Rules

The approved prototype defines the **desktop** experience. The following rules describe how that same visual identity adapts to smaller viewports without introducing new visual language.

### Desktop
- Full three-column layout (sidebar, main content, right rail) as the default and primary experience, per Section 4.

### Tablet
- The right rail (Trending Now, Recent Activity) may collapse or move below the main content, or become accessible via a secondary view, while the left sidebar and top navbar structure are preserved as closely as possible.
- Category strip and Trending Markets rows adapt their spacing to the narrower viewport but retain the same card/row structure and content order — no columns are dropped from a market row; they may reflow or shrink instead.

### Mobile
- The left sidebar collapses into a mobile-appropriate navigation pattern (e.g. a bottom navigation bar or a slide-out menu) while preserving the same navigation items, icons, and active-state treatment defined in Section 5.
- The top navbar's search and auth actions remain accessible, reorganized into a compact mobile header, but never removed.
- Market rows restructure into a more vertically stacked card format on narrow screens while preserving the same information (icon, title, category, volume, percentage, Yes/No pills, watchlist star) and the same color semantics.
- The hero section's headline, subtext, and buttons stack vertically above the mascot artwork (or beside a smaller version of it), preserving the same copy, button styles, and accent colors.

### Guiding Rule Across All Breakpoints
- Content, color meaning, and component identity never change across breakpoints — only layout arrangement and sizing adapt. A user should recognize every component as "the same thing" whether on desktop or mobile.

---

# 9. Accessibility Standards

- **Contrast:** All text-on-background combinations defined in Section 2 must meet at least WCAG AA contrast standards for their text size — primary text against the dark background is already high-contrast by design; secondary/muted text must be checked carefully during implementation to ensure it does not fall below readable contrast.
- **Readable typography:** Minimum font sizes are chosen so that dense data (percentages, volumes, timestamps) remains legible at typical viewing distances, on both desktop and mobile.
- **Keyboard navigation philosophy:** Every interactive element (nav items, tabs, buttons, market rows, watchlist star) must be reachable and operable via keyboard alone, in a logical tab order that follows the visual layout (top navbar → sidebar → main content → right rail, or the mobile-adapted equivalent).
- **Focus states:** A clearly visible focus indicator (distinct from the hover state) is required on every interactive element for keyboard users — focus states use the accent color system rather than a generic browser default, to stay visually consistent with the rest of the design.
- **Touch targets:** On tablet and mobile, all interactive elements (buttons, tabs, watchlist star, sidebar/nav items) must have a touch target size large enough for comfortable tapping, even if their visual icon/label appears smaller — invisible touch padding is used where necessary rather than enlarging the visible element itself.

---

# 10. UI Consistency Rules

The following rules apply to **every current and future page**, without exception, to ensure the entire product feels like one continuous design rather than a collection of separately designed screens:

1. Every page uses the same app shell: persistent left sidebar and top navbar, as established in the prototype.
2. Every page uses the same color system from Section 2 — no page introduces a new background tone, a new accent color, or reinterprets green/red semantics.
3. Every page uses the same typography hierarchy from Section 3 — heading sizes and weights are never invented ad hoc per page.
4. Every card, row, badge, button, and icon follows the component rules in Section 5 exactly — a new feature never introduces a new card style when an existing one already fits the content.
5. Every list of items (markets, leaderboard entries, activity entries, watchlist entries, portfolio entries) follows the same general row anatomy: leading icon/identifier → primary label → secondary metadata → right-aligned key value/action, as established by the Trending Markets and Trending Now patterns.
6. Any new UI pattern not explicitly covered by this document must be modeled as closely as possible on the closest existing pattern here, and if a genuinely new pattern is required, it must be proposed explicitly and, once approved, added to this document as a formal amendment — never introduced silently.

---

# 11. Out of Scope for Phase 0.4

This document defines visual design standards only, in written form. It explicitly does **not** define or produce:

- No Frontend code
- No Components
- No Tailwind classes
- No React code
- No Routing
- No Pages
- No Backend
- No Database
- No API
- No Authentication

Any of the above will be introduced only in their designated future phase (starting with Phase 1), implemented using the technology stack locked in Phase 0.3, and must faithfully implement — never reinterpret — the standards defined in this document.

---

# 12. Completion Criteria

Phase 0.4 is considered complete when:

1. This document exists at `docs/Phase-0.4-Design-System-and-UI-Standards.md` and is committed with a `docs:` commit, per the Git Standards in Phase 0.3.
2. Every section (Design Philosophy through UI Consistency Rules) is fully written with no open questions or placeholders remaining.
3. The color system, typography hierarchy, layout system, component rules, icon rules, animation philosophy, responsive rules, and accessibility standards are all specific enough that a future implementation phase can be built from this document and the prototype image alone, without needing new design decisions invented on the fly.
4. The document contains no application code, Tailwind classes, or component implementation of any kind.
5. The document has been reviewed and explicitly approved by the project owner as the permanent design foundation for all subsequent phases.

Once these conditions are met, Phase 0.4 is closed, and Phase 1 (Static Homepage) may begin, implementing this design system and the approved prototype using the technology stack locked in Phase 0.3.

---

*This document is permanent project documentation. It may only be changed through an explicit, documented amendment approved by the project owner — never silently overridden or reinterpreted by a future session, request, or AI assistant.*
