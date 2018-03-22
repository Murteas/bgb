<template>
  <v-container fluid>
    <v-card>
      <v-toolbar card>
        <v-toolbar-title>Town Buildings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="shuffleDeck()">
          <v-icon>mdi-shuffle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list v-model="Deck">
        <v-list-tile v-for="item in Deck" :key="item.title">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: 'town-buildings',
    mounted() {
      if (localStorage.getItem('townBuildings')) {
        this.Deck = JSON.parse(localStorage.getItem('townBuildings'));
      } else {
        this.shuffleDeck();
      }
    },
    methods: {
      shuffleDeck() {
        // This modifies the passed in deck, as well as returns it
        this.shuffle(this.Deck)
        localStorage.setItem('townBuildings', JSON.stringify(this.Deck));
      }
    },
    data() {
      return {
        Deck: [
          {
            title: 'Saloon'
          },
          {
            title: 'Indian Trading Post'
          },
          {
            title: 'General Store'
          },
          {
            title: 'Smuggler\'s Den'
          },
          {
            title: 'Church'
          },
          {
            title: 'Frontier Outpost'
          },
          {
            title: 'Sherrif\'s Office'
          },
          {
            title: 'Doc\'s Office'
          },
          {
            title: 'Blacksmith'
          },
          {
            title: 'Gambling Hall'
          },
          {
            title: 'Mutant Quarter'
          },
          {
            title: 'Street Market'
          }
        ]
      }
    }
  }
</script>

