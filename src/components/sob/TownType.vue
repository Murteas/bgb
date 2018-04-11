<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Town Type</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="drawCard()">
          <v-icon>mdi-cards</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-sm>
        <v-layout row wrap v-bind:datasrc="currentIndex">
          <v-flex>
            <img class="image" :src="Deck[currentIndex].src" :alt="Deck[currentIndex].title"
                 width="75%">
          </v-flex>
          <v-flex >
            <img class="image" :src="Deck[currentIndex].back_src" :alt="Deck[currentIndex].title"
                 width="75%">
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'town-type',
    mounted() {
      this.drawCard();
    },
    methods: {
      drawCard() {
        this.currentIndex = this.rollDice(2, 6) - 2;
      }
    },
    data() {
      return {
        currentIndex: 5,
        Deck: [
          {
            title: 'Town Ruins',
            src: 'static/img/cards/townType/TownRuinsF.JPG',
            back_src: 'static/img/cards/townType/TownRuinsB.JPG'
          },
          {
            title: 'Haunted Town',
            src: 'static/img/cards/townType/HauntedTownF.JPG',
            back_src: 'static/img/cards/townType/HauntedTownB.JPG'
          },
          {
            title: 'Plague Town',
            src: 'static/img/cards/townType/PlagueTownF.JPG',
            back_src: 'static/img/cards/townType/PlagueTownB.JPG'
          },
          {
            title: 'Rail Town',
            src: 'static/img/cards/townType/RailTownF.JPG',
            back_src: 'static/img/cards/townType/RailTownB.JPG'
          },
          {
            title: 'Normal Town',
            src: 'static/img/icons/apple-touch-icon-152x152.png',
            back_src: 'static/img/icons/apple-touch-icon-152x152.png'
          },
          {
            title: 'Normal Town',
            src: 'static/img/icons/apple-touch-icon-152x152.png',
            back_src: 'static/img/icons/apple-touch-icon-152x152.png'
          },
          {
            title: 'Normal Town',
            src: 'static/img/icons/apple-touch-icon-152x152.png',
            back_src: 'static/img/icons/apple-touch-icon-152x152.png'
          },
          {
            title: 'Mutant Town',
            src: 'static/img/cards/townType/MutantTownF.JPG',
            back_src: 'static/img/cards/townType/MutantTownB.JPG'
          },
          {
            title: 'River Town',
            src: 'static/img/cards/townType/RiverTownF.JPG',
            back_src: 'static/img/cards/townType/RiverTownB.JPG'
          },
          {
            title: 'Mining Town',
            src: 'static/img/cards/townType/MiningTownF.JPG',
            back_src: 'static/img/cards/townType/MiningTownB.JPG'
          },
          {
            title: 'Outlaw Town',
            src: 'static/img/cards/townType/OutlawTownF.JPG',
            back_src: 'static/img/cards/townType/OutlawTownB.JPG'
          }
        ]
      }
    }
  }
</script>

