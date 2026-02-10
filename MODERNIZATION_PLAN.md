# Board Game Buddy Modernization Plan

## Context

Board Game Buddy is a Vue 2.5 web application that provides digital helper tools for multiple board games. The star feature is **Shadows of Brimstone (SoB)**, which includes:

- **6+ card deck managers** with localStorage persistence (loot, encounters, scavenge, town events, threats)
- **Campaign system** tracking lieutenants, missions, success/failure counts
- **Procedural town generator** creating 12 towns with type-specific buildings
- **Darkness roll system** with 11 locations × 6 events each
- **Threat escalation** across 4 difficulty levels

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
4. Architecture for storytelling/automated campaign features (higher priority)
5. Flexible deployment (not tied to Firebase or current infrastructure)

## Technology Stack Selection

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
- Catches localStorage serialization errors at compile time
- Auto-generated types from content schemas

### UI Framework: Vuetify 3

- Maintains current Material Design aesthetic
- Similar component APIs to Vuetify 1
- Users expect the familiar look/feel

### State Management: Pinia

**Current problem:** 14+ localStorage keys managed independently across components:
- `C:\djs.projects\bgb\src\components\sob\LootDeck.vue:28-30` - Each deck manually loads localStorage
- `C:\djs.projects\bgb\src\components\sob\CampaignPanel.vue:84-88` - Campaign loads separately

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
- Testable state mutations

### Testing: Vitest + Vue Test Utils

**Priority test coverage:**
1. Deck shuffling logic (Fisher-Yates algorithm in `C:\djs.projects\bgb\src\main.js:16-27`)
2. Town generation algorithms (`C:\djs.projects\bgb\src\components\sob\TownPanel.vue`)
3. Campaign mission assignment (`C:\djs.projects\bgb\src\components\sob\CampaignPanel.vue`)
4. localStorage persistence/hydration

Target: 80%+ coverage on game logic

## Content Management System

### Problem Statement

Adding new content currently requires:
- **New location:** Edit 3 files + modify switch statement in DarknessRoll.vue
- **New card:** Edit JSON + place image + restart app
- **New town type:** Edit 2 functions in TownPanel.vue

All changes require code knowledge and risk breaking the app.

### Solution: File-Based YAML + Schema Validation

**New structure:**
```
content/
├── sob/
│   ├── cards/
│   │   ├── loot.yaml          # Human-friendly YAML
│   │   ├── encounter.yaml
│   │   └── scavenge.yaml
│   ├── locations/
│   │   ├── mines.yaml
│   │   └── targa.yaml
│   ├── towns/
│   │   ├── buildings.yaml
│   │   └── names.yaml
│   └── campaigns/
│       ├── missions.yaml
│       └── lieutenants.yaml
└── images/
    └── sob/
        └── cards/              # Optimized WebP images
```

**YAML Example (replacing `C:\djs.projects\bgb\src\components\sob\data\lootCards.json`):**
```yaml
cards:
  - title: "Blood Money"
    src: "/images/sob/cards/loot/blood-money.webp"
    xp_value: 30

  - title: "Dark Stone Rock"
    src: "/images/sob/cards/loot/darkstone-rock.webp"
    xp_value: 50
```

**Schema Validation with Zod:**
```typescript
// schemas/card.schema.ts
import { z } from 'zod'

export const CardSchema = z.object({
  title: z.string(),
  src: z.string().startsWith('/images/'),
  xp_value: z.number().optional()
})

// Build fails if YAML doesn't match schema
```

**Benefits:**
- Build-time validation catches typos
- Non-developers can edit YAML easily
- TypeScript gets auto-generated types
- No runtime validation overhead
- Vite hot-reloads on content changes

### Image Optimization Pipeline

**Problem:** 76 images @ 13MB total (200-540KB PNGs in `C:\djs.projects\bgb\static\img\cards\`)

**Solution:** Vite imagetools plugin
- Automatic PNG → WebP conversion (70% size reduction)
- Result: 13MB → ~4MB
- Lazy loading for off-screen images

## Storytelling & Automated Campaign System

### Vision

Enhance the current campaign system with narrative generation and automated story progression. This goes beyond the current lieutenant/mission tracking to create dynamic, procedurally-generated campaign narratives.

### Architecture: Modular Story Engine

**Design principles:**
- **Event-driven:** Game actions (mission completion, town visits, darkness rolls) trigger story beats
- **State-aware:** Story adapts to campaign state (failed missions, hero deaths, locations visited)
- **Extensible:** Plugin architecture allows adding new story generators
- **Data-driven:** Stories defined in YAML, not hardcoded

### Story System Components

**1. Story Node Structure**
```yaml
# content/sob/stories/chapter1.yaml
story_nodes:
  - id: "campaign_start"
    trigger: "new_campaign"
    prompt: "The darkness stirs in the mines of {town_name}..."
    choices:
      - text: "Investigate the mines"
        next_node: "mines_entrance"
      - text: "Gather supplies first"
        next_node: "town_preparation"

  - id: "mines_entrance"
    trigger: "location_entered"
    conditions:
      location: "mines"
    prompt: "You descend into the cold darkness..."
    auto_events:
      - draw_encounter: true
      - add_threat: "low"
```

**2. Campaign State Tracker**
```typescript
// stores/campaign-story.ts
interface CampaignState {
  currentNode: string
  visitedLocations: string[]
  completedMissions: string[]
  activeThreats: Threat[]
  heroStates: HeroState[]
  narrative: StoryBeat[]  // Timeline of story events
}
```

**3. Story Generator Service**
```typescript
// services/story-engine.ts
class StoryEngine {
  // Evaluate story triggers after game actions
  evaluateTriggers(gameAction: GameAction): StoryNode | null

  // Progress story based on player choice
  progressStory(choice: StoryChoice): StoryNode

  // Generate dynamic encounter descriptions
  generateEncounterText(context: EncounterContext): string

  // Track campaign timeline
  recordStoryBeat(event: GameEvent): void
}
```

**4. Optional AI Enhancement (Future)**
If desired later, the system can integrate AI for dynamic text generation:
- Use local LLM (Ollama) for procedural narrative variation
- Story nodes provide structured prompts
- AI adds flavor text, not core logic
- Fully optional - system works without AI

### Integration with Existing Systems

**Campaign Panel Enhancement:**
- Add "Story Log" tab showing narrative timeline
- Display current story node and choices
- Track story progress alongside mission tracking

**Event System Hooks:**
```typescript
// When darkness roll triggers event
onDarknessEvent((event) => {
  storyEngine.recordStoryBeat({
    type: 'darkness_event',
    location: currentLocation,
    result: event.description
  })

  // Check if event triggers story progression
  const storyNode = storyEngine.evaluateTriggers({
    type: 'darkness_event',
    location: currentLocation
  })

  if (storyNode) {
    showStoryDialog(storyNode)
  }
})
```

**Mission Completion Flow:**
```typescript
// When mission completed
onMissionComplete((mission) => {
  // Existing: Update success count
  campaign.successfulMissions++

  // New: Progress story
  const nextNode = storyEngine.progressStory({
    mission_completed: mission.id
  })

  // Show branching narrative
  if (nextNode.choices) {
    showStoryChoiceDialog(nextNode)
  }
})
```

### Implementation Phases

**Phase 1: Story Data Structure**
- Define YAML schema for story nodes
- Create 2-3 example story arcs
- Build StoryEngine service (basic logic)

**Phase 2: UI Integration**
- Add Story Log component
- Story choice dialogs
- Timeline visualization

**Phase 3: Dynamic Generation**
- Template system for varied text
- Random event insertion
- Difficulty scaling based on hero states

**Phase 4: Optional AI (Future Work)**
- Integrate local LLM if desired
- Generate flavor text variations
- Create emergent narratives

## Migration Strategy

**Note:** This is a clean rebuild, not a migration. No localStorage data preservation needed.

### Phase 1: Foundation (Week 1-2)

**Setup new project:**
```bash
npm create vite@latest bgb-v2 -- --template vue-ts
npm install vuetify@3 pinia @vueuse/core zod js-yaml
```

**Convert core utilities:**
- Global mixins → Composables (`C:\djs.projects\bgb\src\main.js:13-40`)
  - `shuffle(array)` → `composables/useShuffle.ts`
  - `rollDie(sides)` → `composables/useDice.ts`

**Build 2-3 simple components from scratch:**
- DiceRoller.vue (general component)
- LootDeck.vue (simplest deck, template for others)
- Use as reference, not direct port

**Deliverable:** Runnable Vue 3 app with basic functionality

### Phase 2: Core Migration (Week 3-5)

**Migrate all SoB deck components (priority order):**
1. `C:\djs.projects\bgb\src\components\sob\LootDeck.vue`
2. `C:\djs.projects\bgb\src\components\sob\EncounterDeck.vue`
3. `C:\djs.projects\bgb\src\components\sob\ScavengeDeck.vue`
4. `C:\djs.projects\bgb\src\components\sob\ThreatDecks.vue` (4 threat levels)
5. `C:\djs.projects\bgb\src\components\sob\TownPanel.vue` (procedural generation)
6. `C:\djs.projects\bgb\src\components\sob\CampaignPanel.vue` (mission logic)
7. `C:\djs.projects\bgb\src\components\sob\DarknessRoll.vue` (refactor switch statement)

**Convert all JSON to YAML:**
- 14 data files in `C:\djs.projects\bgb\src\components\sob\data\`
- Create Zod schemas for each
- Build-time validation

**Implement Pinia stores:**
```typescript
stores/
├── decks.ts        // Centralize all deck state
├── campaign.ts     // Lieutenants, missions, tracking
└── towns.ts        // Procedural town generation
```

**Image optimization:**
- Setup Vite imagetools
- Convert 76 images: PNG → WebP
- Add lazy loading

**Deliverable:** Full SoB feature parity with V1

### Phase 3: Storytelling System (Week 6-8)

**Story Engine:**
- Define story node YAML schema
- Create 2-3 example story arcs
- Build StoryEngine service
- Add Story Log UI component
- Integrate with campaign/mission events

**Testing infrastructure:**
```typescript
tests/
├── stores/decks.test.ts       // Shuffle, draw, reset
├── services/town-generator.test.ts  // Procedural generation
└── services/campaign-engine.test.ts // Mission assignment
```

Target: 80%+ coverage on game logic

**Documentation:**
- Update CLAUDE.md to reflect new architecture:
  - Vue 3 + Vite + TypeScript commands
  - Pinia stores instead of localStorage patterns
  - Composables instead of global mixins
  - YAML content structure
  - Story engine architecture
  - New component patterns with Composition API

**Deployment:**
- GitHub Actions workflow (optional)
- Automated tests before deploy
- Content schema validation

**Deliverable:** Production-ready modernized app with updated documentation

## Architecture Principles

### Separation of Concerns

```
src/
├── components/          # UI only, no business logic
│   └── SoB/
│       ├── DeckDisplay.vue
│       ├── TownCard.vue
│       └── CampaignPanel.vue
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
├── composables/        # Reusable Vue logic
│   ├── useDice.ts
│   └── useShuffle.ts
│
├── content/            # Data (YAML)
│   └── sob/
│       ├── cards/
│       └── locations/
│
└── schemas/            # Zod validation
    └── card.schema.ts
```

**Key principle:** Pure functions for game logic → easily testable without Vue

### Plugin Architecture for Future Storytelling Engine

```typescript
// types/game-system.ts
interface GameSystem {
  id: string
  name: string
  components: Component[]
  stores: StoreDefinition[]
  routes: RouteRecordRaw[]
}

// Future: systems/storytelling/engine.ts
class StoryEngine {
  async generateNextNode(userChoice: string): Promise<StoryNode> {
    // Use local LLM to generate dynamic story
  }
}
```

Modular design allows adding storytelling as a plugin without touching SoB code.

## Critical Files to Modify

### Migration Priority

1. **`C:\djs.projects\bgb\src\main.js`**
   - Convert global mixins to composables
   - Entry point sets architecture tone

2. **`C:\djs.projects\bgb\src\components\sob\LootDeck.vue`**
   - Simplest deck, template for 5 others
   - Pattern: localStorage → Pinia store

3. **`C:\djs.projects\bgb\src\components\sob\CampaignPanel.vue`**
   - Most complex state (lieutenants, missions, tracking)
   - Break into smaller components

4. **`C:\djs.projects\bgb\src\components\sob\data\depthEvents.json`**
   - Representative data structure
   - Converting to YAML + schema is template for 14 JSON files

5. **`C:\djs.projects\bgb\src\components\sob\DarknessRoll.vue`**
   - Hard-coded switch statement for 11 locations
   - Refactor to data-driven lookup

6. **`C:\djs.projects\bgb\static\img\cards\` (directory)**
   - 13MB images, biggest bottleneck
   - Optimization pipeline starts here

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Vuetify 3 API differences** | Reference Vuetify 3 migration guide, test components |
| **Story engine complexity** | Start with simple YAML-based stories, add AI later if needed |
| **Image optimization breaks layouts** | Set explicit dimensions, test on multiple devices |
| **YAML syntax errors** | Build-time schema validation catches issues early |
| **Build complexity** | Start simple, add features incrementally |

## Infrastructure & Deployment

### Hosting Options (Choose Based on Preference)

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **Vercel** | Zero config, great DX, auto-deploy from Git | 100GB bandwidth limit | Recommended for ease |
| **Netlify** | Similar to Vercel, good free tier | Slightly slower builds | Alternative to Vercel |
| **GitHub Pages** | Completely free, simple | No backend functions | Static-only approach |
| **Firebase Hosting** | Current setup, generous free tier | Google dependency | If keeping existing |
| **Cloudflare Pages** | Unlimited bandwidth on free tier | Newer platform | Best free bandwidth |

**Recommendation:** Vercel or Cloudflare Pages for new deployment (both offer generous free tiers and zero-config Vue support)

### Build Pipeline (Example for Vercel)

```yaml
# vercel.json (auto-detected, optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

For GitHub Actions (optional):
```yaml
# .github/workflows/test.yml
on: push
jobs:
  test:
    - npm test                  # Must pass
    - npm run validate-content  # Schema validation
```

### Cost Analysis

| Item | Old | New | Savings |
|------|-----|-----|---------|
| Hosting | Firebase (~$0) | Vercel/Cloudflare/etc (free) | $0 |
| Build time | ~60s | ~5s | Time savings |
| Bundle size | ~2MB | ~800KB | 60% reduction |

**Total monthly cost:** $0 (all free options)

## Verification & Testing

### End-to-End Testing Checklist

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
- [ ] Events pull correct text from database
- [ ] Roll count badge increments

**Storytelling System:**
- [ ] Start campaign, see opening story node
- [ ] Make story choice, narrative progresses
- [ ] Complete mission, triggers story event
- [ ] Story Log shows timeline of events
- [ ] Story state persists after reload

**Data Persistence:**
- [ ] Create campaign, close browser, reopen
- [ ] Campaign data persists correctly
- [ ] Multiple campaigns can be saved
- [ ] Export/import campaigns as JSON (optional feature)

### Automated Tests

```bash
npm test  # Run Vitest
# Expected: 80%+ coverage on stores/, services/
```

**Critical test cases:**
1. Shuffle produces random order (statistical test)
2. Town generation respects size/type rules
3. Mission assignment follows world type logic
4. localStorage serialization/deserialization
5. Story engine evaluates triggers correctly
6. Story choices progress to correct next nodes

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Foundation | 2 weeks | Vue 3 setup, core utils, 2 components |
| Core Migration | 3 weeks | All SoB decks, Pinia stores, YAML content |
| Story System | 3 weeks | Story engine, testing, optimization |
| Polish | 1 week | Update CLAUDE.md, final documentation, deploy |

**Total:** ~9 weeks for solo developer (evenings/weekends)

## Success Criteria

1. **Feature parity:** All SoB functionality works identically to V1 (clean reimplementation)
2. **Performance:** <2s initial load, <500ms deck operations
3. **Content velocity:** Non-developer adds new card in <5 minutes (edit YAML + place image)
4. **Story system:** Story nodes trigger properly, choices affect narrative
5. **Testing:** >80% coverage on game logic
6. **Maintainability:** Modern, well-documented codebase

## Next Steps

After approval, implementation will begin with Phase 1 (Foundation). This is a clean rebuild using the old codebase as reference, allowing freedom to improve architecture without compatibility constraints. Both versions can run side-by-side for feature comparison.

**To resume work later:**
1. Review this plan file: `C:\Users\dsaetrum\.claude\plans\humble-seeking-puzzle.md`
2. Reference old codebase: `C:\djs.projects\bgb\`
3. Start new project: `npm create vite@latest bgb-v2 -- --template vue-ts`
