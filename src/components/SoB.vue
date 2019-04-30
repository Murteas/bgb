<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Hold Back the Darkness</div>
            <darkness-roll/>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Encounter Deck</div>
            <encounter-deck/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Scavenge Deck</div>
            <scavenge-deck/>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Loot Deck</div>
            <loot-deck/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Town Daily Events Deck</div>
            <town-daily-events/>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Threat Decks</div>
            <threat-decks/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md12 sm12>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
              <span slot="header">Town Panel</span>
            <town-panel/>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <span slot="header">Campaign Panel</span>
            <campaign-panel/>
          </v-expansion-panel-content>
          <!--<v-expansion-panel-content>-->
            <!--<div slot="header">Hero Panel</div>-->
            <!--<hero-panel/>-->
          <!--</v-expansion-panel-content>-->
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    <img src="static/img/heroes/Lawman.png"/>
    <h5>All images copyright of Flying Frog Productions.</h5>
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import HeroPanel from './sob/HeroPanel'
  import LootDeck from './sob/LootDeck'
  import ScavengeDeck from './sob/ScavengeDeck'
  import EncounterDeck from './sob/EncounterDeck'
  import DiceRoller from './general/DiceRoller'
  import TownDailyEvents from './sob/TownDailyEvents'
  import DarknessRoll from './sob/DarknessRoll'
  import TownPanel from './sob/TownPanel'
  import CampaignPanel from './sob/CampaignPanel'
  import ThreatDecks from './sob/ThreatDecks'

  export default {
    components: {
      DiceRoller,
      'dice-roller': DiceRoller,
      HeroPanel,
      'hero-panel': HeroPanel,
      LootDeck,
      'loot-deck': LootDeck,
      ScavengeDeck,
      'scavenge-deck': ScavengeDeck,
      EncounterDeck,
      'encounter-deck': EncounterDeck,
      TownDailyEvents,
      'town-daily-events': TownDailyEvents,
      DarknessRoll,
      'darkness-roll': DarknessRoll,
      ThreatDecks,
      'threat-decks': ThreatDecks,
      TownPanel,
      'town-panel': TownPanel,
      CampaignPanel,
      'campaign-panel': CampaignPanel
    },
    data() {
      return {
        fab: false,
        lootDialog: false,
        scavengeDialog: false,
        encounterDialog: false,
        townTypeDialog: false,
        darknessRollDialog: false,
        threatDecksDialog: false
      }
    }

  }
</script>
