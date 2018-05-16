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
      <v-btn small fab color="blue" @click.stop="addNewMine()">
        <v-icon>mdi-map-marker-plus</v-icon>
      </v-btn>
      <v-btn small fab color="amber" @click.stop="selectMines(3)">
        <v-icon>star</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-alert type="warning" dismissible v-model="warning">
      Are you sure you want to delete all the mines and recreate new ones?
      <v-btn color="deep-orange accent-3" @click.native="createMines()">YES</v-btn>
    </v-alert>
    <v-layout row wrap>
      <v-flex sm4 md4 v-for="mine in mines" :key="mine.name">
        <v-card color="black" height="100%">
          <v-toolbar :color="mine.mineColor">
            <v-toolbar-title>
              <v-menu offset-y>
                <span slot="activator">{{mine.name}}</span>
                <v-list>

                  <v-list-tile @click.native="deleteMine(mine)">
                    <v-list-tile-title>
                      <v-icon>mdi-delete-forever</v-icon>
                      Delete Mine
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click.native="replenishMissions(mine)">
                    <v-list-tile-title>
                      <v-icon>mdi-wrench</v-icon>
                      Regenerate Missions
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click.native="changeType(mine)">
                    <v-list-tile-title>
                      <v-icon>mdi-pickaxe</v-icon>
                      Change Mine Type
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-title>
            <v-spacer/>
            <v-badge overlap color="amber" v-model="mine.selected">
              <v-icon slot="badge">star</v-icon>
              <v-chip color="black" :text-color="mine.mineColor">
                {{mine.type}}
              </v-chip>
            </v-badge>
          </v-toolbar>
          <v-layout row wrap>
            <v-chip color="grey" close
                    v-for="mission in mine.missions"
                    @input="deleteMission(mine, mission)">
              {{mission}}
            </v-chip>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'mine-panel',
    mounted() {
      if (localStorage.getItem('minePanel')) {
        this.mines = JSON.parse(localStorage.getItem('minePanel'));
      } else {
        this.createMines();
      }
    },
    methods: {
      changeType: function (mine) {
        mine.type = this.mineType();
        mine.mineColor = this.mineColor;
        this.replenishMissions(mine);
      },
      selectMines: function (numSelected) {
        this.shuffle(this.mines);
        for (let i = 0; i < this.mines.length; i++) {
          this.mines[i].selected = i < numSelected;
        }
        localStorage.setItem('minePanel', JSON.stringify(this.mines));
      },
      replenishMissions: function (mine) {
        mine.missions = this.generateMissions(mine.type);
        localStorage.setItem('minePanel', JSON.stringify(this.mines));
      },
      addNewMine: function () {
        this.shuffle(this.mineNames);
        this.mines.push(this.createMine(0));
        localStorage.setItem('minePanel', JSON.stringify(this.mines));
      },
      deleteMission: function (mine, mission) {
        this.removeElement(mine.missions, mission);
        localStorage.setItem('minePanel', JSON.stringify(this.mines));
      },
      deleteMine: function (mine) {
        this.removeElement(this.mines, mine);
        localStorage.setItem('minePanel', JSON.stringify(this.mines));
      },
      createMines: function () {
        this.shuffle(this.mineNames);
        this.mines = [];
        for (let i = 0; i < 6; i++) {
          this.mines.push(this.createMine(i));
        }
        localStorage.setItem('minePanel', JSON.stringify(this.mines));
        this.warning = false;
      },
      createMine: function (mineNum) {
        let mine = {};
        mine.name = this.mineNames[mineNum];
        mine.type = this.mineType();
        mine.mineColor = this.mineColor;
        mine.missions = this.generateMissions(mine.type);
        mine.selected = false;
        return mine
      },
      mineType: function () {
        this.shuffle(this.mineTypes);
        this.mineColor = this.mineTypes[0].color;
        return this.mineTypes[0].name;
      },
      generateMissions: function (type) {
        let customizedMissions = [];
        this.shuffle(this.mineMissions);
        switch (type) {
          case 'Cynder':
            this.shuffle(this.cynderMissions);
            customizedMissions = this.cynderMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 1));
            break;
          case 'Targa Plateau':
            this.shuffle(this.targaMissions);
            customizedMissions = this.targaMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 1));
            break;
          case 'Jargono':
            this.shuffle(this.jargonoMissions);
            customizedMissions = this.jargonoMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 1));
            break;
          case 'Trederra':
            this.shuffle(this.trederraMissions);
            customizedMissions = this.trederraMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 1));
            break;
          case 'Derelict Ship':
            this.shuffle(this.derelictMissions);
            customizedMissions = this.derelictMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 1));
            break;
          default:
            customizedMissions = this.mineMissions.slice(0, 3);
            break;
        }
        return customizedMissions;
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
        mineColor: 'white',
        mineNames: [
          'The Depths', 'Gold River', 'Silver Gulch', 'Gemheart', 'Stoneheart', 'Talon\'s Cave', 'Black Hat Mine', 'Death\'s Head Claim', 'ShadowMaw', 'Rusty Pickaxe', 'No Return', 'Lodestone Caves', 'BottomFeeder Ravine', 'Wolf\'s Mine', 'Daggervale Dig', 'Dusty\'s Bottom', 'Nose Pick', 'Blood Ravine', 'The War', 'Shotgun Chute', 'Ghost Gulch', 'Darkness Cave', 'Glittering Gulch', 'Tyrone\'s Claim', 'Bear Cave', 'Coyote Cavern', 'Bloody Mouth Caverns', 'DeathWail Ravine', 'Bottomless Well', 'Lucky\'s Strike', 'Empty Hole', 'Minecart', 'Gumption Gain', 'Motherload', 'Chemist Claim', 'Gov\'t Lands', 'GoatEater\'s Pass'
        ],
        mineTypes: [
          {
            name: 'Any',
            color: 'brown'
          },
          {
            name: 'Cynder',
            color: 'deep-orange accent-3'
          },
          {
            name: 'Targa Plateau',
            color: 'light-blue lighten-4'
          },
          {
            name: 'Jargono',
            color: 'light-green darken-3'
          },
          {
            name: 'Trederra',
            color: 'lime darken-4'
          },
          {
            name: 'Derelict Ship',
            color: 'indigo'
          }
        ],
        mineMissions: [
          'For a Few Darkstone More',
          'Exploration',
          'Rescue Party',
          'Seal the Gate',
          'Blow the Mine',
          'Escape',
          'VM Hunted',
          'VM Call of the Void',
          'UO Wanted: Undead or Alive',
          'UO Revenge of the Dead',
          'FS Experimentation',
          'FS Out of Time'
        ],
        cynderMissions: [
          'Cracks in Reality',
          'Defend the Bridge',
          'Dark Deal',
          'Fire & Ash',
          'Hunt for Liquid DS',
          'Broken Seals'
        ],
        targaMissions: [
          'Terror in the Night',
          'Stop the Ritual',
          'Last Stand',
          'Overload',
          'City of the Ancients',
          'Frozen Expedition'
        ],
        jargonoMissions: [
          'Night of the Dead',
          'Seal the Hell Pit',
          'The Lost Journal',
          'Cursed Idol',
          'Swamps of Death',
          'Temple of Dread',
          'SM Human Sacrifice',
          'SM Warring Tribes'
        ],
        derelictMissions: [
          'Time\'s Echo',
          'Collapse the Vortex',
          'Lost in Space',
          'The Captain\'s Log',
          'Voyage of the Dead',
          'Reactor Breach'
        ],
        trederraMissions: [
          'Foothold',
          'Toxic Purge',
          'Battlefield Recon',
          'Front Lines',
          'Guns of War',
          'Doomsday'
        ],
        mines: [
          {
            name: 'Mine1',
            type: 'Any',
            missions: [],
            selected: false,
            mineColor: 'white'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
