<template>
  <v-app dark>
    <!--<v-navigation-drawer temporary v-model="sidebar">-->
      <!--<v-btn flat icon color="white" @click.native.stop="sheet = !sheet">-->
        <!--<v-icon>mdi-dice-multiple</v-icon>-->
      <!--</v-btn>-->
      <!--<v-spacer/>-->
      <!--<v-list>-->
        <!--<v-list-tile-->
          <!--v-for="item in menuItems"-->
          <!--:key="item.title"-->
          <!--:to="item.path">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>{{ item.icon }}</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>{{ item.title }}</v-list-tile-content>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <v-toolbar fixed>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click.stop="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <!--<v-btn flat icon color="white" @click.native.stop="sheet = !sheet">-->
          <!--<v-icon>mdi-dice-multiple</v-icon>-->
        <!--</v-btn>-->
        <!--<v-spacer/>-->
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main >
      <v-container fluid>
        <router-view/>
      </v-container>
    </main>
    <v-footer>
      <dice-roller/>
    </v-footer>
  </v-app>

</template>
<script>
  import DiceRoller from './components/sob/DiceRoller'

  export default {
    components: {
      DiceRoller,
      'dice-roller': DiceRoller
    },
    data () {
      return {
        sheet: false,
        appTitle: 'Board Game Buddy',
        sidebar: false,
        menuItems: [
          {title: 'Gloomhaven', path: '/gh', icon: 'mdi-hexagon'},
          {title: 'Shadows of Brimstone', path: '/sob', icon: 'mdi-star-circle'}
        ]
      }
    }
  }
</script>

