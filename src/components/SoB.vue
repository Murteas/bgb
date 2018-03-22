<template>
  <v-layout>
  <v-container fluid grid-list-sm>
    <v-speed-dial fixed bottom right direction="top" origin="top" v-model="fab">
      <v-btn slot="activator" color="black" fab v-model="fab">
        <v-icon>mdi-chevron-double-up</v-icon>
        <v-icon>mdi-chevron-double-down</v-icon>
      </v-btn>
      <v-btn fab small color="amber accent-3" @click.stop="lootDialog=!lootDialog">
        <v-icon>mdi-treasure-chest</v-icon>
      </v-btn>
      <v-btn fab small color="brown darken-4" @click.stop="scavengeDialog=!scavengeDialog">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn fab small color="indigo darken-3" @click.stop="encounterDialog=!encounterDialog">
        <v-icon>person_pin</v-icon>
      </v-btn>
      <v-btn fab small color="grey darken-3" @click.stop="townBuildingsDialog=!townBuildingsDialog">
        <v-icon>mdi-home-variant</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-flex xs12>
      <hero-panel/>
    </v-flex>
    <v-dialog v-model="lootDialog" scrollable max-width="600px">
      <loot-deck/>
    </v-dialog>
    <v-dialog v-model="scavengeDialog" scrollable max-width="600px">
      <scavenge-deck/>
    </v-dialog>
    <v-dialog v-model="encounterDialog" scrollable max-width="600px">
      <encounter-deck/>
    </v-dialog>
    <v-dialog v-model="townBuildingsDialog" scrollable max-width="400px">
      <town-buildings/>
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
      'town-buildings': TownBuildings
    },
    data() {
      return {
        fab: false,
        lootDialog: false,
        scavengeDialog: false,
        encounterDialog: false,
        townBuildingsDialog: false
      }
    }

  }
</script>
