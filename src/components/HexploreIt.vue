<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm6 md5>
        <v-card height="auto">
          <v-card-title><h1>Random Characters</h1></v-card-title>
          <random-chars/>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-card height="auto">
          <v-card-title><h1>Skill Roll</h1></v-card-title>
          <explore-roll/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import RandomChars from './hex/RandomChars'
  import ExploreRoll from './hex/ExploreRoll'
  export default {
    components: {
      RandomChars,
      'random-chars': RandomChars,
      ExploreRoll,
      'explore-roll': ExploreRoll
    },
    data() {
      return {
        // fab: false,
        // lootDialog: false,
        // scavengeDialog: false,
        // encounterDialog: false,
        // townBuildingsDialog: false,
        // townDailyEventsDialog: false,
        // townTypeDialog: false,
        // darknessRollDialog: false
      }
    }

  }
</script>
