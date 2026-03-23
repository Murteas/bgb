/**
 * Card Extraction Pipeline
 *
 * Reads Shadows of Brimstone card images and uses Claude's vision API to extract
 * structured card data, outputting JSON files for use in the V2 app.
 *
 * Usage:
 *   set ANTHROPIC_API_KEY=sk-ant-...
 *   npx tsx scripts/extract-cards.ts
 *
 * Output: data/sob/cards/{loot,encounter,scavenge,daily-events}.json
 */

import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const CardSchema = z.object({
  title: z.string().describe('The card name/title as printed on the card'),
  is_card_back: z.boolean().describe('True if this is a blank card back with no game content'),
  type: z.string().nullable().describe('Card category (e.g. Loot, Gear, Artifact, Encounter, Event)'),
  description: z.string().nullable().describe('All ability text, effect text, and flavor text on the card, verbatim'),
  xp: z.number().nullable().describe('XP reward value shown on card, or null if not present'),
  gold: z.number().nullable().describe('Gold coin value shown on card, or null if not present'),
  keywords: z.array(z.string()).describe('Game keywords, traits, or tags shown on the card (e.g. Dark Stone, Consumable, Side Bag)'),
})

type Card = z.infer<typeof CardSchema>

// ---------------------------------------------------------------------------
// Deck definitions
// ---------------------------------------------------------------------------

const DECKS = [
  {
    name: 'loot',
    imageDir: 'static/img/cards/loot',
    outputFile: 'data/sob/cards/loot.json',
  },
  {
    name: 'encounter',
    imageDir: 'static/img/cards/encounter',
    outputFile: 'data/sob/cards/encounter.json',
  },
  {
    name: 'scavenge',
    imageDir: 'static/img/cards/scavenge',
    outputFile: 'data/sob/cards/scavenge.json',
  },
  {
    name: 'daily-events',
    imageDir: 'static/img/cards/townDailyEvents',
    outputFile: 'data/sob/cards/daily-events.json',
  },
]

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMediaType(filePath: string): 'image/png' | 'image/jpeg' {
  const ext = path.extname(filePath).toLowerCase()
  return ext === '.png' ? 'image/png' : 'image/jpeg'
}

function listImages(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.warn(`  Warning: directory not found: ${dir}`)
    return []
  }
  return fs
    .readdirSync(dir)
    .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .map(f => path.join(dir, f))
    .sort()
}

function ensureDir(filePath: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

// Small delay between API calls to stay comfortably under rate limits
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Card extraction
// ---------------------------------------------------------------------------

async function extractCard(client: Anthropic, imagePath: string): Promise<Card> {
  const imageData = fs.readFileSync(imagePath).toString('base64')
  const mediaType = getMediaType(imagePath)
  const filename = path.basename(imagePath)

  console.log(`    Extracting: ${filename}`)

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: imageData },
          },
          {
            type: 'text',
            text: `This is a card from the Shadows of Brimstone board game. Extract all the information from it.

If this is a card back (blank, decorative, no game text) set is_card_back to true and leave other fields null/empty.

Otherwise, extract:
- title: the card name exactly as printed
- type: the card category/type label if shown
- description: ALL text on the card verbatim (abilities, effects, flavor text, anything)
- xp: numeric XP value if shown (just the number)
- gold: numeric gold/coin value if shown (just the number)
- keywords: any game keywords, traits, or special tags (often shown in bold or a special font)`,
          },
        ],
      },
    ],
    output_config: {
      format: zodOutputFormat(CardSchema, 'card'),
    },
  })

  const response = await stream.finalMessage()

  // Find the parsed output from structured response
  for (const block of response.content) {
    if (block.type === 'text') {
      try {
        const parsed = JSON.parse(block.text)
        return CardSchema.parse(parsed)
      } catch {
        // try next block
      }
    }
  }

  // Fallback: return minimal card if parsing fails
  console.warn(`    Warning: could not parse structured output for ${filename}, using title only`)
  return {
    title: path.basename(imagePath, path.extname(imagePath)),
    is_card_back: false,
    type: null,
    description: null,
    xp: null,
    gold: null,
    keywords: [],
  }
}

// ---------------------------------------------------------------------------
// Deck processing
// ---------------------------------------------------------------------------

async function processDeck(
  client: Anthropic,
  deck: typeof DECKS[number],
): Promise<void> {
  console.log(`\nProcessing deck: ${deck.name}`)
  const images = listImages(deck.imageDir)

  if (images.length === 0) {
    console.log('  No images found, skipping.')
    return
  }

  console.log(`  Found ${images.length} images`)

  const cards: Card[] = []
  for (const imagePath of images) {
    const card = await extractCard(client, imagePath)

    if (card.is_card_back) {
      console.log(`    Skipping card back: ${path.basename(imagePath)}`)
      continue
    }

    cards.push(card)
    await sleep(500) // 500ms between calls — well within rate limits
  }

  // Write output JSON
  ensureDir(deck.outputFile)
  fs.writeFileSync(deck.outputFile, JSON.stringify(cards, null, 2))
  console.log(`  Wrote ${cards.length} cards to ${deck.outputFile}`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is not set.')
    process.exit(1)
  }

  const client = new Anthropic({ apiKey })

  console.log('Card Extraction Pipeline')
  console.log('========================')
  console.log('Model: claude-opus-4-6')
  console.log(`Decks to process: ${DECKS.map(d => d.name).join(', ')}`)

  for (const deck of DECKS) {
    await processDeck(client, deck)
  }

  console.log('\nDone! Review the generated JSON files before using them:')
  DECKS.forEach(d => console.log(`  ${d.outputFile}`))
  console.log('\nTips:')
  console.log('  - Remove any entries where is_card_back is true')
  console.log('  - Duplicate cards (e.g. 2x Handy) are intentional — keep them')
  console.log('  - Verify XP/gold values against your physical cards')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
