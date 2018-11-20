<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-layout row wrap>
        <v-btn @click.native="loadDeck()">
          <v-icon>mdi-disk</v-icon>
          <span>Load Deck</span>
        </v-btn>
        <v-btn @click.native="shuffleDeck()">
          <v-icon>mdi-shuffle</v-icon>
          <span>Shuffle</span>
        </v-btn>
        <v-btn @click.native="drawCard()">
          <v-icon>mdi-cards</v-icon>
          <span>Draw Card</span>
        </v-btn>
      </v-layout>
      <v-layout align-content-start row wrap>
        <v-flex v-for="(value, i) in numDrawn" :key="i">
          <v-chip :color="Deck[i].color" text-color="black">
            <v-avatar>
              <img :src="Deck[i].src" alt="Deck[i].title">
            </v-avatar>
            <h1>{{Deck[i].title}}</h1>
          </v-chip>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'chaos-bag',
    mounted() {
      console.log('App mounted!');
      if (localStorage.getItem('chaosBag')) {
        this.Deck = JSON.parse(localStorage.getItem('chaosBag'));
        this.numDrawn = parseInt(localStorage.getItem('chaosNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    watch: {
      numDrawn: {
        handler() {
          localStorage.setItem('chaosNumDrawn', this.numDrawn.toString());
        }
      }
    },
    methods: {
      addToken: function (cardType) {
        this.Deck.push(this.CardTypes[cardType]);
      },
      loadDeck() {
        if (localStorage.getItem('chaosBag')) {
          this.Deck = JSON.parse(localStorage.getItem('chaosBag'));
        }
        this.shuffleDeck();
      },
      shuffleDeck() {
        this.numDrawn = 0;
        this.shuffle(this.Deck)
        localStorage.setItem('chaosBag', JSON.stringify(this.Deck));
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
        CardTypes: [
          {
            drawn: false,
            title: 'Blank',
            src: '/static/img/arkham/mythosTokens/blank.png',
            color: 'grey darken-1'
          },
          {
            drawn: false,
            title: 'Clue',
            src: '/static/img/arkham/mythosTokens/clue.png',
            color: 'green darken-1'
          },
          {
            drawn: false,
            title: 'Headline',
            src: '/static/img/arkham/mythosTokens/headline.png',
            color: 'yellow darken-1'
          },
          {
            drawn: false,
            title: 'Doom',
            src: '/static/img/arkham/mythosTokens/doom.png',
            color: 'red darken-4'
          },
          {
            drawn: false,
            title: 'Monster',
            src: '/static/img/arkham/mythosTokens/monster.png',
            color: 'purple'
          },
          {
            drawn: false,
            title: 'Anomaly',
            src: '/static/img/arkham/mythosTokens/anomaly.png',
            color: 'blue'
          },
          {
            drawn: false,
            title: 'Reckoning',
            src: '/static/img/arkham/mythosTokens/reckoning.png',
            color: 'red'
          }
        ],
        Deck: []
      }
    }
  }
</script>

