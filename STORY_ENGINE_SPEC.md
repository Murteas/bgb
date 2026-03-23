# Story Engine Specification

## Overview

This document describes the planned storytelling and automated campaign system for Board Game Buddy. This is **future work** — it begins only after the core Vue 3 migration is complete and stable.

## Vision

Enhance the campaign system with narrative generation and automated story progression. Goes beyond lieutenant/mission tracking to create dynamic, procedurally-generated campaign narratives.

## Architecture: Modular Story Engine

**Design principles:**
- **Event-driven:** Game actions (mission completion, town visits, darkness rolls) trigger story beats
- **State-aware:** Story adapts to campaign state (failed missions, hero deaths, locations visited)
- **Extensible:** Plugin architecture allows adding new story generators
- **Data-driven:** Stories defined in JSON, not hardcoded

## Story System Components

**1. Story Node Structure**
```json
{
  "story_nodes": [
    {
      "id": "campaign_start",
      "trigger": "new_campaign",
      "prompt": "The darkness stirs in the mines of {town_name}...",
      "choices": [
        { "text": "Investigate the mines", "next_node": "mines_entrance" },
        { "text": "Gather supplies first", "next_node": "town_preparation" }
      ]
    },
    {
      "id": "mines_entrance",
      "trigger": "location_entered",
      "conditions": { "location": "mines" },
      "prompt": "You descend into the cold darkness...",
      "auto_events": [
        { "draw_encounter": true },
        { "add_threat": "low" }
      ]
    }
  ]
}
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
If desired, the system can integrate AI for dynamic text generation:
- Use local LLM (Ollama) for procedural narrative variation
- Story nodes provide structured prompts
- AI adds flavor text, not core logic
- Fully optional — system works without AI

## Integration with Existing Systems

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

  const storyNode = storyEngine.evaluateTriggers({
    type: 'darkness_event',
    location: currentLocation
  })

  if (storyNode) showStoryDialog(storyNode)
})
```

**Mission Completion Flow:**
```typescript
onMissionComplete((mission) => {
  campaign.successfulMissions++

  const nextNode = storyEngine.progressStory({
    mission_completed: mission.id
  })

  if (nextNode.choices) showStoryChoiceDialog(nextNode)
})
```

## Implementation Phases

**Phase 1: Story Data Structure**
- Define JSON schema for story nodes
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

## Verification Checklist

- [ ] Start campaign, see opening story node
- [ ] Make story choice, narrative progresses
- [ ] Complete mission, triggers story event
- [ ] Story Log shows timeline of events
- [ ] Story state persists after reload
