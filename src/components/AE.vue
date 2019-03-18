<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex md6 sm6>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Turn Order</div>
            <turn-order/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md6 sm6>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Market & Mage Randomizers</div>
            <a href="https://www.actionphasegames.com/pages/aerandomizer" target="_blank">
              <h1>Official Randomizer</h1>
            </a>
            <a href="https://on3iro.github.io/aeons-end-randomizer/" target="_blank">
              <h1>New Fan Made Randomizer</h1>
            </a>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
