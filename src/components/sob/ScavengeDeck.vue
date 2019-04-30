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
               width="100%">
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  import SCAVENGE_CARDS from './data/scavengeCards.json'
  export default {
    name: 'scavenge-deck',
    mounted() {
      if (localStorage.getItem('scavengeDeck')) {
        this.Deck = JSON.parse(localStorage.getItem('scavengeDeck'));
        this.numDrawn = parseInt(localStorage.getItem('scavengeNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    watch: {
      numDrawn: {
        handler() {
          localStorage.setItem('scavengeNumDrawn', this.numDrawn.toString());
        }
      }
    },
    methods: {
      shuffleDeck() {
        this.numDrawn = 0;
        this.shuffle(this.Deck);
        localStorage.setItem('scavengeDeck', JSON.stringify(this.Deck));
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
        Deck: SCAVENGE_CARDS
      }
    }
  }
</script>

