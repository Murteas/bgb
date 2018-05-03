<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Hold Back the Darkness</div>
            <darkness-roll/>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Encounter Deck</div>
            <encounter-deck/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Scavenge Deck</div>
            <scavenge-deck/>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Loot Deck</div>
            <loot-deck/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Town Daily Events Deck</div>
            <town-daily-events/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md12 sm12>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Town Panel</div>
            <town-panel/>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Hero Panel</div>
            <hero-panel/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>

    <!--<v-dialog v-model="lootDialog" scrollable max-width="600px">-->
    <!--<loot-deck/>-->
    <!--</v-dialog>-->
    <!--<v-dialog v-model="scavengeDialog" scrollable max-width="600px">-->
    <!--<scavenge-deck/>-->
    <!--</v-dialog>-->
    <!--<v-dialog v-model="encounterDialog" scrollable max-width="600px">-->
    <!--<encounter-deck/>-->
    <!--</v-dialog>-->
    <!--<v-dialog v-model="townDailyEventsDialog" scrollable max-width="600px">-->
    <!--<town-daily-events/>-->
    <!--</v-dialog>-->
    <!--<v-dialog v-model="townBuildingsDialog" scrollable max-width="400px">-->
    <!--<town-buildings/>-->
    <!--</v-dialog>-->
    <!--<v-dialog v-model="townTypeDialog" scrollable max-width="400px">-->
    <!--<town-type/>-->
    <!--</v-dialog>-->
    <!--<v-dialog v-model="darknessRollDialog" scrollable max-width="600px">-->
    <!--<darkness-roll/>-->
    <!--</v-dialog>-->
    <!--</v-container>-->
    <!--<v-speed-dial bottom left direction="Right" v-model="fab">-->
    <!--<v-btn slot="activator" color="black" fab v-model="fab">-->
    <!--<v-icon>mdi-chevron-double-up</v-icon>-->
    <!--<v-icon>mdi-chevron-double-down</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="grey darken-3" @click.stop="townBuildingsDialog=!townBuildingsDialog">-->
    <!--<v-icon>mdi-home-variant</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="teal darken-3" @click.stop="townTypeDialog=!townTypeDialog">-->
    <!--<v-icon>mdi-city</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="indigo" @click.stop="townDailyEventsDialog=!townDailyEventsDialog">-->
    <!--<v-icon>mdi-calendar-question</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="amber darken-2" @click.stop="lootDialog=!lootDialog">-->
    <!--<v-icon>mdi-treasure-chest</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="brown" @click.stop="scavengeDialog=!scavengeDialog">-->
    <!--<v-icon>mdi-magnify</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="blue darken-2" @click.stop="encounterDialog=!encounterDialog">-->
    <!--<v-icon>mdi-door</v-icon>-->
    <!--</v-btn>-->
    <!--<v-btn fab small color="black" @click.stop="darknessRollDialog=!darknessRollDialog">-->
    <!--<v-icon>mdi-theme-light-dark</v-icon>-->
    <!--</v-btn>-->
    <!--</v-speed-dial>-->
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import HeroPanel from './sob/HeroPanel'
  import LootDeck from './sob/LootDeck'
  import ScavengeDeck from './sob/ScavengeDeck'
  import EncounterDeck from './sob/EncounterDeck'
  import DiceRoller from './general/DiceRoller'
  import TownBuildings from './sob/TownBuildings'
  import TownDailyEvents from './sob/TownDailyEvents'
  import TownType from './sob/TownType'
  import DarknessRoll from './sob/DarknessRoll'
  import TownPanel from './sob/TownPanel'

  export default {
    components: {
      DiceRoller,
      'dice-roller': DiceRoller,
      HeroPanel,
      'hero-panel': HeroPanel,
      LootDeck,
      'loot-deck': LootDeck,
      ScavengeDeck,
      'scavenge-deck': ScavengeDeck,
      EncounterDeck,
      'encounter-deck': EncounterDeck,
      TownBuildings,
      'town-buildings': TownBuildings,
      TownDailyEvents,
      'town-daily-events': TownDailyEvents,
      TownType,
      'town-type': TownType,
      DarknessRoll,
      'darkness-roll': DarknessRoll,
      TownPanel,
      'town-panel': TownPanel
    },
    data() {
      return {
        fab: false,
        lootDialog: false,
        scavengeDialog: false,
        encounterDialog: false,
        townBuildingsDialog: false,
        townDailyEventsDialog: false,
        townTypeDialog: false,
        darknessRollDialog: false
      }
    }

  }
</script>
