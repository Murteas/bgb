<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Town Daily Event</v-toolbar-title>
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
    name: 'town-daily-events',
    mounted() {
      if (localStorage.getItem('townDailyEvents')) {
        this.Deck = JSON.parse(localStorage.getItem('townDailyEvents'));
        this.numDrawn = parseInt(localStorage.getItem('dailyEventsNumDrawn'));
      } else {
        this.shuffleDeck();
      }
    },
    watch: {
      numDrawn: {
        handler() {
          localStorage.setItem('dailyEventsNumDrawn', this.numDrawn.toString());
        }
      }
    },
    methods: {
      shuffleDeck() {
        this.numDrawn = 0;
        this.shuffle(this.Deck)
        localStorage.setItem('townDailyEvents', JSON.stringify(this.Deck));
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
            title: 'Found Something',
            src: '/static/img/cards/townDailyEvents/FoundSomething.JPG'
          },
          {
            drawn: false,
            title: 'Hangin',
            src: '/static/img/cards/townDailyEvents/Hangin.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/HighNoon.JPG',
            src: '/static/img/cards/townDailyEvents/HighNoon.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/MarketDown.JPG',
            src: 'static/img/cards/townDailyEvents/MarketDown.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/MarketUp.JPG',
            src: '/static/img/cards/townDailyEvents/MarketUp.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/Mob.JPG',
            src: 'static/img/cards/townDailyEvents/Mob.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/NoEffect.JPG',
            src: '/static/img/cards/townDailyEvents/NoEffect.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/NoEffect.JPG',
            src: '/static/img/cards/townDailyEvents/NoEffect.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/NoEffect.JPG',
            src: '/static/img/cards/townDailyEvents/NoEffect.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/NoEffect.JPG',
            src: '/static/img/cards/townDailyEvents/NoEffect.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/OpenSkies.JPG',
            src: '/static/img/cards/townDailyEvents/OpenSkies.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/Persecution.JPG',
            src: '/static/img/cards/townDailyEvents/Persecution.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/Rain.JPG',
            src: '/static/img/cards/townDailyEvents/Rain.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/StrangeLights.JPG',
            src: '/static/img/cards/townDailyEvents/StrangeLights.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/TonicWagon.JPG',
            src: '/static/img/cards/townDailyEvents/TonicWagon.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/WoundedSoldiers.JPG',
            src: '/static/img/cards/townDailyEvents/WoundedSoldiers.JPG'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/AHelpingHand.jpg',
            src: '/static/img/cards/townDailyEvents/AHelpingHand.jpg'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/IveSeenThings.jpg',
            src: '/static/img/cards/townDailyEvents/IveSeenThings.jpg'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/LookingForWork.jpg',
            src: '/static/img/cards/townDailyEvents/LookingForWork.jpg'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/TheyveAllHeardStories.jpg',
            src: '/static/img/cards/townDailyEvents/TheyveAllHeardStories.jpg'
          },
          {
            drawn: false,
            title: 'static/img/cards/townDailyEvents/TaintedByDarkness.jpg',
            src: '/static/img/cards/townDailyEvents/TaintedByDarkness.jpg'
          }
        ]
      }
    }
  }
</script>

