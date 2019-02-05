<template>
  <v-container fluid grid-list-sm>
    <v-layout column>
      <v-layout row wrap>
        <v-btn @click.native="shuffleDeck()">
          <v-icon>mdi-shuffle</v-icon>
          <span>Shuffle</span>
        </v-btn>
        <v-btn @click.native="drawCard()">
          <v-icon>mdi-cards</v-icon>
          <span>Draw Card</span>
        </v-btn>
      </v-layout>
      <v-layout row wrap>
        <v-flex sm4 md4 v-for="(value, i) in numDrawn" :key="i">
          <img class="image" :src="Deck[i].src" :alt="Deck[i].title"
               width="85%">
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  import ENCOUNTER_TOKENS from './data/encounterTokens.json'
  export default {
    name: 'encounter-deck',
    mounted() {
      console.log('App mounted!');
      if (localStorage.getItem('encounterDeck')) {
        this.Deck = JSON.parse(localStorage.getItem('encounterDeck'));
        this.numDrawn = parseInt(localStorage.getItem('encounterNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    watch: {
      numDrawn: {
        handler() {
          localStorage.setItem('encounterNumDrawn', this.numDrawn.toString());
        }
      }
    },
    methods: {
      shuffleDeck() {
        this.numDrawn = 0;
        this.shuffle(this.Deck)
        localStorage.setItem('encounterDeck', JSON.stringify(this.Deck));
      },
      drawCard() {
        this.numDrawn++;
        if (this.numDrawn >= this.Deck.length) {
          this.numDrawn = this.Deck.length;
        }
      }
    },
    data() {
      return {
        numDrawn: 0,
        Deck: ENCOUNTER_TOKENS
      }
    }
  }
</script>

