<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex md6 sm6>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Dice Roll</div>
            <dice-roll/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import DiceRoll from './fww/DiceRoll'

  export default {
    components: {
      DiceRoll,
      'dice-roll': DiceRoll
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
