<template>
  <v-app dark>
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
        appTitle: 'Shadows of Brimstone Assistant',
        sidebar: false,
        menuItems: [
          {title: 'Scavenge', path: '/scavenge', icon: 'fa-search'}
        ]
      }
    }
  }
</script>

