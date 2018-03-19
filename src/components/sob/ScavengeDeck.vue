<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Scavenge</v-toolbar-title>
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
    name: 'scavenge-deck',
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
            title: 'Nothing',
            src: '/static/img/cards/scavenge/scav_nothing.png'
          },
          {
            drawn: false,
            title: 'Nothing',
            src: '/static/img/cards/scavenge/scav_nothing.png'
          },
          {
            drawn: false,
            title: 'Nothing',
            src: '/static/img/cards/scavenge/scav_nothing.png'
          },
          {
            drawn: false,
            title: 'Nothing',
            src: '/static/img/cards/scavenge/scav_nothing.png'
          },
          {
            drawn: false,
            title: 'Hideous',
            src: '/static/img/cards/scavenge/scav_hideous.png'
          },
          {
            drawn: false,
            title: 'Hideous',
            src: '/static/img/cards/scavenge/scav_hideous.png'
          },
          {
            drawn: false,
            title: 'Chilling',
            src: '/static/img/cards/scavenge/scav_chilling.png'
          },
          {
            drawn: false,
            title: 'Small',
            src: '/static/img/cards/scavenge/scav_small.png'
          },
          {
            drawn: false,
            title: 'Small',
            src: '/static/img/cards/scavenge/scav_small.png'
          },
          {
            drawn: false,
            title: 'Useful',
            src: '/static/img/cards/scavenge/scav_useful.png'
          },
          {
            drawn: false,
            title: 'Useful',
            src: '/static/img/cards/scavenge/scav_useful.png'
          },
          {
            drawn: false,
            title: 'Shiny',
            src: '/static/img/cards/scavenge/scav_shiny.png'
          }
        ]
      }
    },
    beforeDestroy() {
      // Save the State?
    }
  }
</script>

