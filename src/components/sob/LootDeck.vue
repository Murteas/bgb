<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Loot</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="shuffleDeck()">
          <v-icon>mdi-shuffle</v-icon>
        </v-btn>
        <v-btn icon @click.native="drawCard()">
          <v-icon>mdi-cards</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex xs4 md4 lg3 v-for="(value, i) in numDrawn" :key="i">
            <img class="image" :src="Deck[i].src" :alt="Deck[i].title"
                 width="85%">
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'loot-deck',
    mounted() {
      if (localStorage.getItem('lootDeck')) {
        this.Deck = JSON.parse(localStorage.getItem('lootDeck'));
        this.numDrawn = parseInt(localStorage.getItem('lootNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    watch: {
      numDrawn: {
        handler() {
          localStorage.setItem('lootNumDrawn', this.numDrawn.toString());
        }
      }
    },
    methods: {
      shuffleDeck() {
        this.numDrawn = 0;
        this.shuffle(this.Deck);
        localStorage.setItem('lootDeck', JSON.stringify(this.Deck));
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
            title: 'Blood Money',
            src: '/static/img/cards/loot/loot_bloodMoney.png'
          },
          {
            drawn: false,
            title: 'Cash',
            src: '/static/img/cards/loot/loot_Cash.png'
          },
          {
            drawn: false,
            title: 'Coins',
            src: '/static/img/cards/loot/loot_coins.png'
          },
          {
            drawn: false,
            title: 'Dark Stone Rock',
            src: '/static/img/cards/loot/loot_DarkStoneRock.png'
          },
          {
            drawn: false,
            title: 'Dark Stone Shard',
            src: '/static/img/cards/loot/loot_DarkStoneShard.png'
          },
          {
            drawn: false,
            title: 'Gold Bars',
            src: '/static/img/cards/loot/loot_goldBars.png'
          },
          {
            drawn: false,
            title: 'Gold Dust',
            src: '/static/img/cards/loot/loot_goldDust.png'
          },
          {
            drawn: false,
            title: 'Gold Nuggets',
            src: '/static/img/cards/loot/loot_goldNuggets.png'
          },
          {
            drawn: false,
            title: 'Handy',
            src: '/static/img/cards/loot/loot_handy.png'
          },
          {
            drawn: false,
            title: 'What\'s This',
            src: '/static/img/cards/loot/loot_whatsThis.png'
          },
          {
            drawn: false,
            title: 'Handy',
            src: '/static/img/cards/loot/loot_handy.png'
          },
          {
            drawn: false,
            title: 'Dark Stone Shard',
            src: '/static/img/cards/loot/loot_DarkStoneShard.png'
          }
        ]
      }
    }
  }
</script>

