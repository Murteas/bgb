<template>
  <div>
    <v-container>
      <v-layout align-center column>
        <v-flex text-xs-center>
          <h1>Board Game Buddy</h1>
          <v-card color="green">{{appVersion}}</v-card>
        </v-flex>
        <v-btn color="red" dark v-if="!warning" @click="warning = true">Clear all Saved Data</v-btn>
        <v-alert type="warning" dismissible v-model="warning">
          Are you sure you want to delete all saved data in Board Game Buddy?
          <v-btn color="deep-orange accent-3" @click="clearData()">YES</v-btn>
        </v-alert>
        <v-flex sm6 md6>
          <list-randomizer/>
          <list-randomizer/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import ListRandomizer from './general/ListRandomizer'
  import RandomDie from './general/RandomDie';

  export default {
    components: {
      RandomDie,
      'random-die': RandomDie,
      ListRandomizer,
      'list-randomizer': ListRandomizer
    },
    name: 'about',
    mounted() {
      this.appVersion = '0.30.0 SoB rev1';
    },
    data: () => ({
      appVersion: '0.0.0',
      warning: false
    }),
    methods: {
      clearData() {
        localStorage.clear();
        this.warning = false;
      }
    }
  }
</script>
