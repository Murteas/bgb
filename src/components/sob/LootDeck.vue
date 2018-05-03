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
        <v-flex sm6 md6 v-for="(value, i) in numDrawn" :key="i">
          <img class="image" :src="Deck[i].src" :alt="Deck[i].title"
               width="85%">
        </v-flex>
      </v-layout>
    </v-layout>
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

