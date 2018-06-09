<template>
  <v-container fluid grid-list-sm>
    <v-layout column>
      <v-flex>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Random Characters</div>
            <random-chars/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Skill Roll</div>
            <explore-roll/>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
