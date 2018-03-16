<template>
  <v-layout>
  <v-container fluid grid-list-sm>
    <v-speed-dial fixed bottom right direction="top" origin="top" v-model="fab">
      <v-btn slot="activator" color="indigo" fab v-model="fab">
        <v-icon>mdi-chevron-double-up</v-icon>
        <v-icon>mdi-chevron-double-down</v-icon>
      </v-btn>
      <v-btn fab small color="amber darken-2" @click.stop="lootDialog=!lootDialog">
        <v-icon>mdi-treasure-chest</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-flex xs12>
      <hero-panel/>
    </v-flex>
    <v-dialog v-model="lootDialog" scrollable max-width="600px">
      <loot-deck/>
    </v-dialog>
  </v-container>

  </v-layout>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import HeroPanel from './sob/HeroPanel'
  import LootDeck from './sob/LootDeck'
  import DiceRoller from './general/DiceRoller'

  export default {
    components: {
      DiceRoller,
      'dice-roller': DiceRoller,
      HeroPanel,
      'hero-panel': HeroPanel,
      LootDeck,
      'loot-deck': LootDeck
    },
    data() {
      return {
        fab: false,
        lootDialog: false
      }
    }

  }
</script>
