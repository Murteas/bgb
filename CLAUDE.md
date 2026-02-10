# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Board Game Buddy (BGB) is a Vue.js 2 web application that provides digital helper tools for multiple board games: Shadows of Brimstone (SoB), Aeon's End, HexploreIt, and Arkham Horror 3rd Edition. The app manages card decks, dice rolling, random events, and campaign tracking.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:8080)
npm run dev
# OR
npm start

# Build for production
npm run build

# Lint code
npm run lint

# Deploy to Firebase hosting
firebase deploy
```

## Architecture

### Application Structure

- **Vue Router** with history mode routes each game to its own component:
  - `/` → About page with list randomizers
  - `/sob` → Shadows of Brimstone tools
  - `/aeon` → Aeon's End turn order
  - `/hex` → HexploreIt character randomizer
  - `/ah3` → Arkham Horror chaos bag builder

- **App.vue** provides the shell: toolbar, navigation drawer, and footer with persistent dice roller

- **Global Vue mixins** (main.js) provide utility methods across all components:
  - `shuffle(array)` - Fisher-Yates shuffle with Vue reactivity
  - `rollDie(sides)` - Single die roll
  - `rollDice(number, sides)` - Multiple dice roll

### Component Organization

```
src/components/
├── [Game].vue           # Main game orchestrator components
├── general/             # Reusable components (DiceRoller, RandomDie, ListRandomizer)
├── sob/                 # Shadows of Brimstone components
│   ├── data/*.json      # Game data (cards, events, encounters)
│   └── *.vue            # Deck managers, panels, tools
├── ae/                  # Aeon's End components
├── arkham/              # Arkham Horror components
└── hex/                 # HexploreIt components
```

### Card Deck Pattern

Most SoB components follow this pattern for managing card decks:

1. Import JSON data from `./data/` directory
2. Initialize from localStorage on mount (for persistence)
3. Provide shuffle and draw methods
4. Save state to localStorage on changes
5. Display cards using image sources from JSON data
6. Use `numDrawn` counter to show progressive deck draw

Example: LootDeck.vue, ScavengeDeck.vue, EncounterDeck.vue

### Data Structure

Game data lives in JSON files under `src/components/[game]/data/`:
- Card decks include `src` (image path), `title`, and game-specific properties
- Events, encounters, and other game content stored as structured JSON
- Images referenced from `static/img/` directory

### UI Patterns

- Vuetify components with Material Design
- Expansion panels organize related tools within each game
- Kebab-case component names in templates (`<dice-roller/>`)
- Both kebab and PascalCase registered for component flexibility
- Dark theme applied globally

### State Management

No Vuex store. State management uses:
- Component local state (`data()`)
- localStorage for deck persistence across sessions
- Props/events for parent-child communication where needed

## Important Notes

- When adding new card decks, follow the existing pattern: JSON data file, shuffle on mount, localStorage persistence
- Material Design Icons use `mdi-` prefix (e.g., `mdi-cards`, `mdi-shuffle`)
- All images must be placed in `static/img/` and referenced in JSON data
- Component registration requires both PascalCase and kebab-case entries for template usage
- Firebase deployment serves from `./dist` directory with SPA fallback routing
