<template>
  <v-container fluid grid-list-sm >
    <v-layout column >
      <v-layout v-for="player in players" :key="player.name" row wrap>
        <v-flex md12 sm12 xs12>
        <v-btn @click.native="roll(player)">
          <v-icon>mdi-dice-6</v-icon>
          <b>Roll</b>
        </v-btn>
        <v-btn round color="green" @click.native="player.navigateDie = hexRoll()"><h1>{{player.navigateDie}}</h1>
        </v-btn>
        <v-btn round color="yellow darken-2" @click.native="player.exploreDie = hexRoll()"><h1>
          {{player.exploreDie}}</h1></v-btn>
        <v-btn round color="blue" @click.native="player.survivalDie = hexRoll()"><h1>{{player.survivalDie}}</h1></v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'explore-roll',
    mounted() {
      this.rollAll();
    },
    methods: {
      rollAll: function () {
        this.players.forEach(this.roll);
      },
      roll: function (player) {
        player.navigateDie = this.hexRoll();
        player.exploreDie = this.hexRoll();
        player.survivalDie = this.hexRoll();
      },
      hexRoll: function () {
        let dieRoll = this.rollDice(1, 10);
        if (dieRoll === 1) {
          return 'HEX';
        }
        return dieRoll;
      }
    },
    data() {
      return {
        players: [
          {
            name: 'P1',
            navigateDie: 0,
            exploreDie: 0,
            survivalDie: 0
          },
          {
            name: 'P2',
            navigateDie: 0,
            exploreDie: 0,
            survivalDie: 0
          }
          // {
          //   name: 'P3',
          //   navigateDie: 0,
          //   exploreDie: 0,
          //   survivalDie: 0
          // },
          // {
          //   name: 'P4',
          //   navigateDie: 0,
          //   exploreDie: 0,
          //   survivalDie: 0
          // }
        ]
      }
    }
  }
</script>

