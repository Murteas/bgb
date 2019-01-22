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
      <v-btn small fab color="grey" @click.stop="campaign.Overlord.revealed=!campaign.Overlord.revealed">
        <v-icon>mdi-eye-off</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-alert type="warning" dismissible v-model="warning">
      Are you sure you want to delete the campaign and create a new one?
      <v-btn color="deep-orange accent-3" @click.native="createCampaign()">YES</v-btn>
    </v-alert>
    <v-layout column>
      <v-flex sm12 >
        <v-layout row justify-center >
          <h1> {{campaign.Overlord.name}}</h1>
          <v-chip outline color="black" :v-model=campaign.Overlord.revealed>{{campaign.Overlord.type}}</v-chip>
          <v-chip color="green" @click.native="addSuccess(campaign.Overlord)">{{campaign.Overlord.successfulMissions}}
          </v-chip>
          <v-chip color="red" @click.native="addFailure(campaign.Overlord)">{{campaign.Overlord.failedMissions}}
          </v-chip>
          <v-chip outline color="white">{{campaign.Overlord.otherworld}}</v-chip>
        </v-layout>
      </v-flex>
      <v-layout row wrap>
        <v-flex sm4 md4 v-for="lt in campaign.Lieutenants" :key="lt.name">
          <v-card color="black" height="100%">
            <v-toolbar :color="lt.color">
              <v-toolbar-title>
                <v-menu offset-y>
                  <span slot="activator">{{lt.name}}</span>
                  <v-list>
                    <v-list-tile @click.native="deleteLt(lt)">
                      <v-list-tile-title>
                        <v-icon>mdi-delete-forever</v-icon>
                        Delete Lieutenant
                      </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click.native="replenishMissions(lt)">
                      <v-list-tile-title>
                        <v-icon>mdi-wrench</v-icon>
                        Regenerate Missions
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-chip outline color="black">{{lt.type}}</v-chip>
                <v-chip color="green" @click.native="addSuccess(lt)">{{lt.successfulMissions}}</v-chip>
                <v-chip color="red" @click.native="addFailure(lt)">{{lt.failedMissions}}</v-chip>
              </v-toolbar-title>
              <v-spacer/>
              <v-chip color="black" :text-color="lt.color">
                {{lt.otherworld}}
              </v-chip>
            </v-toolbar>
            <v-layout row wrap>
              <v-chip color="grey" close
                      v-for="mission in lt.missions"
                      @input="deleteMission(lt, mission)">
                {{mission}}
              </v-chip>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'campaign-panel',
    mounted() {
      if (localStorage.getItem('campaignPanel')) {
        this.campaign = JSON.parse(localStorage.getItem('campaignPanel'));
      } else {
        this.createCampaign();
      }
    },
    methods: {
      addSuccess: function (lt) {
        lt.successfulMissions += 1;
        if (lt.successfulMissions >= 10) {
          lt.successfulMissions = 0;
        }
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
      },
      addFailure: function (lt) {
        lt.failedMissions += 1;
        if (lt.failedMissions >= 10) {
          lt.failedMissions = 0;
        }
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
      },
      replenishMissions: function (lt) {
        lt.missions = this.generateMissions(lt.otherworld);
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
      },
      deleteMission: function (lt, mission) {
        this.removeElement(lt.missions, mission);
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
      },
      deleteLt: function (lt) {
        this.removeElement(this.campaign.Lieutenants, lt);
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
      },
      createCampaign: function () {
        this.shuffle(this.overlords);
        this.shuffle(this.lieutenants);
        this.campaign.Overlord = this.createOverlord();
        this.campaign.Lieutenants = [];
        for (let i = 0; i < 3; i++) {
          this.campaign.Lieutenants.push(this.createLt(i));
        }
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
        this.warning = false;
      },
      createLt: function (mineNum) {
        let lieutenant = this.lieutenants.slice(mineNum, mineNum + 1)[0];
        if (lieutenant.otherworld === 'RANDOM') {
          let ow = this.generateOtherworld();
          lieutenant.otherworld = ow.name;
          lieutenant.color = ow.color;
        }
        lieutenant.missions = this.generateMissions(lieutenant.otherworld);
        return lieutenant;
      },
      createOverlord: function () {
        return this.overlords.slice(0, 1)[0];
      },
      generateOtherworld: function () {
        this.shuffle(this.otherworldTypes);
        return this.otherworldTypes[0];
      },
      generateMissions: function (type) {
        let customizedMissions = [];
        this.shuffle(this.mineMissions);
        switch (type) {
          case 'Cynder':
            this.shuffle(this.cynderMissions);
            customizedMissions = this.cynderMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 2));
            break;
          case 'Targa Plateau':
            this.shuffle(this.targaMissions);
            customizedMissions = this.targaMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 2));
            break;
          case 'Jargono':
            this.shuffle(this.jargonoMissions);
            customizedMissions = this.jargonoMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 2));
            break;
          case 'Trederra':
            this.shuffle(this.trederraMissions);
            customizedMissions = this.trederraMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 2));
            break;
          case 'Derelict Ship':
            this.shuffle(this.derelictMissions);
            customizedMissions = this.derelictMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 2));
            break;
          case 'Blasted Wastes':
            this.shuffle(this.blastedMissions);
            customizedMissions = this.blastedMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.mineMissions.slice(0, 2));
            break;
          default:
            customizedMissions = this.mineMissions.slice(0, 4);
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
        enemyNames: [
          'The Depths', 'Gold River', 'Silver Gulch', 'Gemheart', 'Stoneheart', 'Talon\'s Cave', 'Black Hat Mine', 'Death\'s Head Claim', 'ShadowMaw', 'Rusty Pickaxe', 'No Return', 'Lodestone Caves', 'BottomFeeder Ravine', 'Wolf\'s Mine', 'Daggervale Dig', 'Dusty\'s Bottom', 'Nose Pick', 'Blood Ravine', 'The War', 'Shotgun Chute', 'Ghost Gulch', 'Darkness Cave', 'Glittering Gulch', 'Tyrone\'s Claim', 'Bear Cave', 'Coyote Cavern', 'Bloody Mouth Caverns', 'DeathWail Ravine', 'Bottomless Well', 'Lucky\'s Strike', 'Empty Hole', 'Minecart', 'Gumption Gain', 'Motherload', 'Chemist Claim', 'Gov\'t Lands', 'GoatEater\'s Pass'
        ],
        otherworldTypes: [
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
            name: 'Blasted Wastes',
            color: 'brown'
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
          'FS Out of Time',
          'Canyon #1',
          'Canyon #2',
          'Canyon #3',
          'Canyon #4',
          'Canyon #5',
          'Canyon #6'
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
        blastedMissions: [
          'Missing Patrol',
          'Ghosts in the Dark',
          'Across the Desert Dunes',
          'Starfall',
          'Water of Life',
          'Warmaster\'s Fury'
        ],
        campaign: {
          Overlord: {},
          Lieutenants: []
        },
        overlords: [
          {
            name: 'Sslither, the World Eater',
            type: 'Grand Shaman',
            otherworld: 'Jargono',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Frost Bite',
            type: 'Grand Shaman',
            otherworld: 'Targa Plateau',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Master of the Sands',
            type: 'Grand Shaman',
            otherworld: 'Blasted Wastes',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Master Replica',
            type: 'Flesh Stalker',
            otherworld: 'Derelict Ship',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'The Perfector',
            type: 'Flesh Stalker',
            otherworld: 'Trederra',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'The Burning Cosmos',
            type: 'Void Magus',
            otherworld: 'Cynder',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'The Undying',
            type: 'Void Magus',
            otherworld: 'Derelict Ship',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Marshal Malaise',
            type: 'Field Marshal',
            otherworld: 'Trederra',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Forsook',
            type: 'Harbinger',
            otherworld: 'Jargono',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Monstro',
            type: 'Goliath',
            otherworld: 'Targa Plateau',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Sand Behemoth',
            type: 'Goliath',
            otherworld: 'Blasted Wastes',
            revealed: false,
            successfulMissions: 0,
            failedMissions: 0
          }
        ],
        lieutenants: [
          {
            name: 'Lt Bile',
            type: 'Trederran Lt',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Lt Drift',
            type: 'Trederran Lt',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Darkfang',
            type: 'Serpent Shaman',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Plague Tongue',
            type: 'Serpent Shaman',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Master Corruptor',
            type: 'Void Sorceror',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Void Echo',
            type: 'Void Sorceror',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'TombStone',
            type: 'Undead Outlaw',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Mass Grave',
            type: 'Undead Outlaw',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'The Beast',
            type: 'Goliath',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Dark Guardian',
            type: 'Harbinger',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'DeathMaw',
            type: 'Goliath',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          },
          {
            name: 'Dymond',
            type: 'Harbinger',
            otherworld: 'RANDOM',
            color: 'white',
            missions: [],
            successfulMissions: 0,
            failedMissions: 0
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
