<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Encounter</v-toolbar-title>
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
    name: 'encounter-deck',
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
            title: 'Ambush Attack',
            src: '/static/img/cards/encounter/ambush_attack_2.png'
          },
          {
            drawn: false,
            title: 'Attack 1',
            src: '/static/img/cards/encounter/attack_1.png'
          },
          {
            drawn: false,
            title: 'Attack 2 Clue',
            src: '/static/img/cards/encounter/Attack_2_clue.png'
          },
          {
            drawn: false,
            title: 'attack portal',
            src: '/static/img/cards/encounter/attack_portal.png'
          },
          {
            drawn: false,
            title: 'Encounter 1',
            src: '/static/img/cards/encounter/Encounter_1.png'
          },
          {
            drawn: false,
            title: 'Encounter 1',
            src: '/static/img/cards/encounter/Encounter_1.png'
          },
          {
            drawn: false,
            title: 'Encounter 3 clue',
            src: '/static/img/cards/encounter/Encounter_3_clue.png'
          },
          {
            drawn: false,
            title: 'Encounter Portal clue',
            src: '/static/img/cards/encounter/encounter_portal_clue.png'
          },
          {
            drawn: false,
            title: 'EncounterX2_1',
            src: '/static/img/cards/encounter/EncounterX2_1.png'
          },
          {
            drawn: false,
            title: 'EncounterX2_1_clue',
            src: '/static/img/cards/encounter/EncounterX2_1_clue.png'
          },
          {
            drawn: false,
            title: 'EncounterX2_2',
            src: '/static/img/cards/encounter/EncounterX2_2.png'
          },
          {
            drawn: false,
            title: 'growing_dread_enc_2_clue',
            src: '/static/img/cards/encounter/growing_dread_enc_2_clue.png'
          }
        ]
      }
    },
    beforeDestroy() {
      // Save the State?
    }
  }
</script>

