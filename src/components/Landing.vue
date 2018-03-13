<template>
  <v-layout column align-start align-content-start>
    <hero-panel/>
  </v-layout>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import HeroPanel from './sob/HeroPanel'

  export default {
    components: {
      HeroPanel,
      'hero-panel': HeroPanel
    }

  }
</script>
