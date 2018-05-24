<template>
  <v-container fluid grid-list-sm>
    <v-layout column>
      <v-btn @click.native="rollAll()">
        <v-icon>mdi-dice-multiple</v-icon>
        <b>Roll All</b>
      </v-btn>
    <v-layout v-for="player in players" :key="player.name" row>
      <v-btn @click.native="roll(player)">
        <v-icon>mdi-dice-6</v-icon>
        <b>Roll</b>
      </v-btn>
      <v-chip color="green"><h1>{{player.die1}}</h1></v-chip>
      <v-chip color="yellow"><h1>{{player.die2}}</h1></v-chip>
      <v-chip color="blue"><h1>{{player.die3}}</h1></v-chip>
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
      rollAll: function() {
        this.players.forEach(this.roll);
      },
      roll: function(player) {
        player.die1 = this.rollDice(1, 10);
        player.die2 = this.rollDice(1, 10);
        player.die3 = this.rollDice(1, 10);
      }
    },
    data() {
      return {
        players: [
          {
            name: 'P1',
            die1: 0,
            die2: 0,
            die3: 0
          },
          {
            name: 'P2',
            die1: 0,
            die2: 0,
            die3: 0
          },
          {
            name: 'P3',
            die1: 0,
            die2: 0,
            die3: 0
          },
          {
            name: 'P4',
            die1: 0,
            die2: 0,
            die3: 0
          }
        ]
      }
    }
  }
</script>

