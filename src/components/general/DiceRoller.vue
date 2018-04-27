<template>
  <v-container fluid grid-list-sm secondary>
    <v-layout row>
      <v-flex xs2>
        <v-layout column wrap>
          <v-flex>
            <v-layout row wrap>
              <v-btn round :color="select.color"
                     @click.native="selectDieType()">
                <span>{{select.dieType}} </span>
              </v-btn>
              <v-btn flat icon color="lime accent-2" @click.native.stop="dialog = true">
                <v-icon>mdi-table</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-layout row wrap>
              <v-btn flat icon color="blue darken-2" @click.native="changeNumDice(-1)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn flat icon color="blue lighten-2" @click.native="changeNumDice(1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn flat icon @click.native="rollDice()">
                <v-icon>mdi-dice-multiple</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10>
        <v-layout row wrap grid-list-sm>
          <v-flex v-for="die in dice" v-if="dice.indexOf(die) < numDice">
            <v-badge overlap left :color="select.color">
              <!--<v-icon slot="badge">{{select.icon}}</v-icon>-->
              <span slot="badge">{{die.rerolls}}</span>
              <v-btn large fab round :color="die.color"
                     @click.native="reRoll(die, select.maxNum)">
                <h1>{{die.roll}}</h1>
              </v-btn>
            </v-badge>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="200">
      <v-card>
        <v-card-title class="headline">D6 Dice Rolls</v-card-title>
        <v-data-table :items="d6RollData" class="elevation-1" hide-headers hide-actions>
          <template slot="items" slot-scope="props">
            <td bgcolor="#6495ed">{{props.item.number}}</td>
            <td>{{props.item.rolls}}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

  </v-container>
</template>
<script>
  /* eslint-disable space-before-function-paren */

  export default {
    methods: {
      changeNumDice: function (change) {
        this.numDice += change
        if (this.numDice < 1) {
          this.numDice = 1
        } else if (this.numDice > 15) {
          this.numDice = 15
        }
      },
      selectDieType: function () {
        this.currentDieIndex += 1
        if (this.currentDieIndex >= this.diceTypes.length) {
          this.currentDieIndex = 0
        }
        this.select = this.diceTypes[this.currentDieIndex]
        this.clearDice()
      },
      clearDice: function () {
        for (var i = 0; i < this.dice.length; i++) {
          this.dice[i].roll = '-'
          this.dice[i].color = 'black'
          this.dice[i].dark = true
          this.dice[i].rerolls = 0
        }
      },
      rollDice: function () {
        for (var i = 0; i < this.dice.length; i++) {
          this.reRoll(this.dice[i], this.select.maxNum)
        }
      },
      reRoll: function (btn, maxNum) {
        btn.dark = !btn.dark
        btn.roll = (Math.floor(Math.random() * maxNum) + 1)
        btn.color = this.colorMap[btn.roll].color
        btn.rerolls += 1
        if (maxNum === 6) {
          this.d6RollData[btn.roll - 1].rolls = this.d6RollData[btn.roll - 1].rolls + 1
        }
      }
    },
    data() {
      return {
        currentDieIndex: 3,
        select: {dieType: 'D6', maxNum: 6, icon: 'mdi-dice-d6', color: 'green darken-2'},
        dice: [
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0}
        ],
        diceTypes: [
          {dieType: 'D2', maxNum: 2, icon: 'mdi-dice-2', color: 'red accent-3'},
          {dieType: 'D3', maxNum: 3, icon: 'mdi-dice-3', color: 'amber darken-1'},
          {dieType: 'D4', maxNum: 4, icon: 'mdi-dice-d4', color: 'indigo'},
          {dieType: 'D6', maxNum: 6, icon: 'mdi-dice-d6', color: 'green darken-2'},
          {dieType: 'D8', maxNum: 8, icon: 'mdi-dice-d8', color: 'lime darken-3'},
          {dieType: 'D10', maxNum: 10, icon: 'mdi-dice-d10', color: 'grey darken-2'},
          {dieType: 'D12', maxNum: 12, icon: 'mdi-dice_d12', color: 'brown'},
          {dieType: 'D20', maxNum: 20, icon: 'mdi-dice-d20', color: 'blue-grey darken-3'}
        ],
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
        d6RollData: [
          {number: 1, rolls: 0},
          {number: 2, rolls: 0},
          {number: 3, rolls: 0},
          {number: 4, rolls: 0},
          {number: 5, rolls: 0},
          {number: 6, rolls: 0}
        ],
        numDice: 7,
        dialog: false
      }
    }

  }
</script>
