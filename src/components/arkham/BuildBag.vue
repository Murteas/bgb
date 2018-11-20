<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-layout column>
        <v-btn @click.native="addToken(0)">
          <h3>Blank</h3>
        </v-btn>
        <v-btn @click.native="addToken(1)">
          <h3>Clue</h3>
        </v-btn>
        <v-btn @click.native="addToken(2)">
          <h3>Headline</h3>
        </v-btn>
        <v-btn @click.native="addToken(3)">
          <h3>Doom</h3>
        </v-btn>
        <v-btn @click.native="addToken(4)">
          <h3>Monster</h3>
        </v-btn>
        <v-btn @click.native="addToken(5)">
          <h3>Anomaly</h3>
        </v-btn>
        <v-btn @click.native="addToken(6)">
          <h3>Reckoning</h3>
        </v-btn>
        <v-btn color="red" @click.native="clearDeck()">
          <h1>Reset Deck</h1>
        </v-btn>
        <v-btn color="green" @click.native="shuffleDeck()">
          <h1>Save Deck</h1>
        </v-btn>
      </v-layout>
      <v-list v-model="TypeCount">
        <v-list-tile v-for="item in TypeCount" :key="item.title">
          <v-list-tile-content>
            <v-list-tile-title>
              <h3>{{item.title}} x {{item.count}}</h3>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'build-bag',
    methods: {
      addToken: function (cardType) {
        this.Deck.push(this.CardTypes[cardType]);
        this.TypeCount[cardType].count += 1;
      },
      clearDeck() {
        this.Deck = [];
        for (var i = 0; i < this.TypeCount.length; i++) {
          this.TypeCount[i].count = 0;
        }
      },
      shuffleDeck() {
        localStorage.setItem('chaosBag', JSON.stringify(this.Deck));
      }
    },
    data() {
      return {
        TypeCount: [
          {
            title: 'Blank',
            count: 0
          },
          {
            title: 'Clue',
            count: 0
          },
          {
            title: 'Headline',
            count: 0
          },
          {
            title: 'Doom',
            count: 0
          },
          {
            title: 'Monster',
            count: 0
          },
          {
            title: 'Anomaly',
            count: 0
          },
          {
            title: 'Reckoning',
            count: 0
          },
        ],
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

