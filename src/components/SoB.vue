<template>
  <v-layout>
    <v-container fluid grid-list-sm>
      <v-speed-dial fixed bottom right  direction="top" origin="top" v-model="fab">
        <v-btn slot="activator" color="black" fab v-model="fab">
          <v-icon>mdi-chevron-double-up</v-icon>
          <v-icon>mdi-chevron-double-down</v-icon>
        </v-btn>

        <v-btn fab small color="grey darken-3" @click.stop="townBuildingsDialog=!townBuildingsDialog">
          <v-icon>mdi-home-variant</v-icon>
        </v-btn>
        <v-btn fab small color="teal darken-3" @click.stop="townTypeDialog=!townTypeDialog">
          <v-icon>mdi-city</v-icon>
        </v-btn>
        <v-btn fab small color="indigo" @click.stop="townDailyEventsDialog=!townDailyEventsDialog">
          <v-icon>mdi-calendar-question</v-icon>
        </v-btn>
        <v-btn fab small color="amber darken-2" @click.stop="lootDialog=!lootDialog">
          <v-icon>mdi-treasure-chest</v-icon>
        </v-btn>
        <v-btn fab small color="brown" @click.stop="scavengeDialog=!scavengeDialog">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn fab small color="blue darken-2" @click.stop="encounterDialog=!encounterDialog">
          <v-icon>mdi-door</v-icon>
        </v-btn>
        <v-btn fab small color="black" @click.stop="darknessRollDialog=!darknessRollDialog">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-flex xs12>
        <hero-panel/>
      </v-flex>
      <v-dialog v-model="lootDialog" scrollable max-width="800px">
        <loot-deck/>
      </v-dialog>
      <v-dialog v-model="scavengeDialog" scrollable max-width="800px">
        <scavenge-deck/>
      </v-dialog>
      <v-dialog v-model="encounterDialog" scrollable max-width="600px">
        <encounter-deck/>
      </v-dialog>
      <v-dialog v-model="townDailyEventsDialog" scrollable max-width="800px">
        <town-daily-events/>
      </v-dialog>
      <v-dialog v-model="townBuildingsDialog" scrollable max-width="400px">
        <town-buildings/>
      </v-dialog>
      <v-dialog v-model="townTypeDialog" scrollable max-width="400px">
        <town-type/>
      </v-dialog>
      <v-dialog v-model="darknessRollDialog" scrollable max-width="600px">
        <darkness-roll/>
      </v-dialog>
    </v-container>
  </v-layout>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import HeroPanel from './sob/HeroPanel'
  import LootDeck from './sob/LootDeck'
  import ScavengeDeck from './sob/ScavengeDeck'
  import EncounterDeck from './sob/EncounterDeck'
  import DiceRoller from './general/DiceRoller'
  import TownBuildings from './sob/TownBuildings'
  import TownDailyEvents from './sob/TownDailyEvents'
  import TownType from './sob/TownType'
  import DarknessRoll from './sob/DarknessRoll'

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
      TownBuildings,
      'town-buildings': TownBuildings,
      TownDailyEvents,
      'town-daily-events': TownDailyEvents,
      TownType,
      'town-type': TownType,
      DarknessRoll,
      'darkness-roll': DarknessRoll
    },
    data() {
      return {
        fab: false,
        lootDialog: false,
        scavengeDialog: false,
        encounterDialog: false,
        townBuildingsDialog: false,
        townDailyEventsDialog: false,
        townTypeDialog: false,
        darknessRollDialog: false
      }
    }

  }
</script>
