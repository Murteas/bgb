<template>
  <v-app dark>
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-xs-only">
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
    <main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </main>
    <v-footer app height="auto">
      <dice-roller/>
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
        sheet: false,
        appTitle: 'Board Game Buddy',
        menuItems: [
          {title: 'SoB', path: '/sob', icon: 'fa-search'},
          {title: 'Aeon\'s End', path: '/aeon', icon: 'fa-gem'}
        ]
      }
    }
  }
</script>

