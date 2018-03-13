<template>
  <v-layout column align-start align-content-start>
    <loot-deck/>
  </v-layout>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import LootDeck from './sob/LootDeck'

  export default {
    components: {
      LootDeck,
      'loot-deck': LootDeck
    }

  }
</script>
