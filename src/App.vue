<template>
  <v-app dark>

    <v-toolbar dark dense scroll-off-screen clipped-left>
      <v-toolbar-side-icon @click.stop="sidebar = !sidebar">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
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
    <v-navigation-drawer app temporary v-model="sidebar">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </main>
    <v-footer fixed height="auto">
        <dice-roller />
    </v-footer>
  </v-app>
</template>

<script>
  import DiceRoller from './components/general/DiceRoller'

  export default {
    components: {
      DiceRoller,
      'dice-roller': DiceRoller
    },
    data() {
      return {
        showDice: true,
        sidebar: false,
        sheet: false,
        appTitle: 'Board Game Buddy',
        menuItems: [
          {title: 'SoB', path: '/sob', icon: 'mdi-pickaxe'},
          {title: 'Aeon\'s End', path: '/aeon', icon: 'mdi-diamond'},
          {title: 'HexploreIt', path: '/hex', icon: 'mdi-hexagon-multiple'},
          {title: 'Arkham Horror', path: '/ah3', icon: 'mdi-skull'}
        ]
      }
    }
  }
</script>

