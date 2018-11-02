<template>
  <v-container grid-list-md justify-start>
    <v-layout row wrap>
      <v-flex xs4 sm6 md6>
        <v-layout align-content-start column>
          <v-btn @click.native="addDie(0)">
            <v-icon color="white">mdi-hexagon</v-icon>
          </v-btn>
          <v-btn @click.native="addDie(1)">
            <v-icon color="black">mdi-pentagon</v-icon>
          </v-btn>
          <v-btn @click.native="addDie(2)">
            <v-icon color="green">mdi-pentagon</v-icon>
          </v-btn>
          <v-btn @click.native="addDie(3)">
            <v-icon color="yellow">mdi-pentagon</v-icon>
          </v-btn>
          <v-btn @click.native="addDie(4)">
            <v-icon color="blue">mdi-pentagon</v-icon>
          </v-btn>
          <v-btn @click.native="addDie(5)">
            <v-icon color="red">mdi-pentagon</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs8 sm6 md6>
        <v-layout align-content-start column wrap>
          <v-flex v-for="(value, i) in numDrawn" :key="i">
            <v-chip :color="Deck[i].color" text-color="black">
              <h1>{{Deck[i].title}}</h1>
            </v-chip>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
  export default {
    name: 'dice-roll',
    methods: {
      addDie: function (dieType) {
        this.numDrawn = 0;
        this.shuffle(this.Deck);
        localStorage.setItem('turnOrderDeck', JSON.stringify(this.Deck));
      },
      roll() {
        //Do something
      }
    },
    data() {
      return {
        Dice: [
          {
            drawn: false,
            title: 'Nemesis',
            color: 'lime darken-4'
          },
          {
            drawn: false,
            title: 'Nemesis',
            color: 'lime darken-4'
          },
          {
            drawn: false,
            title: 'Player 1',
            color: 'red darken-2'
          },
          {
            drawn: false,
            title: 'Player 1',
            color: 'red darken-2'
          },
          {
            drawn: false,
            title: 'Player 2',
            color: 'green darken-2'
          },
          {
            drawn: false,
            title: 'Player 2',
            color: 'green darken-2'
          }
        ]
      }
    }
  }
</script>
