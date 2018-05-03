<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm4 md4 v-for="town in towns" :key="town.name">
        <v-card :color="town.townColor">
          <v-card-title>
            <h1>{{town.name}}</h1><h3>({{town.size}})</h3><v-spacer/><h2>{{town.type}}</h2>
          </v-card-title>
        </v-card>
        <v-card-text>
          <h3>{{town.buildings}}</h3>
        </v-card-text>
      </v-flex>
    </v-layout>
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
      createTowns: function() {
        this.shuffle(this.townNames);
         for(let i=0; i<10; i++) {
           this.towns[i] = this.createTown(i);
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
            this.townColor = 'black';
            return 'Ruins';
          case 3:
            this.townColor = 'indigo darken-1';
            return 'Haunted';
          case 4:
            this.townColor = 'lime darken-3';
            return 'Plague';
          case 5:
            this.townColor = 'blue-grey lighten-5';
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
            this.townColor = 'amber lighten-2';
            return 'Mining';
          case 12:
            this.townColor = 'deep-orange';
            return 'Outlaw'
        }
      },
      generateBuildings: function(type, size) {
        let count = 0;
        let buildingString = '';
        let customizedBuildings = this.townBuildings.slice();
        switch (size)
        {
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

        switch (type)
        {
          case 'Mining':
            count--;
            buildingString += 'General Store, ';
            this.removeElement(customizedBuildings,'General Store');
            break;
          case 'Mutant':
            count--;
            buildingString += ('Mutant Quarter, ');
            this.removeElement(customizedBuildings, 'Mutant Quarter');
            this.removeElement(customizedBuildings, 'Outpost');
            break;
          case 'Outlaw':
            count--;
            buildingString += 'Smuggler\'s Den, ';
            this.removeElement(customizedBuildings,'Smuggler\'s Den');
            this.removeElement(customizedBuildings, 'Sheriff');
            break;
          case 'Plague':
            count = count - 2;
            buildingString += 'Doctor, Church, ';
            this.removeElement(customizedBuildings, 'Doctor');
            this.removeElement(customizedBuildings, 'Church');
            break;
          case 'River':
            count--;
            buildingString +='Street Market, Gambling Hall, ';
            this.removeElement(customizedBuildings, 'Street Market');
            this.removeElement(customizedBuildings, 'Gambling Hall');
            break;
          default:
            break;
        }
          this.shuffle(customizedBuildings);
        for(let i=0; i<count; i++) {
          if (i >0) {
            buildingString += ', ';
          }
          buildingString += customizedBuildings[i];
        }

        return buildingString;
      },
      removeElement: function (array, element) {
        const index = array.indexOf(element);
        if (index !== -1) {
          array.splice(index, 1);
        }
      }
    },
    data() {
      return {
        townColor: 'white',
        townNames: [
          "Pure Gorge","Bull Peaks","Dusty Hill","Coyote's Gate","Purity Post","New Plains","Scorpion's Mountain","Crimsonvale","Deadbrook","Oatpass","Scorpiongorge","Scorpion's Plains","Farmbrook","Cruelty Trails","Devilbluff","Stifffort","Desolation Pass","Shady Bluff","Wrathmesa","Grindhowl","Deadmesa","Lightroost","Starksprings","Bruiselanding","Crazylanding","Dryroost","Old Cliff","Slimsummit","Aurora Mesa","Thincity","Devildowns","Shadowfield","Richsummit","Rapidcanyon","Bullcreek","Tombglen","Shadowtusk","Freedom Canyon","Barren River","Farmstead","Devildowns","Shadowfield","Richsummit","Rapidcanyon","Bullcreek","Tombglen","Shadowtusk","Freedom Canyon","Barren River","Farmstead","Coyote's Branch","Sandy Spring","Grimrange","Demonville","Wolfcrag","Thornspring","Angelglen","Tamecliff","Lostmountain","Bonesprings","Breakbranch","Braveridge","Last Reach","Devil's Bellow","Vastgulch","Silvermesa","Grand Mesa","Brokensnag","Swift Roost","Bull's Creak","Breakbranch","Braveridge","Last Reach","Devil's Bellow","Vastgulch","Silvermesa","Grand Mesa","Brokensnag","Swift Roost","Bull's Creak","Shallow Post","Softcreak","Littletown","Devil's Edge","Grindcross","Warmpost","Meektown","Bullville","Pride Gate","Angeredge","Sunnyrise","Cripple Roost","Losttrails","Vainpass","Crimsonwater","Lordsplains","Grimworth","Lowchapel","Violence Scar","Glumgulch"
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
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town2',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town3',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town4',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town5',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town6',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town7',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town8',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town9',
            size: 'M',
            type: 'Normal',
            buildings: '',
            selected: false,
            townColor: 'white'
          },
          {
            name: 'Town10',
            size: 'M',
            type: 'Normal',
            buildings: '',
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
