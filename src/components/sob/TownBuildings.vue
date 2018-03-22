<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Town Buildings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="shuffleDeck()">
          <v-icon>mdi-shuffle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list v-model="Deck">
        <v-list-tile v-for="item in Deck" :key="item.title">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'town-buildings',
    mounted() {
      if (localStorage.getItem('townBuildings')) {
        this.Deck = JSON.parse(localStorage.getItem('townBuildings'));
      } else {
        this.shuffleDeck();
      }
    },
    methods: {
      shuffleDeck() {
        this.shuffle(this.Deck)
        localStorage.setItem('townBuildings', JSON.stringify(this.Deck));
      },
      // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue
        }
        return array
      }
    },
    data() {
      return {
        Deck: [
          {
            title: 'Ambush Attack'
          },
          {
            title: 'Attack 1'
          },
          {
            title: 'Attack 2 Clue'
          },
          {
            title: 'attack portal'
          },
          {
            title: 'Encounter 1'
          },
          {
            title: 'Encounter 3 clue'
          },
          {
            title: 'Encounter Portal clue'
          },
          {
            title: 'EncounterX2_1'
          },
          {
            title: 'EncounterX2_1_clue'
          },
          {
            title: 'EncounterX2_2'
          },
          {
            title: 'growing_dread_enc_2_clue'
          }
        ]
      }
    }
  }
</script>

