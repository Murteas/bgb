<template>
  <v-container fluid grid-list-sm secondary>
    <v-layout>
      <v-expansion-panel expand>
        <v-expansion-panel-content v-for="hero in heroes">
          <v-layout slot="header" align-center align-content-start row>
            <v-avatar>
              <img :src="hero.portrait">
            </v-avatar>
            <v-flex xs1>
              <v-text-field :value="hero.name"/>
            </v-flex>
            <v-flex>
              <v-layout row align-center align-content-start>
                <v-icon color="red">mdi-heart</v-icon>
                <h2> {{hero.hp}}/{{hero.maxHp}}</h2>
                <v-btn flat icon @click.native.stop="hero.hp = adjAttr(hero.hp,1)">
                  <v-icon color="red lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.hp = adjAttr(hero.hp,-1)">
                  <v-icon color="red darken-1">mdi-minus</v-icon>
                </v-btn>
              </v-layout>
              <h2> {{hero.defense}}</h2>
            </v-flex>
            <v-flex>
              <v-layout row align-center align-content-start>
                <v-icon color="blue">mdi-ghost</v-icon>
                <h2> {{hero.sp}}/{{hero.maxSp}}</h2>
                <v-btn flat icon @click.native.stop="hero.sp = adjAttr(hero.sp,1)">
                  <v-icon color="blue lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.sp = adjAttr(hero.sp,-1)">
                  <v-icon color="blue darken-1">mdi-minus</v-icon>
                </v-btn>
              </v-layout>
              <h2> {{hero.willpower}}</h2>
            </v-flex>
            <v-flex>
              <v-icon color="deep-orange darken-1">mdi-sword-cross</v-icon>
              <h2>{{hero.combat}}</h2>
              <h2> {{hero.melee}}</h2>
            </v-flex>
            <v-flex>
              <v-icon color="blue-grey lighten-1">mdi-pistol</v-icon>
              <h2>2</h2>
              <h2>{{hero.range}}</h2>
            </v-flex>
            <v-flex>
              <v-layout row align-center align-content-start>
                <v-icon color="lime">mdi-dna</v-icon>
                <h2> {{hero.corruption}}/{{hero.maxCorr}}</h2>
                <v-btn flat icon @click.native.stop="hero.corruption = adjAttr(hero.corruption,1)">
                  <v-icon color="lime lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.corruption = adjAttr(hero.corruption,-1)">
                  <v-icon color="lime darken-1">mdi-minus</v-icon>
                </v-btn>
              </v-layout>
              <h2> {{hero.willpower}}</h2>
            </v-flex>
            <v-flex>
              <v-layout row align-center align-content-start>
                <v-icon color="green lighten-2">mdi-currency-usd</v-icon>
                <h2>{{hero.money}}</h2>
                <v-btn flat icon @click.native.stop="hero.money = adjAttr(hero.money,5)">
                  <v-icon color="green lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.money = adjAttr(hero.money,50)">
                  <v-icon color="green lighten-1">mdi-arrow-up-bold</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.money = adjAttr(hero.money,-5)">
                  <v-icon color="green darken-1">mdi-minus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.money = adjAttr(hero.money,-50)">
                  <v-icon color="green darken-1">mdi-arrow-down-bold</v-icon>
                </v-btn>
              </v-layout>
              <v-layout row align-center align-content-start>
                <v-icon color="purple">mdi-diamond</v-icon>
                <h2>{{hero.darkstone}}</h2>
                <v-btn flat icon @click.native.stop="hero.darkstone = adjAttr(hero.darkstone,1)">
                  <v-icon color="purple lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.darkstone = adjAttr(hero.darkstone,-1)">
                  <v-icon color="purple darken-2">mdi-minus</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row align-center align-content-start>
                <v-icon color="amber">mdi-trophy-award</v-icon>
                <h2> {{hero.xp}}/{{hero.xpGoal}}</h2>
                <v-btn flat icon @click.native.stop="hero.xp = adjAttr(hero.xp,5)">
                  <v-icon color="amber lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-btn flat icon @click.native.stop="hero.xp = adjAttr(hero.xp,-5)">
                  <v-icon color="amber darken1-1">mdi-minus</v-icon>
                </v-btn>
              </v-layout>
              <h2>Lvl: {{hero.level}}</h2>
            </v-flex>
            <v-btn large fab round :color="colorMap[hero.roll].color" :value="hero.roll"
                   @click.native.stop="reRoll(hero, 6, hero.movementAdj)">
              <h1>{{hero.roll}}</h1>
            </v-btn>
          </v-layout>
          <v-card>
            <v-card-text class="grey darken2">{{hero}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'hero-panel',
    created: function () {
      // load the data
    },
    methods: {
      reRoll: function (hero, maxNum, adj) {
        hero.roll = (Math.floor(Math.random() * maxNum) + 1) + adj
      },
      adjAttr: function (attribute, adj) {
        attribute += adj
        return attribute
      }
    },
    data () {
      return {
        colorMap: [
          {number: 0, color: 'black'},
          {number: 1, color: 'red darken-4'},
          {number: 2, color: 'brown darken-2'},
          {number: 3, color: 'lime darken-3'},
          {number: 4, color: 'green darken-2'},
          {number: 5, color: 'blue darken-3'},
          {number: 6, color: 'yellow darken-3'},
          {number: 7, color: 'teal darken-1'},
          {number: 8, color: 'cyan darken-1'},
          {number: 9, color: 'light-blue darken-1'},
          {number: 10, color: 'blue darken-1'},
          {number: 11, color: 'indigo darken-1'},
          {number: 12, color: 'deep-purple lighten-1'},
          {number: 13, color: 'purple accent-3'},
          {number: 14, color: 'pink darken-2'},
          {number: 15, color: 'red darken-3'},
          {number: 16, color: 'blue-grey darken-2'},
          {number: 17, color: 'brown lighten-1'},
          {number: 18, color: 'orange lighten-1'},
          {number: 19, color: 'yellow accent-3'},
          {number: 20, color: 'green darken-1'}
        ],
        heroes: [
          {
            name: 'Hero1',
            portrait: '/static/img/heroes/Bandido.png',
            hp: 10,
            maxHp: 10,
            sp: 10,
            maxSp: 10,
            agi: 1,
            cun: 1,
            spirit: 1,
            str: 1,
            lore: 1,
            luck: 1,
            ini: 1,
            combat: 2,
            melee: '4+',
            range: '4+',
            level: 1,
            defense: '4+',
            willpower: '4+',
            movementAdj: 0,
            maxGrit: 2,
            corruption: 0,
            maxCorr: 5,
            xp: 0,
            xpGoal: 100,
            money: 0,
            darkstone: 0,
            roll: 0
          },
          {
            name: 'Hero2',
            portrait: '/static/img/heroes/Lawman.png',
            hp: 10,
            maxHp: 10,
            sp: 10,
            maxSp: 10,
            agi: 1,
            cun: 1,
            spirit: 1,
            str: 1,
            lore: 1,
            luck: 1,
            ini: 1,
            combat: 2,
            melee: '4+',
            range: '4+',
            level: 1,
            defense: '4+',
            willpower: '4+',
            movementAdj: 0,
            maxGrit: 2,
            corruption: 0,
            maxCorr: 5,
            xp: 0,
            xpGoal: 100,
            money: 0,
            darkstone: 0,
            roll: 0
          },
          {
            name: 'Hero3',
            portrait: '/static/img/heroes/Outlaw.png',
            hp: 10,
            maxHp: 10,
            sp: 10,
            maxSp: 10,
            agi: 1,
            cun: 1,
            spirit: 1,
            str: 1,
            lore: 1,
            luck: 1,
            ini: 1,
            combat: 2,
            melee: '4+',
            range: '4+',
            level: 1,
            defense: '4+',
            willpower: '4+',
            movementAdj: 0,
            maxGrit: 2,
            corruption: 0,
            maxCorr: 5,
            xp: 0,
            xpGoal: 100,
            money: 0,
            darkstone: 0,
            roll: 0
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
