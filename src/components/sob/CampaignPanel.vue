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
      <v-btn small fab color="grey" @click.stop="showBoss=!showBoss">
        <v-icon>mdi-eye-off</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-alert type="warning" dismissible v-model="warning">
      Are you sure you want to delete the campaign and create a new one?
      <v-btn color="deep-orange accent-3" @click.native="createCampaign()">YES</v-btn>
    </v-alert>
    <v-layout column>
      <v-flex sm12>
        <!--<v-layout row justify-center >-->
        <!--<h1> {{campaign.Overlord.name}}</h1>-->
        <!--<v-chip outline color="black" :v-model=campaign.Overlord.revealed>{{campaign.Overlord.type}}</v-chip>-->
        <!--<v-chip color="green" @click.native="addSuccess(campaign.Overlord)">{{campaign.Overlord.successfulMissions}}-->
        <!--</v-chip>-->
        <!--<v-chip color="red" @click.native="addFailure(campaign.Overlord)">{{campaign.Overlord.failedMissions}}-->
        <!--</v-chip>-->
        <!--<v-chip outline color="white">{{campaign.Overlord.otherworld}}</v-chip>-->
        <!--</v-layout>-->
      </v-flex>
      <v-layout row wrap>
        <v-flex sm7 md7 v-for="lt in campaign.Lieutenants" :key="lt.name">
          <v-card color="black" height="100%" v-if="showBoss">
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
  import OTHERWORLDS from './data/worlds.json'
  import MISSIONS_BY_WORLD from './data/missions.json'
  import OVERLORDS from './data/overlords.json'
  import LIEUTENANTS from './data/lieutenants'

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
        // this.shuffle(this.overlords);
        this.shuffle(this.lieutenants);
        // this.campaign.Overlord = this.createLt(0);
        this.campaign.Lieutenants = [];
        for (let i = 0; i < 1; i++) {
          this.campaign.Lieutenants.push(this.createLt(i));
        }
        localStorage.setItem('campaignPanel', JSON.stringify(this.campaign));
        this.warning = false;
      },
      createLt: function (mineNum) {
        let lieutenant = JSON.parse(JSON.stringify(this.lieutenants.slice(mineNum, mineNum + 1)[0]));
        if (lieutenant.otherworld === 'RANDOM') {
          let ow = this.generateOtherworld();
          lieutenant.otherworld = ow.name;
          lieutenant.color = ow.color;
        }
        lieutenant.missions = lieutenant.missions.concat(this.generateMissions(lieutenant.otherworld));
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
        this.shuffle(this.missions.mineMissions);
        this.shuffle(this.missions.fortressMissions);
        this.shuffle(this.missions.townMissions);
        switch (type) {
          case 'Cynder':
            this.shuffle(this.missions.cynderMissions);
            customizedMissions = this.missions.cynderMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            break;
          case 'Targa':
            this.shuffle(this.missions.targaMissions);
            customizedMissions = this.missions.targaMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            break;
          case 'Jargono':
            this.shuffle(this.missions.jargonoMissions);
            customizedMissions = this.missions.jargonoMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            break;
          case 'Trederra':
            this.shuffle(this.missions.trederraMissions);
            customizedMissions = this.missions.trederraMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            break;
          case 'DerelictShip':
            this.shuffle(this.missions.derelictMissions);
            customizedMissions = this.missions.derelictMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            break;
          case 'BlastedWastes':
            this.shuffle(this.missions.blastedMissions);
            customizedMissions = this.missions.blastedMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            break;
          case 'Belly':
            this.shuffle(this.missions.bellyMissions);
            customizedMissions = this.missions.bellyMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.fortressMissions.slice(0, 2));
            break;
          case 'Forest':
            this.shuffle(this.missions.forestMissions);
            customizedMissions = this.missions.forestMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.fortressMissions.slice(0, 2));
            break;
          case 'Canyon':
            this.shuffle(this.missions.canyonMissions);
            customizedMissions = this.missions.canyonMissions.slice(0, 2);
            customizedMissions = customizedMissions.concat(this.missions.mineMissions.slice(0, 2));
            customizedMissions = customizedMissions.concat(this.missions.townMissions.slice(0,2));
            break;
          case 'Fortress':
            customizedMissions = customizedMissions.concat(this.missions.fortressMissions.slice(0, 6));
            break
          default:
            customizedMissions = this.missions.mineMissions.slice(0, 4);
            customizedMissions = customizedMissions.concat(this.missions.townMissions.slice(0,2));
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
        showBoss: false,
        otherworldTypes: OTHERWORLDS,
        missions: MISSIONS_BY_WORLD,
        campaign: {
          Overlord: {},
          Lieutenants: []
        },
        overlords: OVERLORDS,
        lieutenants: LIEUTENANTS
      }
    }
  }
</script>

<style scoped>

</style>
