<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card>
          <v-card-title><h1>Turn Order</h1></v-card-title>
          <turn-order/>
        </v-card>
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
