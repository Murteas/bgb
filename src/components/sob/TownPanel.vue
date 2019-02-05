<template>
  <v-container fluid grid-list-sm>
    <v-speed-dial absolute right direction="bottom" v-model="fab">
      <v-btn small slot="activator" color="blue-grey" fab v-model="fab">
        <v-icon>mdi-menu-down</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn small fab color="green" @click.stop="warning=!warning">
        <v-icon>mdi-recycle</v-icon>
      </v-btn>
      <v-btn small fab color="blue" @click.stop="addNewTown()">
        <v-icon>mdi-map-marker-plus</v-icon>
      </v-btn>
      <v-btn small fab color="amber" @click.stop="selectTowns(3)">
        <v-icon>star</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-alert type="warning" dismissible v-model="warning">
      Are you sure you want to delete all the towns and recreate new ones?
      <v-btn color="deep-orange accent-3" @click.native="createTowns()">YES</v-btn>
    </v-alert>
    <v-layout row wrap>
      <v-flex sm4 md4 v-for="town in towns" :key="town.name">
        <v-card color="black" height="100%">
          <v-toolbar :color="town.townColor">
            <v-badge left top overlap>
              <span slot="badge">{{town.size}}</span>
              <v-toolbar-title>
                <v-menu offset-y>
                  <span slot="activator">{{town.name}}</span>
                  <v-list>
                    <v-list-tile @click.native="deleteTown(town)">
                      <v-list-tile-title>
                        <v-icon>mdi-delete-forever</v-icon>
                        Delete Town
                      </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click.native="replenishBuildings(town)">
                      <v-list-tile-title>
                        <v-icon>mdi-wrench</v-icon>
                        Rebuild Town
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-toolbar-title>
            </v-badge>
            <v-spacer/>
            <v-badge overlap left color="amber" v-model="town.selected">
              <v-icon slot="badge">star</v-icon>
              <v-chip color="black" :text-color="town.townColor">
                {{town.type}}
              </v-chip>
            </v-badge>
          </v-toolbar>
          <v-layout row wrap>
            <v-chip close outline
                    :color="town.townColor"
                    v-for="building in town.buildings"
                    @input="deleteBuilding(town, building)">
              {{building}}
            </v-chip>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import TOWN_NAMES from './data/townNames.json'
  import TOWN_BUILDINGS from './data/townBuildings.json'
  export default {
    name: 'town-panel',
    mounted() {
      if (localStorage.getItem('townPanel')) {
        this.towns = JSON.parse(localStorage.getItem('townPanel'));
      } else {
        this.createTowns();
      }
    },
    methods: {
      selectTowns: function (numSelected) {
        this.shuffle(this.towns);
        for (let i = 0; i < this.towns.length; i++) {
          let selected = i < numSelected;
          this.towns[i].selected = selected;
        }
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
      },
      replenishBuildings: function (town) {
        town.buildings = this.generateBuildings(town.type, town.size);
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
      },
      addNewTown: function () {
        this.shuffle(this.townNames);
        this.towns.push(this.createTown(0));
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
      },
      deleteBuilding: function (town, building) {
        this.removeElement(town.buildings, building);
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
      },
      deleteTown: function (town) {
        this.removeElement(this.towns, town);
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
      },
      createTowns: function () {
        this.shuffle(this.townNames);
        this.towns = [];
        for (let i = 0; i < 12; i++) {
          this.towns.push(this.createTown(i));
        }
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
        this.warning = false;
      },
      createTown: function (townNum) {
        let town = {};
        town.name = this.townNames[townNum];
        town.size = this.townSize();
        town.type = this.townType();
        town.townColor = this.townColor;
        town.buildings = this.generateBuildings(town.type, town.size);
        town.selected = false;
        return town
      },
      townSize: function () {
        switch (this.rollDice(1, 4)) {
          case 1:
            return 'S';
          case 2:
          case 3:
            return 'M';
          case 4:
            return 'L';
        }
      },
      townType: function () {
        let rollSum = this.rollDice(1, 6) + this.rollDice(1, 6);
        switch (rollSum) {
          case 2:
            this.townColor = 'grey darken-2';
            return 'Ruins';
          case 3:
            this.townColor = 'purple darken-1';
            return 'Haunted';
          case 4:
            this.townColor = 'lime darken-3';
            return 'Plague';
          case 5:
            this.townColor = 'teal lighten-1';
            return 'Rail';
          case 6:
          case 7:
          case 8:
            this.townColor = 'brown';
            return 'Normal';
          case 9:
            this.townColor = 'green accent-4';
            return 'Mutant';
          case 10:
            this.townColor = 'blue darken-1';
            return 'River';
          case 11:
            this.townColor = 'amber darken-2';
            return 'Mining';
          case 12:
            this.townColor = 'deep-orange darken-2';
            return 'Outlaw'
        }
      },
      generateBuildings: function (type, size) {
        let count = 0;
        let customizedBuildings = this.townBuildings.slice();
        this.shuffle(customizedBuildings);
        switch (size) {
          case 'S':
            count = 4;
            break;
          case 'M':
            count = 6;
            break;
          case 'L':
            count = 8;
            break;
          default:
            count = 6;
            break;
        }

        switch (type) {
          case 'Mining':
            this.promote(customizedBuildings, 'General Store');
            break;
          case 'Mutant':
            this.promote(customizedBuildings, 'Mutant Quarter');
            this.removeElement(customizedBuildings, 'Outpost');
            break;
          case 'Outlaw':
            this.promote(customizedBuildings, 'Smuggler\'s Den');
            this.removeElement(customizedBuildings, 'Sheriff');
            break;
          case 'Plague':
            this.promote(customizedBuildings, 'Doctor');
            this.promote(customizedBuildings, 'Church');
            break;
          case 'River':
            count++;
            this.promote(customizedBuildings, 'Street Market');
            this.promote(customizedBuildings, 'Gambling Hall');
            break;
          default:
            break;
        }
        customizedBuildings.splice(count);
        return customizedBuildings;
      },
      removeElement: function (array, element) {
        const index = array.indexOf(element);
        if (index !== -1) {
          array.splice(index, 1);
        }
      },
      promote: function (arr, target) {
        const index = arr.indexOf(target);
        if (index !== -1) {
          let a = arr.splice(index, 1);
          arr.unshift(a[0]);
        }
      }
    },
    data() {
      return {
        fab: false,
        warning: false,
        townColor: 'white',
        townNames: TOWN_NAMES,
        townBuildings: TOWN_BUILDINGS,
        towns: []
      }
    }
  }
</script>

<style scoped>

</style>
