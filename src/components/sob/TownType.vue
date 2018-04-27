<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Town Type</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="drawCard()">
          <v-icon>mdi-cards</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-sm>
        <v-layout content-align-center>
          <v-flex><h1>{{die1}} + {{die2}} = {{rollSum}}</h1></v-flex>
          <v-flex><h1>{{Deck[currentIndex].title}}</h1></v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'town-type',
    mounted() {
      this.drawCard();
    },
    methods: {
      drawCard() {
        this.die1 = this.rollDice(1, 6);
        this.die2 = this.rollDice(1, 6);
        this.rollSum = this.die1 + this.die2;
        this.currentIndex = this.rollSum - 2;
      }
    },
    data() {
      return {
        die1: 0,
        die2: 0,
        rollSum: 0,
        currentIndex: 5,
        Deck: [
          {
            title: 'Town Ruins'
          },
          {
            title: 'Haunted Town'
          },
          {
            title: 'Plague Town'
          },
          {
            title: 'Rail Town'
          },
          {
            title: 'Normal Town'
          },
          {
            title: 'Normal Town'
          },
          {
            title: 'Normal Town'
          },
          {
            title: 'Mutant Town'
          },
          {
            title: 'River Town'
          },
          {
            title: 'Mining Town'
          },
          {
            title: 'Outlaw Town'
          }
        ]
      }
    }
  }
</script>

