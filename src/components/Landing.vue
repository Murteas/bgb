<template>
  <v-container fluid grid-list-sm secondary>
    <v-layout>
      <v-expansion-panel expand>
        <v-expansion-panel-content v-for="hero in heroes">
          <div slot="header">
            <v-chip>
              <v-avatar>
                <img :src="hero.portrait" >
              </v-avatar>
              {{hero.name}}
            </v-chip>
          </div>
          <v-card>
            <v-card-text class="grey darken2">{{hero}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>

</template>

<script>
  /* eslint-disable space-before-function-paren */

  export default {
    methods: {
    },
    data() {
      return {
        heroes: [
          {name: 'Hero1', portrait: '/static/img/heroes/Bandido.png', hp: 10, maxHp: 10, sp: 10, maxSp: 10, agi: 1, cun: 1, spirit: 1, str: 1, lore: 1, luck: 1, ini: 1, combat: 2, melee: '4+', range: '4+', level: 1, defense: '4+', willpower: '4+', movement: 'd6', maxGrit: 2, maxCorr: 5, xp: 0},
          {name: 'Hero2', portrait: '/static/img/heroes/Lawman.png', hp: 10, maxHp: 10, sp: 10, maxSp: 10, agi: 1, cun: 1, spirit: 1, str: 1, lore: 1, luck: 1, ini: 1, combat: 2, melee: '4+', range: '4+', level: 1, defense: '4+', willpower: '4+', movement: 'd6', maxGrit: 2, maxCorr: 5, xp: 0},
          {name: 'Hero3', portrait: '/static/img/heroes/Outlaw.png', hp: 10, maxHp: 10, sp: 10, maxSp: 10, agi: 1, cun: 1, spirit: 1, str: 1, lore: 1, luck: 1, ini: 1, combat: 2, melee: '4+', range: '4+', level: 1, defense: '4+', willpower: '4+', movement: 'd6', maxGrit: 2, maxCorr: 5, xp: 0}
        ]
      }
    }
  }
</script>
