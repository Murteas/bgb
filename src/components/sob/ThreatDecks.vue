<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-btn @click.native="DarknessRoll()">
        <v-icon>mdi-dice-multiple</v-icon>
        <b>Roll</b>
      </v-btn>
      <v-btn :color="locationColor" @click.native="nextWorld()">{{currentLocation}}</v-btn>
      <h1>{{die1}} + {{die2}} = {{rollSum}} </h1>
      <v-flex xs12>{{currentEffect}}</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import EPIC_THREAT from './data/mineEpicThreat.json'
  import HIGH_THREAT from './data/mineHighThreat.json'
  import MED_THREAT from './data/mineMedThreat.json'
  import LOW_THREAT from './data/mineLowThreat.json'
  export default {
    name: 'threat-decks',
    mounted() {
      if (localStorage.getItem('lowThreatDeck')) {
        this.Deck = JSON.parse(localStorage.getItem('lootDeck'));
        this.numDrawn = parseInt(localStorage.getItem('lootNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    methods: {
      DarknessRoll() {
        this.die1 = this.rollDice(1, 6);
        this.die2 = this.rollDice(1, 6);
        this.rollSum = this.die1 + this.die2;
        this.UpdateEventText();
      },
      UpdateEventText() {
        if (this.die1 !== this.die2) {
          this.currentEffect = 'No event'
        } else {
          let dieRoll = this.die1 - 1;
          switch (this.currentLocation) {
            case 'Mines':
              this.currentEffect = 'Mines: ' + this.depthEvents.Mines[dieRoll].description;
              break;
            case 'Targa':
              this.currentEffect = 'Targa: ' + this.depthEvents.Targa[dieRoll].description;
              break;
            case 'Jargono':
              this.currentEffect = 'Jargono: ' + this.depthEvents.Jargono[dieRoll].description;
              break;
            case 'Cynder':
              this.currentEffect = 'Cynder: ' + this.depthEvents.Cynder[dieRoll].description;
              break;
            case 'Trederra':
              this.currentEffect = 'Trederra: ' + this.depthEvents.Trederra[dieRoll].description;
              break;
            case 'DerelictShip':
              this.currentEffect = 'Derelict Ship: ' + this.depthEvents.DerelictShip[dieRoll].description;
              break;
            case 'Town':
              this.currentEffect = 'Town: ' + this.depthEvents.Town[dieRoll].description;
              break;
            case 'BlastedWastes':
              this.currentEffect = 'Blasted Wastes: ' + this.depthEvents.BlastedWastes[dieRoll].description;
              break;
            case 'Canyon':
              this.currentEffect = 'Canyon: ' + this.depthEvents.Canyon[dieRoll].description;
              break;
            case 'Belly':
              this.currentEffect = 'Belly: ' + this.depthEvents.Belly[dieRoll].description;
              break;
            case 'Forest':
              this.currentEffect = 'Forest: ' + this.depthEvents.Forest[dieRoll].description;
              break;
            case 'Fortress':
              this.currentEffect = 'Fortress: ' + this.depthEvents.Fortress[dieRoll].description;
              break;
          }
        }
      },
      nextWorld() {
        this.locationIndex += 1;
        if (this.locationIndex >= this.Worlds.length) {
          this.locationIndex = 0;
        }
        this.currentLocation = this.Worlds[this.locationIndex].name;
        this.locationColor = this.Worlds[this.locationIndex].color;
        this.UpdateEventText();
      }
    },
    data() {
      return {
        die1: 0,
        die2: 0,
        rollSum: 0,
        currentEffect: '',
        currentLocation: 'Mines',
        locationColor: 'blue-grey darken-4',
        locationIndex: 0,
        Worlds: WORLDS_INFO,
        depthEvents: DEPTH_EVENTS
      }
    }
  }
</script>

