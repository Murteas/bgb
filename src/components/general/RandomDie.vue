<template>
  <v-flex xs3 >
    <v-badge overlap left :color="select.color">
      <span slot="badge">{{die.rerolls}}</span>
      <v-btn large fab round :color="die.color"
             @click.native="reRoll(die, select.maxNum)">
        <h1>{{die.roll}}</h1>
      </v-btn>
    </v-badge>
  </v-flex>
</template>
<script>
  /* eslint-disable space-before-function-paren */

  export default {
    methods: {
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
      reRoll: function (btn, maxNum) {
        btn.dark = !btn.dark
        btn.roll = (Math.floor(Math.random() * maxNum) + 1)
        btn.color = this.colorMap[btn.roll].color
        btn.rerolls += 1
      }
    },
    data() {
      return {
        currentDieIndex: 3,
        select: {dieType: 'D6', maxNum: 6, icon: 'mdi-dice-d6', color: 'green darken-2'},
        die: {color: 'black', roll: '-', dark: false, sides: 'D6', rerolls: 0},
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
        ]
      }
    }

  }
</script>
