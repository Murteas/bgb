<template>
  <v-layout column align-start align-content-start>
    <loot-deck/>
    <hero-panel/>
  </v-layout>
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
    }

  }
</script>
