<template>
  <v-container fluid grid-list-sm>
    <v-layout row>
      <v-layout column>
        <v-btn color="green" @click.native="addThreat('low')">
          <h3>Low</h3>
        </v-btn>
        <v-btn color="yellow" @click.native="addThreat('med')">
          <h3>Med</h3>
        </v-btn>
        <v-btn color="red" @click.native="addThreat('high')">
          <h3>High</h3>
        </v-btn>
        <v-btn color="blue" @click.native="addThreat('epic')">
          <h3>Epic</h3>
        </v-btn>
        <v-btn @click.native="rebuildThreats()">
          <v-icon>mdi-cards</v-icon>
          <span>Reshuffle</span>
        </v-btn>
      </v-layout>
      <v-layout column>
        <ul id="threats">
          <li v-for="threat in currentThreats">
            <h3>{{ threat }}</h3>
          </li>
        </ul>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  import MINE_THREAT from './data/mineThreat.json'

  export default {
    name: 'threat-decks',
    mounted() {
      if (localStorage.getItem("mineThreats")) {
        this.mineThreats = JSON.parse(localStorage.getItem("mineThreats"));
        this.currentThreats = JSON.parse(localStorage.getItem("currentThreats"));
      } else {
        this.rebuildThreats();
      }
    },
    methods: {
      addThreat(type) {
        switch (type) {
          case 'low':
            this.currentThreats.push(this.mineThreats.low.splice(0, 1)[0]);
            break;
          case 'med':
            this.currentThreats.push(this.mineThreats.med.splice(0, 1)[0]);
            break;
          case 'high':
            this.currentThreats.push(this.mineThreats.high.splice(0, 1)[0]);
            break;
          case 'epic':
            this.currentThreats.push(this.mineThreats.epic.splice(0, 1)[0]);
            break;
        }
        localStorage.setItem("mineThreats", JSON.stringify(this.mineThreats));
        localStorage.setItem("currentThreats", JSON.stringify(this.currentThreats));
      },
      rebuildThreats() {
        this.mineThreats = MINE_THREAT;
        this.shuffle(this.mineThreats.epic);
        this.shuffle(this.mineThreats.high);
        this.shuffle(this.mineThreats.med);
        this.shuffle(this.mineThreats.low);
        localStorage.setItem("mineThreats", JSON.stringify(this.mineThreats));
        this.currentThreats = [];
        localStorage.setItem("currentThreats", JSON.stringify(this.currentThreats));
      }
    },
    data() {
      return {
        mineThreats: MINE_THREAT,
        currentThreats: []
      }
    }
  }
</script>

