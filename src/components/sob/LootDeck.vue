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
    created: function () {
      this.shuffleDeck()
    },
    methods: {
      shuffleDeck() {
        this.numDrawn = 0
        this.shuffle(this.Deck)
      },
      // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      shuffle(array) {
        var currentIndex = array.length
        var temporaryValue, randomIndex
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
          temporaryValue = array[currentIndex]
          array[currentIndex] = array[randomIndex]
          array[randomIndex] = temporaryValue
        }
        return array
      },
      drawCard() {
        this.numDrawn++
        if (this.numDrawn >= this.Deck.length) {
          this.numDrawn = this.Deck.length
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
    },
    beforeDestroy() {
      // Save the State?
    }
  }
</script>

