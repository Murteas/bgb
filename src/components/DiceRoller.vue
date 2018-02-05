<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs2 sm1>
        <v-select
          v-bind:items="diceTypes"
          v-model="select"
          label="Select"
          single-line
          item-text="dieType"
          item-value="maxNum"
          return-object
          :hint="`1-${select.maxNum}`"
          persistent-hint
          @change="clearDice()"
        ></v-select>
      </v-flex>

      <v-flex xs2 sm1>
        <v-text-field
          type="number"
          name="num-dice-1"
          label="# Dice"
          id="test"
          v-model=numDice
          min=0
          max=12
          step=1
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm1>
        <v-btn flat icon @click.native="rollDice()">
          <v-icon x-large color="white">mdi-dice-multiple</v-icon>
        </v-btn>
      </v-flex>
      <v-layout xs3 sm7 row wrap>
        <v-flex v-for="die in dice" v-if="dice.indexOf(die) < numDice">
          <v-badge left overlap color="blue-grey">
            <span slot="badge">{{select.dieType}}</span>
            <v-btn large fab round :color="die.color"
                   @click.native="reRoll(die, select.maxNum)">
              <h1>{{die.roll}}</h1>
            </v-btn>
          </v-badge>
        </v-flex>
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
      clearDice: function () {
        for (var i = 0; i < this.dice.length; i++) {
          this.dice[i].roll = '-'
          this.dice[i].color = 'black'
          this.dice[i].dark = true
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
        if (maxNum === 6) {
          this.d6RollData[btn.roll - 1].rolls = this.d6RollData[btn.roll - 1].rolls + 1
        }
      }
    },
    data() {
      return {
        select: {dieType: 'D6', maxNum: 6},
        dice: [
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'},
          {color: 'indigo darken-4', roll: '-', dark: false, sides: 'D6'}
        ],
        diceTypes: [
          {dieType: 'D2', maxNum: 2, icon: 'mdi-dice-2'},
          {dieType: 'D3', maxNum: 3, icon: 'mdi-dice-3'},
          {dieType: 'D4', maxNum: 4, icon: 'mdi-dice-d4'},
          {dieType: 'D6', maxNum: 6, icon: 'mdi-dice-d6'},
          {dieType: 'D8', maxNum: 8, icon: 'mdi-dice-d8'},
          {dieType: 'D10', maxNum: 10, icon: 'mdi-dice-d10'},
          {dieType: 'D12', maxNum: 12, icon: 'mdi-dice-d12'},
          {dieType: 'D20', maxNum: 20, icon: 'mdi-dice-d20'}
        ],
        colorMap: [
          {number: 1, color: 'red darken-4'},
          {number: 2, color: 'brown'},
          {number: 3, color: 'amber darken-1'},
          {number: 4, color: 'indigo'},
          {number: 5, color: 'cyan darken-3'},
          {number: 6, color: 'green accent-3'},
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
