<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm6 md5>
        <v-card height="auto">
          <v-card-title><h1>Turn Order</h1></v-card-title>
          <turn-order/>
        </v-card>
      </v-flex>
      <v-flex sm5 md5>
        <a href="https://www.actionphasegames.com/pages/aerandomizer" target="_blank">
          <h1>Aeon's End Randomizer</h1>
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import TurnOrder from './ae/TurnOrder'

  export default {
    components: {
      TurnOrder,
      'turn-order': TurnOrder
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
