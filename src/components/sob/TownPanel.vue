<template>
  <v-container fluid grid-list-sm>
    <v-toolbar>
        <v-btn flat icon @click.native="createTowns()">
          <v-icon>mdi-shuffle</v-icon>
        </v-btn>
    </v-toolbar>
      <v-layout row wrap>
        <v-flex sm4 md4 v-for="town in towns" :key="town.name">
          <v-card dark color="black">
            <v-toolbar :color="town.townColor">
              <v-badge color="secondary">
                <span slot="badge">{{town.size}}</span>
                <v-toolbar-title>{{town.name}}</v-toolbar-title>
              </v-badge>
              <v-spacer/>
              <v-chip color="black" :text-color="town.townColor">
                <h2>{{town.type}}</h2>
              </v-chip>
            </v-toolbar>
            <v-layout row wrap>
              <v-chip outline :color="town.townColor" v-for="building in town.buildings">
                {{building}}
              </v-chip>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    <h1>TBD - More Campaign stuff</h1>
  </v-container>
</template>
<script>
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
      createTowns: function () {
        this.shuffle(this.townNames);
        this.towns = [];
        for (let i = 0; i < 12; i++) {
          this.towns.push(this.createTown(i));
        }
        localStorage.setItem('townPanel', JSON.stringify(this.towns));
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
        townColor: 'white',
        townNames: [
          'Pure Gorge', 'Bull Peaks', 'Dusty Hill', 'Coyote\'s Gate', 'Purity Post', 'New Plains', 'Scorpion\'s Mountain', 'Crimsonvale', 'Deadbrook', 'Oatpass', 'Scorpiongorge', 'Scorpion\'s Plains', 'Farmbrook', 'Cruelty Trails', 'Devilbluff', 'Stifffort', 'Desolation Pass', 'Shady Bluff', 'Wrathmesa', 'Grindhowl', 'Deadmesa', 'Lightroost', 'Starksprings', 'Bruiselanding', 'Crazylanding', 'Dryroost', 'Old Cliff', 'Slimsummit', 'Aurora Mesa', 'Thincity', 'Devildowns', 'Shadowfield', 'Richsummit', 'Rapidcanyon', 'Tombglen', 'Shadowtusk', 'Freedom Canyon', 'Barren River', 'Farmstead', 'Devildowns', 'Shadowfield', 'Richsummit', 'Rapidcanyon', 'Tombglen', 'Shadowtusk', 'Freedom Canyon', 'Barren River', 'Farmstead', 'Coyote\'s Branch', 'Sandy Spring', 'Grimrange', 'Demonville', 'Wolfcrag', 'Thornspring', 'Angelglen', 'Tamecliff', 'Lostmountain', 'Bonesprings', 'Breakbranch', 'Braveridge', 'Last Reach', 'Devil\'s Bellow', 'Vastgulch', 'Silvermesa', 'Grand Mesa', 'Brokensnag', 'Swift Roost', 'Bull\'s Creek', 'Breakbranch', 'Braveridge', 'Last Reach', 'Devil\'s Bellow', 'Vastgulch', 'Silvermesa', 'Grand Mesa', 'Brokensnag', 'Swift Roost', 'Shallow Post', 'Softcreek', 'Littletown', 'Devil\'s Edge', 'Grindcross', 'Warmpost', 'Meektown', 'Bullville', 'Pride Gate', 'Angeredge', 'Sunnyrise', 'Cripple Roost', 'Losttrails', 'Vainpass', 'Crimsonwater', 'Lordsplains', 'Grimworth', 'Lowchapel', 'Violence Scar', 'Glumgulch'
        ],
        townBuildings: [
          'Saloon',
          'Trading Post',
          'General Store',
          'Smuggler\'s Den',
          'Church',
          'Outpost',
          'Sheriff',
          'Doctor',
          'Blacksmith',
          'Gambling Hall',
          'Mutant Quarter',
          'Street Market'
        ],
        towns: [
          {
            name: 'Town1',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town2',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town3',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town4',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town5',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town6',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town7',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town8',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town9',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town10',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town11',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town12',
            size: 'M',
            type: 'Normal',
            buildings: [],
            selected: false,
            townColor: 'white'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
