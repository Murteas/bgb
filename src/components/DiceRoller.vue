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
      <div>
        <v-btn dark fab large color="black">
          <v-icon dark x-large color="teal darken-1">casino</v-icon>
        </v-btn>
      </div>
      <v-layout row wrap >
        <v-flex v-for="i in 12" v-if="i <= numDice" >
          <v-btn ref="btn-i" round dark large v-on:click.native="reRoll(this, select.maxNum)" >  {{randomNumber(select.maxNum)}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  /* eslint-disable space-before-function-paren */

  export default {
    methods: {
      randomNumber: function(maxNum) {
        return Math.floor(Math.random() * maxNum) + 1
      },
      reRoll: function(btn, maxNum) {
        alert(Math.floor(Math.random() * maxNum) + 1)
      }
    },
    data() {
      return {
        select: {dieType: 'D6', maxNum: 6},
        diceTypes: [
          {dieType: 'D3', maxNum: 3},
          {dieType: 'D6', maxNum: 6},
          {dieType: 'D8', maxNum: 8},
          {dieType: 'D10', maxNum: 10}
        ],
        numDice: 2
      }
    }

  }
</script>
