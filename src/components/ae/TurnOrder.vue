<template>
  <v-container fluid justify-start>
    <v-layout column>
      <v-layout row wrap>
        <v-btn @click.native="shuffleDeck()">
          <v-icon>mdi-shuffle</v-icon>
          <b>Shuffle</b>
        </v-btn>
        <v-btn @click.native="drawCard()">
          <v-icon>mdi-cards</v-icon>
          <b>Draw</b>
        </v-btn>
        <v-tooltip top v-model="revealToolTip">
          <v-chip :color="topCard.color" text-color="black">
            <h1>{{topCard.title}}</h1>
          </v-chip>
          <v-btn slot="activator" @click.native="revealTop()">
            <v-icon>mdi-eye</v-icon>
            <b>Reveal</b>
          </v-btn>
        </v-tooltip>
        <v-btn @click.native="moveTopToBottom()">
          <v-icon>mdi-arrow-down</v-icon>
          <b>Top to Bottom</b>
        </v-btn>
      </v-layout>
      <v-layout row wrap>
        <v-flex v-for="(value, i) in numDrawn" :key="i">
          <v-chip :color="Deck[i].color" text-color="black">
            <h1>{{Deck[i].title}}</h1>
          </v-chip>
        </v-flex>
      </v-layout>
    </v-layout>

  </v-container>
</template>
<script>
  export default {
    name: 'turn-order-deck',
    mounted() {
      if (localStorage.getItem('turnOrderDeck')) {
        this.Deck = JSON.parse(localStorage.getItem('turnOrderDeck'));
        this.numDrawn = parseInt(localStorage.getItem('turnOrderNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    watch: {
      numDrawn: {
        handler() {
          localStorage.setItem('turnOrderNumDrawn', this.numDrawn.toString());
        }
      }
    },
    methods: {
      shuffleDeck() {
        this.numDrawn = 0;
        this.shuffle(this.Deck);
        localStorage.setItem('turnOrderDeck', JSON.stringify(this.Deck));
      },
      drawCard() {
        this.numDrawn++;
        if (this.numDrawn >= this.Deck.length) {
          this.numDrawn = this.Deck.length;
        }
      },
      revealTop() {
        if (this.numDrawn >= this.Deck.length) {
          this.shuffleDeck();
        }
        this.topCard = this.Deck[this.numDrawn];
        this.revealToolTip = true;
      },
      moveTopToBottom() {
        if (this.numDrawn < this.Deck.length) {
          this.Deck.push(this.Deck.splice(this.numDrawn, 1)[0]);
        } else {
          this.shuffleDeck();
        }
      }
    },
    data() {
      return {
        revealToolTip: false,
        topCard: {drawn: false, title: 'Unknown', color: 'black'},
        numDrawn: 0,
        Deck: [
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

