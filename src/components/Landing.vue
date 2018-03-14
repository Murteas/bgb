<template>
  <v-container fluid grid-list-sm>
    <v-speed-dial  bottom left right top direction="bottom" v-model="fab">
      <v-btn slot="activator" color="indigo" fab v-model="fab">
        <v-icon>mdi-chevron-double-down</v-icon>
        <v-icon>mdi-chevron-double-up</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
      <v-dialog v-model="lootDialog" scrollable max-width="600px">
        <loot-deck/>
      </v-dialog>
      <hero-panel/>
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import HeroPanel from './sob/HeroPanel'
  import LootDeck from './sob/LootDeck'

  export default {
    components: {
      HeroPanel,
      'hero-panel': HeroPanel,
      LootDeck,
      'loot-deck': LootDeck
    },
    data () {
      return {
        fab: false,
        lootDialog: false
      }
    }

  }
</script>
