# Board Game Buddy Modernization Plan

## Context

Board Game Buddy is a Vue 2.5 web application that provides digital helper tools for **Shadows of Brimstone (SoB)**, including:

- **6+ card deck managers** with localStorage persistence (loot, encounters, scavenge, town events, threats)
- **Campaign system** tracking lieutenants, missions, success/failure counts
- **Procedural town generator** creating 12 towns with type-specific buildings
- **Darkness roll system** with 11 locations × 6 events each
- **Threat escalation** across 4 difficulty levels

The old codebase also contains modules for Aeon's End, HexploreIt, and Arkham Horror — but these are not actively used and will not be ported. The V2 architecture supports adding game modules later if desired.

**Why modernize?**
- Current tech stack is critically outdated (Vue 2.5 reached EOL January 2025, Webpack 3 is 6 years old, Babel 6 is deprecated)
- Adding new content requires code changes and manual JSON editing
- No testing infrastructure (zero test coverage)
- 13MB of unoptimized images
- Security vulnerabilities from unmaintained dependencies

**User requirements:**
1. Update to modern, free/open-source technology
2. Preserve all existing SoB functionality (fresh start, no campaign migration needed)
3. Enable adding new content (cards, encounters, locations) WITHOUT code changes
4. Architecture for storytelling/automated campaign features (later — see `STORY_ENGINE_SPEC.md`)
5. Flexible deployment (not tied to Firebase)

## What We're NOT Doing (Scope Boundaries)

- No localStorage data migration — users start fresh
- No backend or server-side logic
- No YAML conversion — JSON stays JSON
- No story engine in v1 — that's a separate future effort (see `STORY_ENGINE_SPEC.md`)
- No campaign export/import in v1
- No non-SoB game modules — old codebase kept as reference if they're ever wanted back

## Technology Stack

### Core Framework: Vue 3 + Vite + TypeScript

**Vue 3:**
- Easiest migration path from Vue 2.5
- Existing 22 components map cleanly to Composition API
- Excellent TypeScript support
- 2x performance improvement over Vue 2

**Vite:**
- Dev server starts in <1s (vs ~10s with Webpack)
- Instant Hot Module Replacement
- Built-in image optimization
- Zero config for Vue 3 + TypeScript

**TypeScript:**
- Type safety for complex game state (campaigns, lieutenants, missions)
- TypeScript interfaces replace the need for runtime schema validation
- Catches errors at compile time

### UI Framework: Vuetify 3

- Maintains current Material Design aesthetic
- Similar component APIs to Vuetify 1 (with breaking changes — see migration reference below)
- Users expect the familiar look/feel

### State Management: Pinia

**Current problem:** 10 localStorage keys managed independently across SoB components:
- Each deck manually loads/saves localStorage (`LootDeck.vue`, `ScavengeDeck.vue`, etc.)
- Campaign state loads separately (`CampaignPanel.vue`)
- Non-namespaced keys risk collisions (`lootDeck`, `campaignPanel`, etc.)

**Solution:** Centralize with Pinia stores:
```typescript
stores/
├── decks.ts        // All card deck state (loot, encounter, scavenge, etc.)
├── campaign.ts     // Lieutenant/mission tracking
└── towns.ts        // Town generation state
```

Benefits:
- Single source of truth for all game state
- DevTools for debugging
- Easy localStorage persistence via pinia-plugin-persistedstate
- Namespaced persistence keys (no global key collisions)
- Testable state mutations

### Testing: Vitest + Vue Test Utils

**Priority test coverage:**
1. Deck shuffling logic (Fisher-Yates in `src/main.js`)
2. Town generation algorithms (`TownPanel.vue`)
3. Campaign mission assignment (`CampaignPanel.vue`)
4. localStorage persistence/hydration

Target: 80%+ coverage on game logic

## Content Management

### Current Problem

Adding new content currently requires:
- **New location:** Edit 3 files + modify switch statement in `DarknessRoll.vue`
- **New card:** Edit JSON + place image + restart app
- **New town type:** Edit 2 functions in `TownPanel.vue`

### Solution: TypeScript Interfaces + JSON Data Files

Keep JSON as the data format (it's already human-readable and natively supported). Add TypeScript interfaces for type safety:

```typescript
// types/cards.ts
interface Card {
  title: string
  type?: string         // e.g. "Loot", "Gear", "Artifact"
  description?: string  // ability text / flavor text
  xp?: number
  gold?: number
  keywords?: string[]   // e.g. ["Dark Stone", "Consumable"]
}
```

**Data file structure:**
```
src/
└── data/
    └── sob/
        ├── cards/
        │   ├── loot.json
        │   ├── encounter.json
        │   └── scavenge.json
        ├── locations/
        │   └── depth-events.json
        ├── towns/
        │   ├── buildings.json
        │   └── names.json
        └── campaigns/
            ├── missions.json
            └── lieutenants.json
```

### Card Images → Text Conversion

The existing card images (PNGs) contain all the real card data — XP values, gold, descriptions, keywords, etc. — but the current JSON only stores title and image path. V2 eliminates the images entirely and stores all card content as JSON text.

**One-time conversion:** A pipeline script (`scripts/extract-cards.ts`) uses Claude's vision API to read each card image and extract structured data. Run it once during migration to generate the new JSON data files. See "Card Extraction Pipeline" section below for usage.

**New card format (example):**
```json
{
  "title": "Blood Money",
  "type": "Loot",
  "xp": 30,
  "gold": null,
  "description": "Gain 30 XP when you draw this card."
}
```

**Benefits over image approach:**
- Zero asset size vs ~10MB of PNGs
- Adding new cards = edit JSON only (no image files ever)
- Card text is searchable and readable at any screen size
- No Vite imagetools plugin or WebP conversion pipeline needed

## Architecture

### Separation of Concerns

```
src/
├── components/          # UI only, no business logic
│   ├── sob/
│   │   ├── DeckDisplay.vue
│   │   ├── TownCard.vue
│   │   └── CampaignPanel.vue
│   └── general/         # DiceRoller, ListRandomizer
│
├── stores/             # State management (Pinia)
│   ├── decks.ts
│   ├── campaign.ts
│   └── towns.ts
│
├── services/           # Pure functions (game logic)
│   ├── deck-manager.ts      # shuffle, draw, reset
│   ├── town-generator.ts    # procedural generation
│   └── campaign-engine.ts   # mission assignment
│
├── utils/              # Pure utility functions (no Vue)
│   ├── shuffle.ts      # Fisher-Yates shuffle
│   └── dice.ts         # rollDie, rollDice
│
├── composables/        # Reusable Vue logic
│   └── useDeck.ts      # Deck state + draw/shuffle reactivity
│
├── data/               # JSON data files
│   └── sob/
│       ├── cards/
│       └── locations/
│
└── types/              # TypeScript interfaces
    ├── cards.ts
    ├── campaign.ts
    └── towns.ts
```

**Key principle:** Pure functions for game logic → easily testable without Vue

## Vuetify 1→3 Migration Reference

This is the **highest-risk item** in the entire migration. Every component uses Vuetify 1.x APIs (`^1.1.9`). Key breaking changes:

| Vuetify 1 | Vuetify 3 | Notes |
|-----------|-----------|-------|
| `v-list-tile` | `v-list-item` | Renamed |
| `v-list-tile-content` | `v-list-item-title` / `v-list-item-subtitle` | Split into specific slots |
| `slot="activator"` | `#activator` | Scoped slots syntax |
| `slot="header"` | Expansion panel rewritten | Check Vuetify 3 docs |
| `@click.native` | `@click` | Native modifier removed in Vue 3 |
| `v-layout` + `v-flex` | `v-row` + `v-col` | Grid system renamed |
| `mdi` package | `@mdi/font` | Package renamed |
| Elevation classes | Different class names | Check Vuetify 3 theming docs |
| `v-toolbar` slots | Restructured | Check migration guide |

**Strategy:** Migrate one component at a time, starting with the simplest SoB deck (LootDeck) to get familiar with Vuetify 3 before tackling complex components like CampaignPanel.

## Migration Scope

**In scope: Shadows of Brimstone only**

| Component Group | Count | localStorage Keys | Notes |
|----------------|-------|-------------------|-------|
| SoB deck managers | 6 | 8 keys | LootDeck, EncounterDeck, ScavengeDeck, TownDailyEvents, ThreatDecks + numDrawn pairs |
| SoB campaign/world | 3 | 2 keys | CampaignPanel, TownPanel, DarknessRoll |
| General utilities | 2 | 2 keys | DiceRoller (stateless), ListRandomizer (2 keys) |

**Not in scope:** Aeon's End, HexploreIt, Arkham Horror. Old code kept at `C:\djs.projects\bgb\` as reference.

**HeroPanel.vue note:** Exists in old codebase but is commented out. Decide at implementation time whether to revive it.

## Migration Strategy

This is a **clean rebuild**, not a migration. No localStorage data preservation needed.

### Phase 1: Foundation (Week 1-2)

**Setup new project:**
```bash
npm create vite@latest bgb-v2 -- --template vue-ts
npm install vuetify@3 pinia pinia-plugin-persistedstate @vueuse/core
npm install -D vitest @vue/test-utils vite-plugin-vuetify
# For the one-time card extraction script only:
npm install -D @anthropic-ai/sdk zod tsx
```

**Convert core utilities:**
- Global mixins → `utils/shuffle.ts` + `utils/dice.ts` (pure functions)
- Remove unused `shuffle-array` npm package

**Build first SoB component as proof of concept:**
- `LootDeck.vue` — simplest deck, establishes the Vuetify 3 + Pinia pattern for all other decks

**Deliverable:** Runnable Vue 3 app with LootDeck working end-to-end

### Phase 2: Core SoB Migration (Week 3-6)

**Migrate all SoB deck components (priority order):**
1. `LootDeck.vue` — simplest deck, template for others
2. `EncounterDeck.vue`
3. `ScavengeDeck.vue`
4. `TownDailyEvents.vue`
5. `ThreatDecks.vue` (4 threat levels)
6. `TownPanel.vue` (procedural generation)
7. `CampaignPanel.vue` (most complex state)
8. `DarknessRoll.vue` (refactor hardcoded switch statement to data-driven lookup)
9. `HeroPanel.vue` — revive or drop

**Implement Pinia stores:**
```typescript
stores/
├── decks.ts        // Centralize all deck state
├── campaign.ts     // Lieutenants, missions, tracking
└── towns.ts        // Procedural town generation
```

**Run card extraction pipeline:**
- `npx tsx scripts/extract-cards.ts` against old codebase images
- Review and clean up generated JSON files
- Verify card data matches physical cards

**Deliverable:** Full SoB feature parity with V1

### Phase 3: Testing & Deploy (Week 7-8)

**Testing:**
```
tests/
├── utils/shuffle.test.ts           // Fisher-Yates correctness
├── stores/decks.test.ts            // Shuffle, draw, reset
├── services/town-generator.test.ts // Procedural generation
└── services/campaign-engine.test.ts // Mission assignment
```

Target: 80%+ coverage on `utils/`, `stores/`, `services/`

**Update CLAUDE.md** to reflect new architecture:
- Vue 3 + Vite + TypeScript commands
- Pinia stores instead of localStorage patterns
- `utils/` for pure functions, `composables/` for Vue logic
- JSON data structure
- Component patterns with Composition API

**Deploy** to any static host (Vercel, Cloudflare Pages, Netlify, or keep Firebase — all work with `npm run build` + `dist/`).

**Deliverable:** Production-ready modernized app

### Phase 4: Story Engine (Future)

See `STORY_ENGINE_SPEC.md`. Begin only after Phase 3 is complete and stable.

## Card Extraction Pipeline

The script `scripts/extract-cards.ts` reads each card image with Claude's vision API and outputs structured JSON. Run it once during Phase 2 migration.

### Setup

```bash
# From the old codebase root (C:\djs.projects\bgb)
# Requires ANTHROPIC_API_KEY in your environment
set ANTHROPIC_API_KEY=sk-ant-...
npx tsx scripts/extract-cards.ts
```

### What it does

1. Scans all 4 card image directories (`static/img/cards/loot/`, `encounter/`, `scavenge/`, `townDailyEvents/`)
2. Sends each image to Claude with vision to extract: title, type, XP, gold, description, keywords
3. Writes `data/sob/cards/loot.json`, `encounter.json`, `scavenge.json`, `daily-events.json`

### After running

Review the output JSON manually — Claude reads card images accurately but:
- Unusual fonts or worn card artwork may need correction
- Card back images (e.g., blank loot back) will be flagged as `"is_card_back": true` and should be removed
- Duplicate cards (loot has 2x Handy, 2x Dark Stone Shard) are intentional — keep them

### Adding new card sets

For future card sets without images, just add entries directly to the JSON files. No script needed.

---

## Key Reference Files (Old Codebase)

These are the important files from the old codebase to study during the clean rebuild:

1. **`src/main.js`** — Global mixins to convert to `utils/`
2. **`src/components/sob/LootDeck.vue`** — Simplest deck, template for the pattern
3. **`src/components/sob/CampaignPanel.vue`** — Most complex state to redesign
4. **`src/components/sob/TownPanel.vue`** — Procedural generation logic
5. **`src/components/sob/DarknessRoll.vue`** — Hard-coded switch statement to replace with data-driven lookup
6. **`src/components/sob/data/`** — 14 JSON files to port to new `data/sob/` structure
7. **`static/img/cards/`** — 49 card images, source for the one-time extraction pipeline

## Risk Mitigation

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Vuetify 3 API differences** | **High** | Migrate simple components first; use Vuetify 3 migration guide; test each component before moving on |
| **Composition API learning curve** | Medium | Start with simple stateless components; Vue 3 docs are excellent |
| **Image optimization breaks layouts** | Low | Set explicit dimensions, test on multiple devices |
| **Build complexity** | Low | Vite is zero-config; start simple, add features incrementally |

## Infrastructure & Deployment

Any static host works — just run `npm run build` and deploy the `dist/` folder:

| Option | Free Tier | Notes |
|--------|-----------|-------|
| **Vercel** | 100GB bandwidth | Zero config, auto-deploy from Git |
| **Cloudflare Pages** | Unlimited bandwidth | Best free bandwidth |
| **Netlify** | 100GB bandwidth | Similar to Vercel |
| **GitHub Pages** | Unlimited | Simple; configure SPA fallback routing |
| **Firebase Hosting** | Generous free tier | Current setup; keep if preferred |

Pick whichever is easiest when deployment time comes.

## Verification Checklist

**Deck Management:**
- [ ] Shuffle loot deck, draw 3 cards, cards persist after reload
- [ ] Exhaust deck, shuffle resets drawn count
- [ ] All 6 decks (loot, encounter, scavenge, town events, threats) work independently

**Campaign System:**
- [ ] Create campaign, assigns lieutenant with missions
- [ ] Track successful/failed missions (0-9 cycle)
- [ ] Delete missions, regenerate missions
- [ ] Campaign persists after reload

**Town Generation:**
- [ ] Generate 12 towns with procedural names, types, buildings
- [ ] Select up to 3 towns (star them)
- [ ] Delete individual towns, reset all
- [ ] Towns persist after reload

**Darkness Roll:**
- [ ] Roll 2d6, if doubles trigger location event
- [ ] Cycle through 11 locations
- [ ] Events pull correct text from JSON data
- [ ] Roll count badge increments

**Data Persistence:**
- [ ] Create campaign, close browser, reopen — data persists
- [ ] About page "Clear Data" button resets all stored state

### Automated Tests

```bash
npm test  # Run Vitest
# Expected: 80%+ coverage on utils/, stores/, services/
```

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Foundation | 2 weeks | Vue 3 + Vite + TS setup, utils, LootDeck proof of concept |
| Core SoB | 4 weeks | All SoB decks, Pinia stores, Vuetify 3 migration, images |
| Testing & Deploy | 2 weeks | 80%+ test coverage, update CLAUDE.md, deploy |
| Story Engine | Future | See STORY_ENGINE_SPEC.md |

**Total:** ~8 weeks for solo developer (evenings/weekends)

## Success Criteria

1. **Feature parity:** All SoB functionality works identically to V1 (clean reimplementation)
2. **Performance:** <2s initial load, <500ms deck operations
3. **Content velocity:** Non-developer adds new card in <5 minutes (edit JSON + place image)
4. **Testing:** >80% coverage on game logic
5. **Maintainability:** Modern, well-documented codebase with TypeScript types

## Next Steps

Implementation begins with Phase 1. This is a clean rebuild — the old codebase at `C:\djs.projects\bgb\` serves as reference only.

```bash
npm create vite@latest bgb-v2 -- --template vue-ts
```
