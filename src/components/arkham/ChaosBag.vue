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
      <v-layout align-content-start row wrap>
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
        Deck: [
          {
            drawn: false,
            title: 'Blank',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'gray'
          },
          {
            drawn: false,
            title: 'Blank',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'gray'
          },
          {
            drawn: false,
            title: 'Blank',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'gray'
          },
          {
            drawn: false,
            title: 'Blank',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'gray'
          },
          {
            drawn: false,
            title: 'Clue',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'green'
          },
          {
            drawn: false,
            title: 'Clue',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'green'
          },
          {
            drawn: false,
            title: 'Headline',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'yellow'
          },
          {
            drawn: false,
            title: 'Headline',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'yellow'
          },
          {
            drawn: false,
            title: 'Doom',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'purple'
          },
          {
            drawn: false,
            title: 'Doom',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'purple'
          },
          {
            drawn: false,
            title: 'Doom',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'purple'
          },
          {
            drawn: false,
            title: 'Doom',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'purple'
          },
          {
            drawn: false,
            title: 'Monster',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'red'
          },
          {
            drawn: false,
            title: 'Monster',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'red'
          },
          {
            drawn: false,
            title: 'Monster',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'red'
          },
          {
            drawn: false,
            title: 'Anomaly',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'blue'
          },
          {
            drawn: false,
            title: 'Anomaly',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'blue'
          },
          {
            drawn: false,
            title: 'Reckoning',
            src: '/static/img/arkham/mythosTokens/hires_tokens.png',
            color: 'red darken-4'
          }
        ]
      }
    }
  }
</script>

