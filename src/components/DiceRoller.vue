<template>
  <v-container fluid grid-list-sm secondary>
    <v-layout justify-start  align-center align-content-center row wrap >
        <v-btn xs2 sm1 round :color="select.color"
               @click.native="selectDieType()">
          <span>{{select.dieType}} </span>
          <v-icon large>{{select.icon}}</v-icon>
        </v-btn>
        <v-layout align-center align-content-center column>
          <v-btn xs1 flat icon @click.native="changeNumDice(1)">
            <v-icon large>mdi-chevron-up</v-icon>
          </v-btn>
          <h2>{{numDice}}</h2>
          <v-btn xs1 flat icon @click.native="changeNumDice(-1)">
            <v-icon large >mdi-chevron-down</v-icon>
          </v-btn>
        </v-layout>
        <v-btn xs2 sm1 large fab round @click.native="rollDice()">
          <v-icon x-large color="white">mdi-dice-multiple</v-icon>
        </v-btn>
      <v-spacer/>
        <v-layout row wrap justify-start v-for="die in dice" v-if="dice.indexOf(die) < numDice">
          <v-badge overlap left :color="select.color">
            <!--<v-icon slot="badge">{{select.icon}}</v-icon>-->
            <span slot="badge">{{die.rerolls}}</span>
            <v-btn large fab round :color="die.color"
                   @click.native="reRoll(die, select.maxNum)">
              <h1>{{die.roll}}</h1>
            </v-btn>
          </v-badge>
        </v-layout>
      <v-flex>
        <v-btn flat icon color="light-green" @click.native.stop="dialog = true">
          <v-icon>mdi-table</v-icon>
        </v-btn>
      </v-flex>
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
    </v-layout>
  </v-container>
</template>
<script>
  /* eslint-disable space-before-function-paren */

  export default {
    methods: {
      changeNumDice: function(change) {
        this.numDice += change
        if (this.numDice < 0) {
          this.numDice = 0
        } else if (this.numDice > 12) {
          this.numDice = 12
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
        btn.color = this.colorMap[btn.roll - 1].color
        btn.rerolls += 1
        if (maxNum === 6) {
          this.d6RollData[btn.roll - 1].rolls = this.d6RollData[btn.roll - 1].rolls + 1
        }
      }
    },
    data() {
      return {
        currentDieIndex: 3,
        select: {dieType: 'D6', maxNum: 6, icon: 'mdi-dice-d6', color: 'teal'},
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
          {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0}
        ],
        diceTypes: [
          {dieType: 'D2', maxNum: 2, icon: 'mdi-dice-2', color: 'red'},
          {dieType: 'D3', maxNum: 3, icon: 'mdi-dice-3', color: 'deep-purple'},
          {dieType: 'D4', maxNum: 4, icon: 'mdi-dice-d4', color: 'blue accent-3'},
          {dieType: 'D6', maxNum: 6, icon: 'mdi-dice-d6', color: 'teal darken-3'},
          {dieType: 'D8', maxNum: 8, icon: 'mdi-dice-d8', color: 'green accent-3'},
          {dieType: 'D10', maxNum: 10, icon: 'mdi-dice-d10', color: 'amber darken-3'},
          {dieType: 'D12', maxNum: 12, icon: 'mdi-dice_d12', color: 'deep-orange'},
          {dieType: 'D20', maxNum: 20, icon: 'mdi-dice-d20', color: 'brown'}
        ],
        colorMap: [
          {number: 1, color: 'red darken-4'},
          {number: 2, color: 'brown darken-3'},
          {number: 3, color: 'deep-purple darken-3'},
          {number: 4, color: 'amber accent-3'},
          {number: 5, color: 'blue-grey darken-1'},
          {number: 6, color: 'green darken-3'},
          {number: 7, color: 'lime darken-4'},
          {number: 8, color: 'teal darken-4'},
          {number: 9, color: 'amber darken-4'},
          {number: 10, color: 'deep-orange darken-4'},
          {number: 11, color: 'brown darken-4'},
          {number: 12, color: 'blue-grey darken-4'},
          {number: 13, color: 'grey darken-4'},
          {number: 14, color: 'light-green darken-4'},
          {number: 15, color: 'cyan darken-4'},
          {number: 16, color: 'yellow darken-4'},
          {number: 17, color: 'light-blue darken-4'},
          {number: 18, color: 'deep-purple darken-4'},
          {number: 19, color: 'teal accent-3'},
          {number: 20, color: 'orange accent-2'}
        ],
        d6RollData: [
          {number: 1, rolls: 0},
          {number: 2, rolls: 0},
          {number: 3, rolls: 0},
          {number: 4, rolls: 0},
          {number: 5, rolls: 0},
          {number: 6, rolls: 0}
        ],
        numDice: 2,
        dialog: false
      }
    }

  }
</script>
